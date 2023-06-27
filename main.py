

from flask import Flask, request, abort, make_response, jsonify,session
# from mysql.connector import cursor
from settings import dbpwd
import mysql.connector as mysql
import json
import uuid
import bcrypt

# db = mysql.connect(
#     host="danielslotin-dbblog.cbrdyb6rueag.eu-central-1.rds.amazonaws.com",
#     user="admin",
#     password="danielslotin61",
#     database="dbblog")

db = mysql.connect(
    host="localhost",
    user="root",
    password=dbpwd,
    database="dbblog",
    auth_plugin='mysql_native_password')
print(db)

app = Flask(__name__)
app.secret_key = 'danielslotin61'

# ,
# static_folder='./new/build',static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/posts', methods=['GET', 'POST'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    else:
        return add_post()


def get_all_posts():
    query = "SELECT id, title, body, user_id, comment_id, tag_id, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS formatted_created_at, img  from posts"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    print(records)
    header = ['id','title', 'body','user_id','comment_id','tag_id','created_at','img']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)


def get_post(id):
    query = "SELECT id, title, body, comment_id, tag_id, img, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS formatted_created_at, user_id from posts where id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    if record is None:
        return json.dumps({})  # Return an empty JSON object if no record is found
    header = ['id', 'title', 'body', 'comment_id', 'tag_id', 'created_at', 'img', 'user_id']
    return json.dumps(dict(zip(header, record)))


def add_post():
    data = request.get_json()
    session_id = request.cookies.get("session_id")

    # Retrieve the user_id from the sessions table based on the session_id
    query = "SELECT user_id FROM sessions WHERE session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()

    if not record:
        abort(401)  # User is not logged in or session_id is invalid

    user_id = record[0]

    # Insert the post into the posts table
    query = "INSERT INTO posts (title, body, user_id) VALUES (%s, %s, %s)"
    values = (data['title'], data['body'], user_id)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()

    return get_post(new_post_id)

@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post_details(post_id):
    query = "SELECT id, title, body, comment_id, tag_id, img, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS formatted_created_at, user_id from posts where id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    if record is None:
        return json.dumps({})  # Return an empty JSON object if no record is found
    header = ['id', 'title', 'body', 'comment_id', 'tag_id', 'img', 'created_at', 'user_id']
    return json.dumps(dict(zip(header, record)))

@app.route('/posts/<post_id>', methods=['POST'])
def add_comment(post_id):
    data = request.get_json()
    print(data)
    query = "INSERT INTO comments ( post_id , body) VALUES (%s, %s)"
    values = (post_id, data['commentBody'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    return get_post(new_post_id)

@app.route('/posts/<post_id>/comments', methods=['GET'])
def get_comments(post_id):
    query = "select body from comments where post_id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    cursor.close()
    comments = [record[0] for record in records]
    return json.dumps(comments)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    query = "select id, username, password from users where username = %s"
    values = (data['user'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()

    if not record:
        abort(401)

    user_id = record[0]
    hashed_pwd = record[2].encode('utf-8')

    if bcrypt.hashpw(data['pass'].encode('utf-8'), bcrypt.gensalt()) == hashed_pwd:
        abort(401)

    query = "insert into sessions (user_id, session_id) values (%s, %s) ON DUPLICATE KEY UPDATE session_id = %s"
    session_id = str(uuid.uuid4())
    values = (record[0], session_id, session_id)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    resp = make_response()
    resp.set_cookie("session_id", session_id)
    session['user_id'] = user_id
    return resp

@app.route('/signup', methods=['POST'])
def signup():
        data = request.get_json()
        print(data)
        username = data['username']
        password = data['password']

        # Check if the username already exists in the database
        query = "SELECT id FROM users WHERE username = %s"
        values = (username,)
        cursor = db.cursor()
        cursor.execute(query, values)
        record = cursor.fetchone()
        cursor.close()
        print(data)

        if record:
            abort(409)  # username already exists

        # Hash the password
        hashed_pwd = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Insert the new user into the users table
        query = "INSERT INTO users (username, password) VALUES (%s, %s)"
        values = (username, hashed_pwd)
        cursor = db.cursor()
        cursor.execute(query, values)
        db.commit()
        cursor.close()

        resp = make_response()
        resp.status_code = 201  # Created
        return "Signup successful!"

def check_login():
    session_id = request.cookies.get("session_id")
    if not session_id:
        abort(401)
    query = "select user_id from sessions where session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    if not record:
        abort(401)


@app.route('/logout', methods=['POST'])
def logout():
    # Check if the user is logged in
    check_login()

    session_id = request.cookies.get("session_id")

    # Delete the session from the database
    query = "DELETE FROM sessions WHERE session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()

    # Clear the session cookie
    resp = make_response()
    resp.set_cookie("session_id", "", expires=0)

    return resp

@app.route('/posts/<post_id>/edit', methods=['POST'])
def edit_post(post_id):
    # Get the updated title and body from the request body
    data = request.get_json()
    updated_title = data['title']
    updated_body = data['body']

    # Check if the user is authenticated and their user_id matches the post's user_id
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 401

    # Get the user_id from the session
    user_id = session['user_id']

    # Check if the user_id matches the post's user_id
    select_query = "SELECT user_id FROM posts WHERE id = %s"
    select_values = (post_id,)
    cursor = db.cursor()
    cursor.execute(select_query, select_values)
    post_user_id = cursor.fetchone()[0]

    if user_id != post_user_id:
        return jsonify({'message': 'Unauthorized'}), 401

    # Update the post in the database
    update_query = "UPDATE posts SET title = %s, body = %s WHERE id = %s"
    update_values = (updated_title, updated_body, post_id)
    cursor.execute(update_query, update_values)
    db.commit()
    cursor.close()

    return jsonify({'message': 'Post updated successfully'})

if __name__ == "__main__":
    app.run()