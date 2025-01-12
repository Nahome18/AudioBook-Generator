import { React, useState } from 'react'
import './PdfInput.css'
import ConvertPdf from './ConvertPdf';



export default function PdfInput({setText}){

    async function handleSubmit() {
        try {
            
            const fileInput = document.getElementById('pdfUpload');
            const file = fileInput.files[0];
            
            await ConvertPdf(file, setText);


        } catch (error) {
            console.error('Error during file processing:', error);
        }
    }
    
    
    

    return (
        <div className="pdf-input">
            <div className="container">
                <h1>PDF to Audiobook Converter</h1>
                <div className="upload-section">
                    <label htmlFor="pdfUpload" className="upload-label">Choose a PDF file to convert:</label>
                    <input type="file" id="pdfUpload" accept=".pdf" />
                    <button onClick={handleSubmit}>Upload & Convert</button>
                </div>
            </div>
        </div>
    );
}
