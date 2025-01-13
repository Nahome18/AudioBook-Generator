import React, { useState, useEffect} from 'react';
import PdfInput from './components/PdfInPut/PdfInput';
import './App.css'
import Sections from './components/Sections/Sections'
import SplitText from './SplitText';



export default function App() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState([])
    const [fileName, setFileName] = useState('')
    const [allUrlsResolved, setAllUrlsResolved] = useState(false)
    const [fullUrlResolved, setFullUrlResolved] = useState(false)

    useEffect(() => {
      if (text) {
        console.time("Text-to-Audio-Generation");
        // Define an async function to handle API requests one by one
        const fetchAudioUrls = async () => {
          const chunks = SplitText(text);  // Assuming SplitText splits the text into chunks
  
          let resolvedCount = 0;
          // Loop through the chunks, fetch each one, and render one by one
          for (let index = 0; index < chunks.length; index++) {
            const chunk = chunks[index];
            const audioFileUrl = `http://localhost:5000/tts/${encodeURIComponent(chunk)}/${fileName}${index + 1}`;
  
            // Wait for the audio file to be available (this will be a simple simulation of waiting)
            try {
              const response = await fetch(audioFileUrl);
              if (response.ok) {
                setAudioUrl((prev) => [...prev, audioFileUrl]); // Update the state with the new audio URL
                console.log(`Audio URL fetched: ${audioFileUrl}`);
                resolvedCount++;
              } else {
                console.error(`Error fetching audio for chunk ${index + 1}`);
              }
            } catch (error) {
              console.error(`Error during fetch for chunk ${index + 1}: ${error}`);
            }
          }
          if (resolvedCount === chunks.length) {
            setAllUrlsResolved(true);  // All URLs have been resolved
          }
          console.timeEnd("Text-to-Audio-Generation");
        };
  
        // Call the async function
        fetchAudioUrls();
      }
    }, [text]);  // Dependencies: text and fileName

  return(
    <div className='app'>
      <PdfInput 
        fileName={fileName}
        setText={setText}
        setFileName={setFileName}
        setAudioUrl={setAudioUrl}
        setAllUrlsResolved={setAllUrlsResolved}
        setFullUrlResolved={setFullUrlResolved}
        />
      {<Sections 
          audioUrl={audioUrl}
          fileName={fileName}
          allUrlsResolved={allUrlsResolved}
          fullUrlResolved={fullUrlResolved}
          setFullUrlResolved={setFullUrlResolved}
          /> }
    </div>
    
  )
}
// const isFirstRender = useRef(true);

// useEffect(() => {
//     if (isFirstRender.current) {
//         result.forEach((text, index) => {
//             const audioFileUrl = `http://localhost:5000/tts/${text}/Section${index+1}`;
//             setAudioUrl(prev => [...prev, audioFileUrl]);
//         });
//         isFirstRender.current = false;
//     }
// }, []);