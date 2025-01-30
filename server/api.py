from fastapi import FastAPI, HTTPException, Request, UploadFile, File, BackgroundTasks
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from endpoint_methods import handle_tts, handle_upload, handle_full_merge, handle_mini_merge, get_urls, split_text, update_json
from pathlib import Path
from openai import OpenAI
import os
import time
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for specific domains in production
    allow_methods=["*"],
    allow_headers=["*"],
)

key = os.getenv("api_key")
client = OpenAI(api_key=key)


base_out_dir = Path(__file__).parent / "Test"
out_dir_m = Path(__file__).parent / "MergedOutputs"
input_dir_m = Path(__file__).parent / "Test"

@app.get("/tts/{text}/{name}")
async def text_to_speech(text: str, name: str):
    return handle_tts.handle_tts(base_out_dir, text, name, client)


@app.get('/x')
async def x():
    print("jidgfjdgf")
    return {'sudgf'}

@app.post("/upload")
async def upload(pdf: UploadFile = File(...)):
    print("tyjdfgh")
    return handle_upload.handle_upload(pdf)

@app.get("/merged/{name}")
async def merged(name: str):
    return handle_full_merge.handle_full_merge(out_dir_m, name)


@app.get("/miniMerged/{name}")
async def minimerged(name: str):
    return handle_mini_merge.handle_mini_merge(out_dir_m, input_dir_m, name)



BASE_DIR = os.getcwd()  # Current working directory
WORDS_FOLDER = os.path.join(BASE_DIR, "Test", "words")


def y(data):
    text = data.get("text")
    name = data.get("name")
    sections = split_text.split_text(text)
    urls = []
    book_name = name.split(".")[0]
    update_json.handle_json(book_name, "", "")

    for i, section in enumerate(sections, start=1):
        url = handle_tts.handle_tts(base_out_dir, section, f"{name}{i}", client)
        if i % 2 == 0:
            file_name = handle_mini_merge.handle_mini_merge(out_dir_m, input_dir_m, f"{name}{i}")
            update_json.handle_json(book_name, "urls", file_name)

    if len(sections) % 2 == 1:
        file_name = handle_mini_merge.handle_mini_merge(out_dir_m, input_dir_m, f"{name}{i}")
        update_json.handle_json(book_name, "urls", file_name)

    full_name = handle_full_merge.handle_full_merge(out_dir_m, name)
    update_json.handle_json(book_name, "full_url", full_name)

    return JSONResponse(content={"fileName": name, "allResolved": True})


@app.post("/create_urls")
async def create_urls(request: Request, background_tasks: BackgroundTasks, data: dict):
    data = await request.json()
    background_tasks.add_task(y, data)
    return



BOOKS_FOLDER = os.path.join(BASE_DIR, "MergedOutputs")
@app.get("/get_books")
async def get_books():
    try:
        data = update_json.load_json_file("data.json")
        books = list(data.keys())
        return JSONResponse(content=books)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get_history/{book_name}")
async def get_history(book_name: str):
    try:  
        print("in try")
        # List all .wav files in the book's folder
        data = update_json.load_json_file("data.json")
        files = data[book_name]["urls"]
        full_url = data[book_name]['full_url']
        if full_url:
            full_url = full_url[0]
        else:
            full_url = ""

        print(files)
        full_book_url = f"http://localhost:8000/get-wav/{book_name}/{full_url}"
        print('after full')
        wav_files = [{"fileName": f, "url": f"http://localhost:8000/get-wav/{book_name}/{f}"} for f in files]
        print('after files')
       
        return JSONResponse(content={"urls": wav_files, 'full_url': full_book_url})
    except KeyError as e:
        raise HTTPException(status_code=404, detail=f"Book '{book_name}' or key '{e.args[0]}' not found in data.json")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get-wav/{book_name}/{filename}")
async def get_wav(book_name: str, filename: str):
    print('get-wav')
    book_folder = Path("MergedOutputs") / book_name
    file_path = book_folder / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, media_type="audio/wav", filename=filename)

