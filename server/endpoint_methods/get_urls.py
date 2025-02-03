from endpoint_methods import split_text, handle_tts
from pathlib import Path

def get_urls(text, name, client):
    sections = split_text.split_text(text)
    print(f"Section {sections}")
    urls = []
    base_out_dir = Path(__file__).parent / "Test"
    for section in sections:
        url = handle_tts.handle_tts(base_out_dir, section, name, client)
        urls.append(url)

    return urls