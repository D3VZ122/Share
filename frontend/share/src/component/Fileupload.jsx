import { useState } from 'react';
import axios from 'axios';

export default function Fileupload() {
  const [files, setFiles] = useState([]);      
  const [upfiles, setUpfiles] = useState([]);  
  const [filessize,setfilesizes] = useState(0);
  const [lin,setlink] = useState(false);
  const [id,setid] = useState("");
  const frontendlink = import.meta.env.VITE_Felink;
  const backendlink = import.meta.env.VITE_Belink;
  function handleChange(e) {
    const selectedFiles = Array.from(e.target.files);
    setUpfiles(selectedFiles);
    var siz = 0;
    for(var i=0;i<e.target.files.length;i++){
      siz+=e.target.files[i].size;
    }
    const fileMetadata = selectedFiles.map((file) => ({
      filename: file.name,
      filetype: file.type
    } ));
    setFiles(fileMetadata);
    setfilesizes(siz/1048576);
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
      const response = await axios.post(backendlink+"/putlink", {
        files: files 
      });

      const uploadLinks = response.data.message; 
      console.log(response.data.id);
      setid(response.data.id);
      
      const uploadPromises = uploadLinks.map((link, index) => 
        upload(link, upfiles[index])
      );

      const results = await Promise.all(uploadPromises).then(
        
          setlink(true)
        
      );

      alert("uploaded",results);
      
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  return (
    <>
        <div className='flex flex-col cursor-auto justify-center'>
            <h1 className='font-extrabold text-4xl text-center mb-10'>Upload Files</h1>
            <p className='font-semibold mb-4 text-gray-400'>SELECT FILES HERE OR DROP FILE</p>
            <div className='rounded-xl'>
              <div className=''>
              <input type='file' multiple onChange={handleChange} className='bg-red-400 text-center mb-4' />
              <h2 className='text-center text-xl mb-2 text-gray-400'>Selected Files</h2>
              </div>
              <div className='text-xs mb-3'>
                {files.map((files)=>{
                  return <>{files.filename} <br></br></>
                })}
              </div>
            </div>
            {filessize > 250 ? (
  <p className='text-red-400'>You Can Upload Lesser than 250 MB Of Files</p>
) : (
  ""
)}
{lin ? (
  <div className='flex items-center space-x-4'>
  <div className="bg-gray-800 p-4 rounded-lg text-center text-sm text-gray-500">
    {frontendlink + "/download/" + id}
  </div>
  <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={()=>{
    navigator.clipboard.writeText(frontendlink + "/download/" + id);
    alert("copied");
  }}>
    COPY
  </button>
</div>

) : (
  <button
    className={
      filessize > 250
        ? "opacity-50 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-400"
    }
    onClick={filessize < 250 ? handleUpload : () => {}}
    disabled={filessize > 250}
  >
    Upload Files
  </button>
)}
      </div>
    </>
  );
}


