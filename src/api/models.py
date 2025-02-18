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

    # constructor
    def __init__(self, email, password, username, first_name, last_name, is_active=True):
        self.email = email
        self.password = password
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.is_active = is_active

    def __repr__(self):
        return f'<User {self.email}>'

    # Transforma a diccionario el objeto
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "post": list(map(lambda x: x.serialize(), self.publicaciones)),
            # do not serialize the password, its a security breach
        }


class Post(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(120), unique=False, nullable=False)

    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relación con la tabla User (1 a muchos)
    author = db.relationship('User', backref=db.backref(
        'publicaciones', cascade='all, delete-orphan')
    )

    #constructor depende de la relación con User
    # se le debe pasar el objeto User o author
    def __init__(self, title, author):
        self.title = title
        self.author = author # debe ser un objeto User

    def __repr__(self):
        return f'<Post {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author.username,
        }