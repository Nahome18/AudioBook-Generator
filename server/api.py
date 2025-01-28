from endpoint_methods import handle_tts, handle_upload, handle_full_merge, handle_mini_merge, get_urls, split_text, update_json
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from pathlib import Path
from openai import OpenAI
import os
import json
 
from dotenv import load_dotenv

load_dotenv()


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
    print(base_out_dir)
    return handle_mini_merge.handle_mini_merge(out_dir_m, input_dir_m, name)

@app.route('/data', methods=['GET'])
def get_data():
    # Read the JSON file
    with open('history.json', 'r') as json_file:
        data = json.load(json_file)  # Load the JSON content
    return jsonify(data)  # Return the JSON as a response

BASE_DIR = os.getcwd()  # Current working directory
WORDS_FOLDER = os.path.join(BASE_DIR, "Test", "words")
@app.route('/create_urls', methods=['POST'])
def get_urls():
    # Get the JSON data from the request
    data = request.get_json()
    text = data.get('text')  # Full text
    name = data.get('name')  # Name for the audio files
    
    sections = split_text.split_text(text)
    print(f"Section {sections}")
    urls = []
    i = 1
    book_name = name.split('.')[0]
    for section in sections:
        print(f"Section{i}")
        url = handle_tts.handle_tts(base_out_dir, section, f"{name}{i}", client)
        urls.append(url)
        if i%2==0:
            file_name = handle_mini_merge.handle_mini_merge(out_dir_m, input_dir_m, f"{name}{i}")
            update_json.handle_json(book_name, "urls", file_name)
        i+=1
    if len(sections)%2==1:
        file_name = handle_mini_merge.handle_mini_merge(out_dir_m, input_dir_m, f"{name}{i}")
        update_json.handle_json(book_name, "urls", file_name)
    full_name = handle_full_merge.handle_full_merge(out_dir_m, name)
    update_json.handle_json(book_name, "full_url", full_name)
    return jsonify({"fileName":name, "allResolved":True})

BOOKS_FOLDER = os.path.join(BASE_DIR, "MergedOutputs")
@app.route('/get_books', methods=['GET'])
def get_books():

    try:
        data = update_json.load_json_file("data.json")
        # List subfolders in the "Test" folder (audiobooks)
        books = [book for book in data]
        return jsonify(books)
    except Exception as e:
        return jsonify({"error": str(e)}), 5000

@app.route('/get_history/<book_name>', methods=['GET'])
def get_history(book_name):
    try:  
        # List all .wav files in the book's folder
        data = update_json.load_json_file("data.json")
        files = data[book_name]["urls"]
        full_book_url = f"http://localhost:5000/get-wav/{book_name}/{data[book_name]["full_url"][0]}"
        print(files)
        # Create a JSON response with filenames and URLs
        wav_files = [{"fileName": f, "url": f"http://localhost:5000/get-wav/{book_name}/{f}"} for f in files]
        return jsonify({'urls': wav_files, 'full_url':full_book_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-wav/<book_name>/<filename>', methods=['GET'])
def get_wav(book_name, filename):
    try:
        book_folder = os.path.join(BOOKS_FOLDER, book_name)
        if not os.path.exists(book_folder):
            return jsonify({"error": "Book not found"}), 404
        return send_from_directory(book_folder, filename,as_attachment=True, mimetype='audio/wav')
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)