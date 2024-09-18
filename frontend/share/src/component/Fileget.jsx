import axios  from "axios";

import  { useEffect, useState } from 'react';
export default function Fileget(props){
     const id = props.id;
     const [files,setfiles] = useState([]);
     var arr = [];
     useEffect(()=>{
         async function getdata(){
         const ans = await axios.get("http://localhost:3000/getlink?id="+id);

         for(var i=0;i<ans.data.data.length;i++){
          arr.push(false);
         }
        
         setfiles(ans.data.data);
         }
         getdata();
      },[])
      const handleDownload = async () => {
        try {
          for(let i=0;i<arr.length;i++){
            if (arr[i]==true) {
              const file = files[i];
              const response = await axios.get(file.url, { responseType: 'blob' });
    
              const blob = new Blob([response.data], { type: response.headers['content-type'] });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = file.filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            }
          }
        } catch (error) {
          console.error('Error downloading files:', error);
        }
      };
    return (
        <>
       
      <div className=" flex flex-col cursor-auto justify-center min-h-ful">
        <div><h1 className="text-2xl font-bold">Download Files</h1></div>
        
        <div className="">{files?files.map((ele,key)=>{
          // eslint-disable-next-line react/jsx-key
          return (<div><label className="flex">
          <input type="checkbox" value={key} onChange={(e)=>{
                arr[key]= !arr[key];
          }}/>
          {ele.filename} 
        </label>
      
        </div>
        
        )

        }):"No Files Broken Link"}</div>
          {files?<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 " onClick={handleDownload}>Download</button>:""}
      </div>
      
        </>
    )
}