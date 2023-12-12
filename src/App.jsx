import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./Utils";
import "./App.css";

function App() {
  const inputUrlRef=useRef();
  const [urlResult, setUrlResult] = useState('');

  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(inputUrlRef.current.value);
    const youtubeId = youtube_parser(inputUrlRef.current.value)
    console.log(youtubeId);

    const options = {
        method: 'get',
        url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/',
        headers: {
          'X-RapidAPI-Key': 'c1e2f3ed5fmshb3a8ef8091624e0p1c26e4jsnf034189f7e20',
          'X-RapidAPI-Host': 'coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com'
        },
        params:{
          id: youtubeId
        }       
      }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err=> console.log(err))
    
      inputUrlRef.current.value="";

      
  }
  return (
    <>
      <div className="Parent">
        <div className="child">
          <h1 className="title">Youtube to mp3 converter</h1>
          <h2> Transform youtube videos into mp3 in just view clicks. </h2>
          <form className="Form" onSubmit={handleSubmit} >
          <input ref={inputUrlRef} type="text" placeholder="enter url" className="Inputfield"></input>
          <button className="Button" type="submit">Search</button>
                    </form>
          {urlResult ? <a target="_blank" href="{urlResult}" rel="noreferrer" className="Button" >Download</a> : null}
        </div>
      </div>
    </>
  );
}

export default App;
