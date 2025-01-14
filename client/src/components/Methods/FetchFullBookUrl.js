const FetchFullBookUrl = async (fileName, setFullBookUrl, setFullUrlResolved) => {
    // Replace this with your actual endpoint for the full book
    console.log("requesting full merge")
    const url = `http://localhost:5000/merged/${fileName}`
    try{
        const response = await fetch(url)
        if (response.ok){
            setFullBookUrl(url)
            setFullUrlResolved(true)
        }else {
            console.error("Error fetching full audio");
        }
    }catch (error) {
        console.error("Error fetching full book URL:", error);
        }
    };
export default FetchFullBookUrl