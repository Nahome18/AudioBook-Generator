import os
from pydub import AudioSegment
from pathlib import Path

def merge_wav_files(folder_path, output_file):
    print("Running full merge")
      # Ensure folder_path is a Path object
    output_file = folder_path / output_file  # Set the full output path

    # Get a list of all .wav files in the folder
    wav_files = [str(folder_path / f) for f in os.listdir(folder_path) if f.endswith(".wav")]
    
    if not wav_files:
        print(f"No WAV files found in the folder: {folder_path}")
        return
    
    # Start by loading the first audio file
    merged_audio = AudioSegment.from_file(wav_files[0], format="wav")

    # Append the rest of the files
    for file in wav_files[1:]:
        audio = AudioSegment.from_file(file, format="wav")
        merged_audio += audio

    # Export the merged audio to the desired output file
    merged_audio.export(output_file, format="wav")
    print(f"Merged audio saved to: {output_file}")