from dotenv import load_dotenv

# This is kind of a hack to make sure that the environment is available in all other packages.
load_dotenv()
from src import app, socketio

if __name__ == "__main__":

    socketio.run(app, debug=True, host='localhost', port=8080)
