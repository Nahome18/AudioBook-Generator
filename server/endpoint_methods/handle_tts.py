from flask import send_from_directory
from pydub import AudioSegment
from endpoint_methods import add_url
import json

def handle_tts(base_out_dir, text, name, client):
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
                    model="tts-1-hd",
                    voice="onyx",
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

    
    # return send_from_directory(folder_path, f"{name}.wav", as_attachment=True, mimetype='audio/wav')

    return f"http://localhost:5000/get-wav/{name}"