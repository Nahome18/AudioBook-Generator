export default function ConvertPdf(file, setText) {
    console.log("converting pdf")
    return new Promise((resolve, reject) => {
        // Create a FormData object to upload the file to Flask
        const formData = new FormData();
        formData.append('pdf', file);
        

        // Send the file to the Flask server
        fetch('http://localhost:5000/upload', {  // Ensure this is the correct endpoint on your Flask app
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const text = data.extracted_text;  // Ensure this is being sent by Flask in response
                    setText(text); // Update the text in the parent component
                    resolve();  // Resolve the Promise with the extracted text
                } else {
                    reject(data.message);  // Reject the Promise if there’s an error
                }
            })
            .catch(error => {
                reject(error);  // Reject the Promise in case of any error
            });
    });
}
