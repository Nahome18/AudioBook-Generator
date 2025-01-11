import { React, useState, useEffect} from 'react';
import PdfInput from './components/PdfInPut/PdfInput';
import './App.css'
import Sections from './components/Sections/Sections'
import GetAudioFiles from './GetAudioFiles';


export default function App() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState([])


    useEffect(() => {
      function handleSubmit(){
        GetAudioFiles(text, setAudioUrl, audioUrl)
      }
      handleSubmit()
    }, [text])
  return(
    <div className='app'>
      <PdfInput setText={setText}/>
      <Sections 
        audioUrl={audioUrl}
      />
    </div>
    
  )
}
