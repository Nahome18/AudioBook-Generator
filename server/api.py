from flask import Flask, send_from_directory
from gtts import gTTS
from pathlib import Path
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

from pathlib import Path

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)