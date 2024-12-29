import PyPDF2

# Open the PDF file
def pdf_to_str(pdf):
     book = ""
     with open(pdf, "rb") as pdf_file:
          reader = PyPDF2.PdfReader(pdf_file)
          
          # Get the number of pages
          num_pages = len(reader.pages)

     # Extract text from each page
          for page_num in range(num_pages):
               page = reader.pages[page_num]
               book+=page.extract_text()
     book = book.replace("\n", " ")
     return book

     
     
