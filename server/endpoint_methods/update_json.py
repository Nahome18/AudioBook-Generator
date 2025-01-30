import json
import asyncio
# Specify the path to your JSON file


# Step 1: Load the existing JSON file
def load_json_file(filepath):
    with open(filepath, 'r') as file:
        data = json.load(file)
    return data

# Step 2: Add or update data in the JSON file
def add_to_existing_json(json_file, book, value, type):
    with open(json_file, 'r') as file:
        data = json.load(file)
    data[book] = data.get(book, {
        "urls":[],
        "full_url":[]
    })
    if not type:
        with open(json_file, 'w') as file:
            json.dump(data, file, indent=4)

        
    data[book][type] = data[book][type] + value
    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)
   

def handle_json(book, type, url):
    json_file = "data.json"

    add_to_existing_json(json_file, book, [url], type)

def create_row(supabase):
    # Insert the new row into the database
    new_row = {'book_name':'book', 'full_url':''}
    res = supabase.table('data').insert(new_row).execute()
    
    # Check if the row was successfully inserted and the response is as expected
    print("Inserted row:", res.data)
    return res.data[0]['id']  # Return the full response

def save_book(book_name, supabase):
    new_row = {'book_name':book_name, 'full_url':''}
    res = supabase.table('data').insert(new_row).execute()
    return res.data[0]['id']
def save_url(type, url, book_name, book_id, supabase):
    if type == "urls":
        new_row = {'book_name':book_name, 'url':url, 'book_id': book_id}
        supabase.table('urls').insert(new_row).execute()
    else:
        supabase.table('data').update({'full_url':url}).eq('id',book_id).execute()