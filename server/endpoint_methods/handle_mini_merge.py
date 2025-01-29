from flask import send_from_directory
import os
from pydub import AudioSegment
from pathlib import Path
from natsort import natsorted

def handle_mini_merge(out_dir_m, input_dir_m, name):
    out_path = out_dir_m / name.split('.')[0]
    in_path = input_dir_m / name.split('.')[0]
    speech_file_path = out_path / f"{name}minimerged.wav"
    print("in mini merge")
    if not speech_file_path.exists():
        miniMerge(in_path, out_path, f"{name}minimerged.wav")
    return f"{name}minimerged.wav"
    #return send_from_directory(out_path, f"{name}minimerged.wav", as_attachment=True, mimetype='audio/wav')


def miniMerge(input_folder, output_folder, output_file_name):
    print("Running minimerge")
    input_folder = Path(input_folder)  # Ensure input_folder is a Path object
    output_folder = Path(output_folder)  # Ensure output_folder is a Path object
    output_folder.mkdir(parents=True, exist_ok=True)  # Create output folder if it doesn't exist

    output_file = output_folder / output_file_name  # Set the full output path

    # Get a list of all .wav files in the input folder
    wav_files = natsorted([str(input_folder / f) for f in os.listdir(input_folder) if f.endswith(".wav")])
    
    if not wav_files:
        print(f"No WAV files found in the folder: {input_folder}")
        return

    print(f"Found {len(wav_files)} files to merge in {input_folder}.")
    
    try:
        # Start by loading the first audio file
        merged_audio = AudioSegment.from_file(wav_files[0], format="wav")

        # Append the rest of the files
        for file in wav_files[1:]:
            audio = AudioSegment.from_file(file, format="wav")
            merged_audio += audio

        # Export the merged audio to the desired output folder
        merged_audio.export(output_file, format="wav")
        print(f"Merged audio saved to: {output_file}")


        for file in wav_files:
            try:
                os.remove(file)
                print(f"Deleted file: {file}")
            except Exception as e:
                print(f"Error deleting file {file}: {e}")

    except Exception as e:
        print(f"Error while merging files: {e}")
        return None