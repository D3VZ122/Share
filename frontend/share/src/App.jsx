import { useState} from 'react';
import axios from 'axios';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Upload from './page/uploadpage';
import Downloadpage from './page/downloadpage';

function App() {
  const [files, setFiles] = useState([]);      // Metadata of files (name and type)
  const [upfiles, setUpfiles] = useState([]);  // Actual file objects

  function handleChange(e) {
    const selectedFiles = Array.from(e.target.files);
    setUpfiles(selectedFiles);

    const fileMetadata = selectedFiles.map((file) => ({
      filename: file.name,
      filetype: file.type
    }));
    setFiles(fileMetadata);
  }

  async function upload(link, file) {
    

    try {
      const res = await axios.put(link, file, {
        headers: {
          "Content-Type":file.type
        }
      });
      return res.data;
    } catch (error) {
      console.error(`Error uploading file to ${link}:`, error);
      throw error; // Re-throw the error to handle it later
    }
  }

  async function handleUpload() {
    try {
      const response = await axios.post("http://localhost:3000/putlink", {
        files: files // Send file metadata (e.g., name, type) to get upload URLs
      });

      const uploadLinks = response.data.message; // Assuming response.data is an array of upload URLs
      
      const uploadPromises = uploadLinks.map((link, index) => 
        upload(link, upfiles[index])
      );

      // Await all upload promises
      const results = await Promise.all(uploadPromises);
      console.log('All files uploaded successfully:', results);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/upload' element={<Upload/>}></Route>
      <Route path='/download/:id' element={<Downloadpage/>}></Route>
      <Route path='/download' element={<Downloadpage/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
