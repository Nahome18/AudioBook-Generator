import React, { useState } from 'react';


function App() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState()

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  function handleSubmit(){
    const audioFileUrl = `http://localhost:5000/tts/${text}`;
    setAudioUrl(audioFileUrl);
  };


  return (
    <div>
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={handleSubmit}>Submit</button>
      {audioUrl && (
        <div>
          <button onClick={() => window.location.href = audioUrl}>Download</button>
          <button onClick={() => new Audio(audioUrl).play()}>Play</button>
        </div>
      )}
    </div>
  );
}

export default App;