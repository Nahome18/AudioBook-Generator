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


out_dir = Path(__file__).parent / "Outputs"

@app.route('/tts/<text>/<name>')
def text_to_speech(text, name):
    speech_file_path = out_dir / f"{name}.wav"
    if not speech_file_path.exists():
        print(f"Generating audio for {name}")
        print(f"Api requested for {name}")
        print(f"Text: {text}")
        with client.audio.speech.with_streaming_response.create(
                model="tts-1",
                voice="alloy",
                input=text
        ) as response:
            response.stream_to_file(speech_file_path)
    return send_from_directory(out_dir, f"{name}.wav", as_attachment=True, mimetype='audio/wav')


@app.route('/upload', methods=['POST'])
def upload():
    print("Converting to text")
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