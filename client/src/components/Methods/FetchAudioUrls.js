const FetchAudioUrls = async (text, fileName, setAudioUrl, setAllUrlsResolved, setTest) => {
  try {
    console.log("Fetching");
    
    // Make a POST request to get URLs based on text and fileName
    const response = await fetch('http://localhost:5000/create_urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,       // Input text
        name: fileName, // Base name for audio files
      }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Parse the JSON response from the backend
    const data = await response.json(); 
    console.log(data)
    // Assuming data is a list of URLs (array of strings)
    // setAudioUrl(data);  // Update state with fetched URLs
    setTest(data)
    // Indicate that all URLs have been resolved
    setAllUrlsResolved(true);  

  } catch (error) {
    console.error('Error fetching audio URLs:', error);
    
    // Handle errors gracefully, e.g., setting the resolved state to false
    setAllUrlsResolved(false); 
  }
};




    // const chunks = SplitText(text);  // Assuming SplitText splits the text into chunks
    // console.time("Text-to-Audio-Generation");
    
    // let lst = []
    // for (let i=0; i<chunks.length; i+=2){
    //   lst.push("")
    // }
    // setAudioUrl(lst)

    // let resolvedCount = 0;
    // // Loop through the chunks, fetch each one, and render one by one
    // for (let index = 0; index < chunks.length; index++) {
    //   const chunk = chunks[index];
    //   const audioFileUrl = `http://localhost:5000/tts/${encodeURIComponent(chunk)}/${fileName}${index + 1}`;

    //   // Wait for the audio file to be available (this will be a simple simulation of waiting)
    //   try {
    //     const response = await fetch(audioFileUrl);
    //     if (response.ok) {
    //        // Update the state with the new audio URL
    //       console.log(`Audio URL fetched: ${audioFileUrl}`);
    //       console.log(response)
    //       resolvedCount++;
    //       if (resolvedCount%2==0){
    //         // Replace this with your actual endpoint for the full book
    //         const url = `http://localhost:5000/miniMerged/${fileName}${index}`
    //         try{
    //             const response = await fetch(url)
    //             if (response.ok){
                  
    //               setAudioUrl((prev) => {
    //                 const newAudioUrlList = [...prev];  // Copy the previous array to avoid mutation
    //                 const firstEmptyIndex = newAudioUrlList.indexOf(""); // Find the first empty string
                    
    //                 if (firstEmptyIndex !== -1) {
    //                   newAudioUrlList[firstEmptyIndex] = url;  // Replace the first empty string with the new URL
    //                 } else {
    //                   // If there is no empty string, you can choose to add the URL to the front (or anywhere else in the array)
    //                   newAudioUrlList.unshift(url);
    //                 }
                    
    //                 return newAudioUrlList;
    //               });

    //             }else {
    //               console.error(`Error fetching audio for minimerge ${fileName}${index}`);
    //             }
    //         }catch (error) {
    //             console.error("Error fetching full book URL:", error);
    //           }
    //       } else{
    //         if (resolvedCount === chunks.length){
    //           const url = `http://localhost:5000/miniMerged/${fileName}${index}`
    //         try{
    //             const response = await fetch(url)
    //             if (response.ok){
    //               setAudioUrl((prev) => {
    //                 const newAudioUrlList = [...prev];  // Copy the previous array to avoid mutation
    //                 const firstEmptyIndex = newAudioUrlList.indexOf(""); // Find the first empty string
                    
    //                 if (firstEmptyIndex !== -1) {
    //                   newAudioUrlList[firstEmptyIndex] = url;  // Replace the first empty string with the new URL
    //                 } else {
    //                   // If there is no empty string, you can choose to add the URL to the front (or anywhere else in the array)
    //                   newAudioUrlList.unshift(url);
    //                 }
                    
    //                 return newAudioUrlList;
    //               });

    //             }else {
    //               console.error(`Error fetching audio for minimerge ${fileName}${index}`);
    //             }
    //         }catch (error) {
    //             console.error("Error fetching full book URL:", error);
    //           }
    //         }
    //       }
    //     } else {
    //       console.error(`Error fetching audio for chunk ${index + 1}`);
    //     }
    //   } catch (error) {
    //     console.error(`Error during fetch for chunk ${index + 1}: ${error}`);
    //   }
    // }
    // if (resolvedCount === chunks.length) {
    //   setAllUrlsResolved(true);  // All URLs have been resolved
    // }
    // console.timeEnd("Text-to-Audio-Generation");

export default FetchAudioUrls