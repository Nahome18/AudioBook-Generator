from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from pathlib import Path
from openai import OpenAI
import os
import pdfplumber
from pydub import AudioSegment
from dotenv import load_dotenv
import mergeWav
import miniMerge
load_dotenv()

from pathlib import Path

app = Flask(__name__)
CORS(app)

key = os.getenv("api_key")
client = OpenAI(api_key=key)


base_out_dir = Path(__file__).parent / "Test"


@app.route('/tts/<text>/<name>')
def text_to_speech(text, name):
    # Create a specific folder for the given name
    folder_path = base_out_dir / name.split('.')[0]
    folder_path.mkdir(parents=True, exist_ok=True)  # Ensure the folder exists

    # Define the path for the audio file in the specific folder
    speech_file_path = folder_path / f"{name}.wav"

    # Generate and validate audio only if it doesn't exist
    if not speech_file_path.exists():
        print(f"Generating and validating audio for {name}")
        try:
            # Generate audio using the API
            with client.audio.speech.with_streaming_response.create(
                    model="tts-1",
                    voice="alloy",
                    input=text
            ) as response:
                response.stream_to_file(speech_file_path)

            # Optional validation step
            try:
                audio = AudioSegment.from_file(speech_file_path)
                audio.export(speech_file_path, format="wav")  # Ensure valid .wav
                print(f"Audio validated and saved: {speech_file_path}")
            except Exception as e:
                print(f"Validation failed for {name}: {e}")
                speech_file_path.unlink()  # Remove invalid file
                raise

        except Exception as e:
            print(f"Error generating audio for {name}: {e}")
            return f"Error generating audio: {e}", 500

    # Send the file from the specific folder
    return send_from_directory(folder_path, f"{name}.wav", as_attachment=True, mimetype='audio/wav')


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
    
    
out_dir_m = Path(__file__).parent / "MergedOutputs"
input_dir_m = Path(__file__).parent / "Test"

@app.route('/merged/<name>')
def merged(name):
    out_path = out_dir_m / name.split('.')[0]
    
    speech_file_path = out_path / f"{name}fullmerged.wav"
    if not speech_file_path.exists():
        mergeWav.merge_wav_files(out_path, f"{name}fullmerged.wav")
    return send_from_directory(out_path, f"{name}fullmerged.wav", as_attachment=True, mimetype='audio/wav')


@app.route('/miniMerged/<name>')
def minimerged(name):
    out_path = out_dir_m / name.split('.')[0]
    in_path = input_dir_m / name.split('.')[0]
    speech_file_path = out_path / f"{name}minimerged.wav"
    if not speech_file_path.exists():
        miniMerge.miniMerge(in_path, out_path, f"{name}minimerged.wav")
    return send_from_directory(out_path, f"{name}minimerged.wav", as_attachment=True, mimetype='audio/wav')
 




if __name__ == '__main__':
    app.run(debug=True)