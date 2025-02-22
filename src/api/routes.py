"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post
from api.utils import generate_sitemap, APIException, check_fields
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


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

@api.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    else:

        fields = ["email", "password", "username", "first_name", "last_name"]
        
        email, password, username, first_name, last_name = check_fields(body, fields)

        new_user = User(email=email, password=password, username=username, first_name=first_name, last_name=last_name)

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
def create_post():

    body = request.get_json()

    if not body:
        raise APIException("You need to specify the request body as a json object", status_code=400)

    fields = ["title", "author_email"]
    title, author_email = check_fields(body, fields)

    searched_author = User.query.filter_by(email=author_email).first()

    if not searched_author:
        raise APIException("Author not found", status_code=404)

    new_post = Post(title=title, author=searched_author)

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