def parsable_txt(chapter):
    remaining_words = 2000
    curr = ""
    res = []
    for word in chapter:
        if remaining_words > 0:
            curr+=word
            remaining_words -= 1
        else:
            res.append(curr)
            curr = word
            remaining_words = 2000
    res.append(curr)
    return res