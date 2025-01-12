import wave
import os

def merge_wav_files(folder_path, output_file):
    # List all .wav files in the folder
    wav_files = [f for f in os.listdir(folder_path) if f.endswith('.wav')]

    # Sort files (optional)
    wav_files.sort()  # Sort files alphabetically or by any other criteria if needed

    output_path = os.path.join(folder_path, output_file)
    with wave.open(output_path, 'wb') as outfile:
        for i, wav_file in enumerate(wav_files):
            with wave.open(os.path.join(folder_path, wav_file), 'rb') as infile:
                # Set the parameters for the output file from the first input file
                if i == 0:
                    outfile.setparams(infile.getparams())
                # Write frames to the output file
                outfile.writeframes(infile.readframes(infile.getnframes()))

    print(f"Merged audio file saved at: {output_path}")


