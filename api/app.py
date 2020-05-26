from flask import Flask
from flask_graphql import GraphQLView
from mongoengine import connect

from schema import schema


def create_app():
    app = Flask(__name__)
    app.config.from_object('config')

    app.add_url_rule(
        '/graphql',
        view_func=GraphQLView.as_view(
            'graphql',
            schema=schema,
            graphiql=app.config['GRAPHQL_ALLOW_UI']
        )
    )

    connect(app.config['MONGODB_DB_NAME'], host=app.config['MONGODB_CONN_URI'])
    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
