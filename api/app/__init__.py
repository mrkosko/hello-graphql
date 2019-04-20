from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView


def create_app():
    app = Flask(__name__)
    CORS(app)
    
    @app.route("/")
    def hello_world():
        return "Hello World!"

    from app.schema import schema
    app.add_url_rule(
        '/graphql',
        view_func=GraphQLView.as_view(
            'graphql',
            schema=schema,
            graphiql=True  # for having the GraphiQL interface
        )
    )

    return app