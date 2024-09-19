
import { useParams } from 'react-router-dom';
import Fileget from '../component/Fileget';
import { useState } from 'react';


export default function Downloadpage() {
    var { id } = useParams();
   const [link,setlink] = useState("");
    if (id === undefined) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-300">
            <div className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-lg bg-black text-white">
                <div className="grid grid-cols-1 ">
                    <div className="col-span-1 flex items-center justify-center p-4 border-r border-gray-700">
          <div className="flex flex-col cursor-auto justify-center min-h-full">
            <div>
              <h1 className="text-2xl font-bold">Download Files</h1>
            </div>
            <input type='text' placeholder='Paste Your Link here' className='bg-gray-200 text-blue-400'onChange={(e)=>{
              setlink(e.target.value);
            }}/>
            
          </div>
          </div>
          </div>
          </div>
          </div>
        );
      }
   

    return (
        <>
         <div className="flex items-center justify-center h-screen bg-gray-300">
                <div className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-lg bg-black text-white">
                    <div className="grid grid-cols-1 ">
                        <div className="col-span-1 flex items-center justify-center p-4 border-r border-gray-700">
                        <Fileget id={id}/>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
}
