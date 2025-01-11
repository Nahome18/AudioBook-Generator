export default function GetAudioFiles(text, setAudioUrl){
    let result = [];
    const words = text.split(" ")
    let currWord = ''
    for (let i = 0; i < words.length; i += 1) {
        if (currWord.length + words[i].length < 50){
            currWord += (words[i] + " ")
        }else{
            result.push(currWord)
            currWord = words[i]
        }
        
    }
    
    result.forEach((text) => {
        const audioFileUrl = `http://localhost:5000/tts/${text}`;
        setAudioUrl(prev => [...prev, audioFileUrl])
    })

    // const audioFileUrl = `http://localhost:5000/tts/${text}`;
    // setAudioUrl(audioFileUrl);
}