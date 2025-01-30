import json

# Specify the path to your JSON file


# Step 1: Load the existing JSON file
def load_json_file(filepath):
    with open(filepath, 'r') as file:
        data = json.load(file)
    return data

# Step 2: Add or update data in the JSON file
def add_to_existing_json(filepath, key, value, type):
    with open(filepath, 'r') as file:
        data = json.load(file)
    data[key] = data.get(key, {
        "urls":[],
        "full_url":[]
    })
    if not type:
        with open(filepath, 'w') as file:
            json.dump(data, file, indent=4)
        return
    data[key][type] = data[key][type] + value
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)


def handle_json(book, type, url):
    json_file = "data.json"

    add_to_existing_json(json_file, book, [url], type)


