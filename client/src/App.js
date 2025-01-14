import React, { useState, useEffect} from 'react';
import PdfInput from './components/PdfInPut/PdfInput';
import './App.css'
import Sections from './components/Sections/Sections'
import FetchAudioUrls from './components/Methods/FetchAudioUrls'


export default function App() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState([])
    const [fileName, setFileName] = useState('')
    const [allUrlsResolved, setAllUrlsResolved] = useState(false)
    const [fullUrlResolved, setFullUrlResolved] = useState(false)

    useEffect(() => {
      if (text) {
        console.time("Text-to-Audio-Generation");
        FetchAudioUrls(text, fileName, setAudioUrl, setAllUrlsResolved);
      }
    }, [text]);

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
