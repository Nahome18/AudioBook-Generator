from openai import OpenAI
from pdf_to_str import pdf_to_str
from to_mp3 import to_mp3
from group_chapters import group_chapters
from parsable_txt import parsable_txt
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("api_key")
client = OpenAI(api_key=key)


book_str = pdf_to_str("try.pdf")
text_chunks = parsable_txt(book_str)
chapters = group_chapters(text_chunks, client)
to_mp3(chapters, client)


    