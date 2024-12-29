import shutil
from pathlib import Path

def merge_mp3(mp3_files, i):
    # List of MP3 files to merge
    # Define the output file path
    output_file = Path(__file__).parent / f"chapter{i+1}.mp3"

    # Open the output file in binary write mode
    with open(output_file, 'wb') as merged:
        # Loop through each MP3 file in the list
        for mp3_file in mp3_files:
            with open(mp3_file, 'rb') as f:
                shutil.copyfileobj(f, merged)


