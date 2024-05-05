"""Entry point for the application."""

from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app,
                    logger=True,
                    engineio_logger=True,
                    cors_allowed_origins=['http://localhost:3000'])

@socketio.on('message')
def handle_message(user_message):
    """Handle a message sent by the user."""
    emit('response', dict(message="Test response"), broadcast=False)
