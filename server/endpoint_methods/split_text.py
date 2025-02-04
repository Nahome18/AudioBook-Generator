def split_text(text):
    result = []
    words = text.split(" ")
    curr_word = ''
    
    for word in words:
        if len(curr_word) + len(word) < 3500:
            curr_word += (word + " ")
        else:
            result.append(curr_word.strip())  # Remove the extra space at the end
            curr_word = word + " "
    
    if curr_word:
        result.append(curr_word.strip())
    
    return result
