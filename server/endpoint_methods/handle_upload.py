# from flask import request, jsonify
# import pdfplumber

# def handle_upload():
#     print("Converting to text")
#     if 'pdf' not in request.files:
#         return jsonify({'success': False, 'message': 'No file uploaded'}), 400

#     pdf_file = request.files['pdf']

#     try:
#         # Extract text from the uploaded PDF
#         with pdfplumber.open(pdf_file) as pdf:
#             extracted_text = ""
#             for page in pdf.pages:
#                 extracted_text += page.extract_text() + "\n"

#         return jsonify({'success': True, 'extracted_text': extracted_text})
#     except Exception as e:
#         return jsonify({'success': False, 'message': str(e)}), 500
import pdfplumber
from fastapi.responses import JSONResponse

def handle_upload(pdf):
    print("Converting to text")

    try:
        # Extract text from the uploaded PDF
        with pdfplumber.open(pdf.file) as pdf_file:
            extracted_text = ""
            for page in pdf_file.pages:
                extracted_text += page.extract_text() + "\n"

        return {"success": True, "extracted_text": extracted_text}
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "message": str(e)},
        )
