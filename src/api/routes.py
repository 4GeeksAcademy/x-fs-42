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

@api.route('/posts', methods=['GET'])
def get_posts():

    posts = Post.query.all()
    result = [ post.serialize() for post in posts ]
    return jsonify(result), 200