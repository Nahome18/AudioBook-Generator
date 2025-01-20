import React, { useState, useEffect} from 'react';
import HomePage from './components/Pages/HomePage'
import './App.css'
import HistoryPage from './components/Pages/History';
import FetchAudioUrls from './components/Methods/FetchAudioUrls'
import { Route, Routes } from 'react-router-dom'
import Books from './components/Pages/Books';


export default function App() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState()
    const [fileName, setFileName] = useState('')
    const [allUrlsResolved, setAllUrlsResolved] = useState(false)
    const [fullUrlResolved, setFullUrlResolved] = useState(false)
    const [test, setTest] = useState()

    useEffect(() => {
      if (text) {
        console.time("Text-to-Audio-Generation");
        FetchAudioUrls(text, fileName, setAudioUrl, setAllUrlsResolved, setTest);
      }
    }, [text]);
    useEffect(() => {
      console.log(audioUrl)
    }, [audioUrl])
  return(
    <div className='app'>
      <Routes>
        <Route index element={<HomePage 
                            setText={setText}
                            setFileName={setFileName}
                            setAudioUrl={setAudioUrl}
                            setAllUrlsResolved={setAllUrlsResolved}
                            audioUrl={audioUrl}
                            fileName={fileName}
                            allUrlsResolved={allUrlsResolved}
                            fullUrlResolved={fullUrlResolved}
                            setFullUrlResolved={setFullUrlResolved}
                            />} />
        <Route path="/history" element={<Books />}/>
        <Route path="/history/:bookName" element={<HistoryPage />} />


      </Routes>
    </div>
    
  )
}
