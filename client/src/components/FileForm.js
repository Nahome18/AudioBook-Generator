import React, {useState} from 'react'

export default function FileForm(){
    const [file, setFile] = useState(null)
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append('file_upload', )
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='file' onChange={handleFile}/>
            <button type='submit'>Upload</button>
        </form>
    )
}
