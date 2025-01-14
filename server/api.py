from endpoint_methods import handle_tts, handle_upload, handle_full_merge, handle_mini_merge
from flask import Flask
from flask_cors import CORS
from pathlib import Path
from openai import OpenAI
import os

from dotenv import load_dotenv

load_dotenv()

from pathlib import Path

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

key = os.getenv("api_key")
client = OpenAI(api_key=key)


base_out_dir = Path(__file__).parent / "Test"
out_dir_m = Path(__file__).parent / "MergedOutputs"
input_dir_m = Path(__file__).parent / "Test"

@app.route('/tts/<text>/<name>')
def text_to_speech(text, name):
    return handle_tts.handle_tts(base_out_dir, text, name, client)


@app.route('/upload', methods=['POST'])
def upload():
    return handle_upload.handle_upload()
    

@app.route('/merged/<name>')
def merged(name):
    return handle_full_merge.handle_full_merge(out_dir_m, name)


@app.route('/miniMerged/<name>')
def minimerged(name):
    return handle_mini_merge.handle_mini_merge(out_dir_m, input_dir_m, name)



if __name__ == '__main__':
    app.run(debug=True)