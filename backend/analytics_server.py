import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from flask import Flask
from flask_cors import CORS
from src.routes.analytics_api import analytics_api

app = Flask(__name__)
app.config['SECRET_KEY'] = 'test'
CORS(app)
app.register_blueprint(analytics_api)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
