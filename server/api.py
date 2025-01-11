from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from pathlib import Path
from openai import OpenAI
import os
import pdfplumber
from dotenv import load_dotenv
load_dotenv()

from pathlib import Path

app = Flask(__name__)
CORS(app)

key = os.getenv("api_key")
client = OpenAI(api_key=key)

@app.route('/tts/<text>')
def text_to_speech(text):
    speech_file_path = Path(__file__).parent / "abebe.wav"
    response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text
            )
    response.stream_to_file(speech_file_path)

    return send_from_directory('.', 'abebe.wav', as_attachment=True, mimetype='audio/wav')

@app.route('/upload', methods=['POST'])
def upload():
    if 'pdf' not in request.files:
        return jsonify({'success': False, 'message': 'No file uploaded'}), 400

    pdf_file = request.files['pdf']

    try:
        # Extract text from the uploaded PDF
        with pdfplumber.open(pdf_file) as pdf:
            extracted_text = ""
            for page in pdf.pages:
                extracted_text += page.extract_text() + "\n"

        return jsonify({'success': True, 'extracted_text': extracted_text})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)