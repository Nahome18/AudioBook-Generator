import React from 'react';
import PdfInput from './components/PdfInPut/PdfInput';
import './App.css'
import Sections from './components/Sections/Sections'


export default function App() {
  return(
    <div className='app'>
      <PdfInput />
      <Sections />
    </div>
    
  )
}
