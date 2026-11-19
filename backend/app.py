import os

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy import text

from database import db

load_dotenv()

app = Flask(__name__)

# Configuración de MariaDB
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:"
    f"{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}:"
    f"{os.getenv('DB_PORT')}/"
    f"{os.getenv('DB_NAME')}"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicializar SQLAlchemy
db.init_app(app)

# Permitir comunicación con Angular
CORS(app, resources={
    r"/api/*": {"origins": "http://localhost:4200"}
})


# Endpoint para comprobar que Flask funciona
@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify({
        "message": "¡Flask está funcionando!"
    })


# Endpoint para comprobar la conexión con MariaDB
@app.route("/api/test-db", methods=["GET"])
def test_db():
    try:
        db.session.execute(text("SELECT 1"))

        return jsonify({
            "message": "Conexión con MariaDB correcta"
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
    