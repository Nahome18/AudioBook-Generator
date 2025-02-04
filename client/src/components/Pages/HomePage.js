import PdfInput from '../PdfInPut/PdfInput'
import Sections from '../Sections/Sections'
import { NavLink } from 'react-router-dom';

export default function HomePage({fileName, audioUrl, allUrlsResolved, fullUrlResolved, setText, setFileName, setAudioUrl, setAllUrlsResolved, setFullUrlResolved}) {

  return(
    <div className='page'>
      <NavLink to="/history">History</NavLink>

      <PdfInput 
        fileName={fileName}
        setText={setText}
        setFileName={setFileName}
        setAudioUrl={setAudioUrl}
        setAllUrlsResolved={setAllUrlsResolved}
        setFullUrlResolved={setFullUrlResolved}
        />
      {/* {<Sections 
          audioUrl={audioUrl}
          fileName={fileName}
          allUrlsResolved={allUrlsResolved}
          fullUrlResolved={fullUrlResolved}
          setFullUrlResolved={setFullUrlResolved}
          /> }
           */}

    </div>
    
  )
}