import React, { useState, useEffect} from 'react';
import HomePage from './components/Pages/HomePage'
import './App.css'
import HistoryPage from './components/Pages/History';
import FetchAudioUrls from './components/Methods/FetchAudioUrls'
import { Route, Routes } from 'react-router-dom'
import Books from './components/Pages/Books';
import FileForm from './components/FileForm';
import DrawerList from './components/DrawerList/DrawerList';
import NavBar from './components/DrawerList/NavBar';

export default function App() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState()
    const [fileName, setFileName] = useState('')
    const [allUrlsResolved, setAllUrlsResolved] = useState(false)
    const [fullUrlResolved, setFullUrlResolved] = useState(false)
    const [test, setTest] = useState()
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
      if (text) {
        console.time("Text-to-Audio-Generation");
        FetchAudioUrls(text, fileName, setAudioUrl, setAllUrlsResolved, setTest);
      }
    }, [text]);

  return(
    <div className='whole'>
      <NavBar />
      <div className='app'>
        <DrawerList collapsed={collapsed} setCollapsed={setCollapsed}/>
        <div style={{opacity: collapsed? '1':'0.5'}} onClick={() => !collapsed && setCollapsed(!collapsed)}>
          <div style={{pointerEvents: collapsed? 'auto' : 'none'}}>
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
              <Route path="/history/:bookId" element={<HistoryPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
