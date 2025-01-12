import React, { useState, useEffect} from 'react';
import PdfInput from './components/PdfInPut/PdfInput';
import './App.css'
import Sections from './components/Sections/Sections'
import SplitText from './SplitText';


export default function App() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState([])


    useEffect(() => {
      if (text) {
        const audioFileUrls = SplitText(text).map((chunk, index) => {
          return `http://localhost:5000/tts/${encodeURIComponent(chunk)}/Section${index + 1}`;
        });
        console.log("Done")
        setAudioUrl(audioFileUrls);  // Update state with the generated URLs
      }
    }, [text]);
  return(
    <div className='app'>
      <PdfInput setText={setText}/>
      {audioUrl? <Sections audioUrl={audioUrl}/> : <></>}
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