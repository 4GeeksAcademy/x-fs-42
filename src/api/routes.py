"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post
from api.utils import generate_sitemap, APIException, check_fields
from flask_cors import CORS
from flask_jwt_extended import create_access_token

# Importamos el decorador jwt_required para proteger las rutas que necesiten autenticación
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():

    fields = ["email", "password"]
    email, password = check_fields(request.json, fields)

    searched_user = User.query.filter_by(email=email).first()

    if not searched_user:
        return jsonify({"msg": "Bad email or password"}), 401

    if searched_user.password != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({
        "access_token": access_token,
        "user_id": searched_user.id,
        "username": searched_user.username,
        "email": searched_user.email,
        "post": [ post.serialize() for post in searched_user.publicaciones ]
    }), 200


@api.route('/token', methods=['GET'])
@jwt_required()
def check_token():
    token = get_jwt()
    return jsonify(token=token), 200

@api.route('/users/me', methods=['GET'])
@jwt_required()
def get_me():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    return jsonify(user.serialize()), 200

@api.route('/users', methods=['GET'])
def get_users():
    usuarios_de_la_db = User.query.all()
    usuarios_en_formato_json = [ usuario.serialize() for usuario in usuarios_de_la_db ]
    return jsonify(usuarios_en_formato_json), 200

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    usuario_de_la_db = User.query.get(id)

    if not usuario_de_la_db:
        raise APIException("User not found", status_code=404)

    return jsonify(usuario_de_la_db.serialize()), 200

# TODO: On register return a valid token to auto login
@api.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    else:

        fields = ["email", "password", "username"]
        
        email, password, username = check_fields(body, fields)

        new_user = User(email=email, password=password, username=username)

        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as error:
            raise APIException(str(error), status_code=500)

        return jsonify(new_user.serialize()), 201

@api.route('/users/<int:id>', methods=['PUT'])
def edit_user(id):

    if id is None:
        raise APIException("You need to specify the id", status_code=400)
    
    user = User.query.get(id) # Devuelve None si no encuentra el usuario

    if not user:
        raise APIException("User not found", status_code=404)

    body = request.get_json()

    fields = ["password", "username", "first_name", "last_name", "is_active"]

    for key in fields:
        if key in body:
            setattr(user, key, body[key])

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()

        raise APIException(str(error), status_code=500)

    return jsonify(user.serialize()), 200


@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):

    if id is None:
        raise APIException("You need to specify the id", status_code=400)
    
    user = User.query.get(id)

    if not user:
        raise APIException("User not found", status_code=404)

    try:
        db.session.delete(user)
        db.session.commit()
        
    except Exception as error:
        db.session.rollback()
        raise APIException(str(error), status_code=500)
    
    return jsonify({ "success": "ok" }), 200

@api.route('/posts', methods=['GET'])
def get_posts():

    posts = Post.query.all()
    result = [ post.serialize() for post in reversed(posts) ]
    return jsonify(result), 200

@api.route('/posts', methods=['POST'])
@jwt_required() # Esta ruta necesita autenticación
def create_post():

    body = request.get_json()

    if not body:
        raise APIException("You need to specify the request body as a json object", status_code=400)

    if "title" not in body:
        raise APIException("You need to specify the title", status_code=400)

    author = get_jwt_identity()

    searched_author = User.query.filter_by(email=author).first()

    if not searched_author:
        raise APIException("Author not found", status_code=404)

    new_post = Post(title=body.get("title"), author=searched_author)

    try:
        db.session.add(new_post)
        db.session.commit()
    except Exception as error:
        raise APIException(str(error), status_code=500)
    
    return jsonify(new_post.serialize()), 201


@api.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):

    if id is None:
        raise APIException("You need to specify the id", status_code=400)
    
    post = Post.query.get(id)

    if not post:
        raise APIException("Post not found", status_code=404)

    try:
        db.session.delete(post)
        db.session.commit()
        
    except Exception as error:
        db.session.rollback()
        raise APIException(str(error), status_code=500)
    
    return jsonify({ "success": "ok" }), 200


