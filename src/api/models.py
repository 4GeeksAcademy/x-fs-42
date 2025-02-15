from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    username = db.Column(db.String(80), unique=True, nullable=False)

    first_name = db.Column(db.String(150), unique=False, nullable=False)
    last_name = db.Column(db.String(150), unique=False, nullable=False)

    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    # Transforma a diccionario el objeto
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Post(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(120), unique=False, nullable=False)

    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    author = db.relationship('User') # Objeto de la clase User

    def __repr__(self):
        return f'<Post {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author_id": self.author_id,

            "author": self.author.serialize()
        }    