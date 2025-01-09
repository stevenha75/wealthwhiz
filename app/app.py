from flask import Flask
from routes.budget_routes import budget_bp

app = Flask(__name__)

# Register the blueprint for the budget routes
app.register_blueprint(budget_bp, url_prefix='/budget')

@app.route('/')
def hello_world():
    return 'Welcome to wizz'

if __name__ == '__main__':
    app.run(debug=True)
