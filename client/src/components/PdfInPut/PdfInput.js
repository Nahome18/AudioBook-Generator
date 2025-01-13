import { React, useState, useRef } from 'react'
import './PdfInput.css'
import ConvertPdf from './ConvertPdf';



export default function PdfInput({fileName, setText, setFileName, setAudioUrl, setAllUrlsResolved, setFullUrlResolved}){

    const [newf, setNewf] = useState(true)
    async function handleSubmit() {
        try {
            const fileInput = document.getElementById('pdfUpload');
            const file = fileInput.files[0];
            if (!file) {
                console.error('No file selected.');
                return;
            }
            setNewf(!newf)
            setFileName(file.name);
            await ConvertPdf(file, setText);


        } catch (error) {
            console.error('Error during file processing:', error);
        }
    }
    function handleNew(){
        setNewf(!newf)
        setAudioUrl([])
        setText('')
        const x = document.getElementById('pdfUpload')
        if (x){x.value = ''}
        setAllUrlsResolved(false)
        setFullUrlResolved(false)
    }
    
    

    return (
        <div className="pdf-input">
            <div className="container">
                <h1>PDF to Audiobook Converter</h1>
                <div className="upload-section">
                    <label htmlFor="pdfUpload" className="upload-label">Choose a PDF file to convert:</label>
                    {newf?<input type="file" id="pdfUpload" accept=".pdf" />:<span>{`File chosen: ${fileName}`}</span>}
                    {newf? <button onClick={handleSubmit}>Upload & Convert</button>:
                    <button onClick={handleNew}>New</button>}
                </div>
            </div>
        </div>
    );
}
