import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DownloadPage() {
  const { id } = useParams();
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const backendLink = import.meta.env.VITE_Belink;

  useEffect(() => {
    if (id) {
      fetchFiles(id);
    }
  }, [id]);

  const fetchFiles = async (fileId) => {
    try {
      const response = await axios.get(`${backendLink}/getlink?id=${fileId}`);
      setFiles(response.data.data);
      setSelectedFiles(new Array(response.data.data.length).fill(false));
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedFiles(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleDownload = async () => {
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles[i]) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Download Files</h1>
          
          {!id && (
            <div className="mb-8">
              <input 
                type="text" 
                placeholder="Paste your download link here" 
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLink(e.target.value)}
              />
              <button 
                className="mt-4 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => {
                  const fileId = link.split('/').pop();
                  if (fileId) fetchFiles(fileId);
                }}
              >
                Fetch Files
              </button>
            </div>
          )}

          {files.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Files</h2>
              <div className="bg-gray-100 rounded-lg p-4 max-h-64 overflow-y-auto mb-6">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`file-${index}`}
                      checked={selectedFiles[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="mr-3 form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label htmlFor={`file-${index}`} className="text-gray-700 cursor-pointer">
                      {file.filename}
                    </label>
                  </div>
                ))}
              </div>
              <button
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={handleDownload}
              >
                Download Selected Files
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-600">No files available or invalid link.</p>
          )}
        </div>
      </div>
    </div>
  );
}