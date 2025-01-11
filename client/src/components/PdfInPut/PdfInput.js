import { React, useState } from 'react'
import './PdfInput.css'
import ConvertPdf from './ConvertPdf';



export default function PdfInput(){
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState()
    const [audio, setAudio] = useState()



    function handleTextChange(e){
        setText(e.target.value);
    };

    async function handleSubmit() {
        try {
            const fileInput = document.getElementById('pdfUpload');
            const file = fileInput.files[0];
            
            // Wait for ConvertPdf to resolve and get the extracted text
            const extractedText = await ConvertPdf(file, setText);
    
            console.log(extractedText);  // This is the extracted text from the PDF
            
            // Now generate the audio URL after the text has been extracted
            const audioFileUrl = `http://localhost:5000/tts/${extractedText}`;
            setAudioUrl(audioFileUrl);
    
            // Create and play the audio
            const audioPlayer = new Audio(audioFileUrl);

            setAudio(audioPlayer);  // Optionally store the audio player for future control
        } catch (error) {
            console.error('Error during file processing:', error);
        }
    }
    
    
    

    return (
        <div>
            <input type="text" value={text} onChange={handleTextChange} />
            <button onClick={handleSubmit}>Submit</button>
            {audioUrl && text && (
                <div>
                <button onClick={() => window.location.href = audioUrl}>Download</button>
                <button onClick={() => audio.play()}>Play</button>
                </div>
            )}
            <div className="container">
                <h1>PDF to Audiobook Converter</h1>
                <div className="upload-section">
                    <label htmlFor="pdfUpload" className="upload-label">Choose a PDF file to convert:</label>
                    <input type="file" id="pdfUpload" accept=".pdf" />
                    <button onClick={handleSubmit}>Upload & Convert</button>
                    <div id="outputMessage"></div>
                    <div id="progressContainer" style={{display: null}}>
                        <progress id="progressBar" value="0" max="100"></progress>
                        <span id="progressText">0%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
