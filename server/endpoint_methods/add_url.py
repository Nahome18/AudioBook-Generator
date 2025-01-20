import json

# Function to update JSON with a new URL for a specific book, or add the book if not present
def add_url(book_name, new_url):
    print("adding url")
    try:
        # Step 1: Load the existing JSON data
        with open('history.json', 'r') as json_file:
            data = json.load(json_file)

        # Step 2: Check if the book exists in the data
        if book_name in data:
            # If the book exists, append the new URL to the 'urls' list
            data[book_name]["urls"].append(new_url)
            print(f"URL added for {book_name}: {new_url}")
        else:
            # If the book doesn't exist, add it with the new URL
            data[book_name] = {"urls": [str(new_url)]}
            print(f"Book '{book_name}' added with URL: {new_url}")

        # Step 3: Save the updated data back to the JSON file
        with open('history.json', 'w') as json_file:
            json.dump(data, json_file, indent=4)

    except Exception as e:
        print(f"Error: {e}")

