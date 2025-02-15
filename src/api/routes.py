"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post
from api.utils import generate_sitemap, APIException
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

@api.route('/posts', methods=['GET'])
def get_posts():

    posts = Post.query.all()
    result = [ post.serialize() for post in posts ]
    return jsonify(result), 200