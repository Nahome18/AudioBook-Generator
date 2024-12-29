def group_chapters(text_chunks, client):
    chapters = []
    curr_page = ""
    for chunk in text_chunks:
        prompt = f"""
        The following text is from a book. Please determine if this chunk belongs to the current chapter, or if it contains the start of a new chapter.
        The current Chapter is chapter {len(chapters)+1}
        Dont worry about new lines, i want you to focus on when it mentions "Chapter 1" or "Chapter 2"....

        - If this text belongs to the current chapter, return a list where:
          - The first element is True.
          - The second element is a list containing the chunk of text.
        
        - If a new chapter starts within this chunk, return a list where:
          - The first element is False.
          - The second element is a list containing two parts:
            1. The part that belongs to the current chapter (up to the start of the new chapter).
            2. The part that is the start of the new chapter until the end of that chunk.

        The format should look like this:
        - If part of the current chapter: [True, [<chunk>]]
        - If a new chapter starts: [False, [<current chapter part>, <new chapter part>]]

        Text:
        {chunk}
        """
        
        response = client.chat.completions.create(
            model="gpt-4",  # Model to use (gpt-4 in this case)
            messages=[
                {
                    "role": "user",  # Role of the sender (user in this case)
                    "content": prompt  # The actual prompt
                }
            ]
        )
        
        # Parse the response
        text_response = response.choices[0].message.content

        try:
            # Evaluate the response safely (should be in list format)
            response_list = eval(text_response)
            
            # Append the response to the chapters list
            if isinstance(response_list, list) and len(response_list) == 2:                                                     
                if response_list[0]:
                    curr_page+=response_list[1][0]
                else:
                    curr_page+=response_list[1][0]
                    chapters.append(curr_page)
                    curr_page = response_list[1][1]
                
            else:
                print(f"Unexpected format: {text_response}")
        except Exception as e:
            print(f"Error parsing response: {e}")
            print(f"Original response: {text_response}")
    chapters.append(curr_page)
    return chapters