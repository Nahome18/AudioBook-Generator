from parsable_txt import parsable_txt
from pathlib import Path
from merge_mp3 import merge_mp3

def to_mp3(chapters, client):
    for i in range(len(chapters)):
        chapter_sections = parsable_txt(chapters[i])
        curr_chapter = []
        for section_i in range(len(chapter_sections)):
            if not chapter_sections[section_i]:
                continue
            speech_file_path = Path(__file__).parent / f"section{i+1}{section_i+1}.mp3"
            section_str = chapter_sections[section_i]

            response = client.audio.speech.create(
                model="tts-1",
                voice="alloy",
                input=section_str
            )
            response.stream_to_file(speech_file_path)
            curr_chapter.append(f"section{i+1}{section_i+1}.mp3")
        print(f"Chapter{i+1} ready to play!")
        merge_mp3(curr_chapter, i)

