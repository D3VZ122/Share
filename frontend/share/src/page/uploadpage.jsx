import React, { useState } from 'react';
import axios from 'axios';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [upfiles, setUpfiles] = useState([]);
  const [filessize, setFilesizes] = useState(0);
  const [link, setLink] = useState('');
  const [id, setId] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const frontendLink = import.meta.env.VITE_Felink;
  const backendLink = import.meta.env.VITE_Belink;

  function handleChange(e) {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }

  function processFiles(selectedFiles) {
    setUpfiles(selectedFiles);
    let siz = 0;
    const fileMetadata = selectedFiles.map((file) => {
      siz += file.size;
      return {
        filename: file.name,
        filetype: file.type
      };
    });
    setFiles(fileMetadata);
    setFilesizes(siz / 1048576);
  }

  async function upload(link, file) {
    try {
      const res = await axios.put(link, file, {
        headers: {
          "Content-Type": file.type
        }
      });
      return res.data;
    } catch (error) {
      console.error(`Error uploading file to ${link}:`, error);
      throw error;
    }
  }

  async function handleUpload() {
    try {
      const response = await axios.post(`${backendLink}/putlink`, {
        files: files
      });

      const uploadLinks = response.data.message;
      setId(response.data.id);
      
      await Promise.all(uploadLinks.map((link, index) => 
        upload(link, upfiles[index])
      ));

      setLink(`${frontendLink}/download/${response.data.id}`);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Upload Files</h1>
          <div 
            className={`border-4 border-dashed rounded-xl p-8 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              onChange={handleChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Select Files
            </label>
            <p className="mt-4 text-gray-600">or drag and drop files here</p>
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selected Files</h2>
              <ul className="bg-gray-100 rounded-lg p-4 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600 mb-2">
                    {file.filename}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Total size: {filessize.toFixed(2)} MB
              </p>
            </div>
          )}

          {filessize > 250 && (
            <p className="mt-4 text-red-500 font-semibold">
              You can upload less than 250 MB of files
            </p>
          )}

          {link ? (
            <div className="mt-8 flex items-center space-x-4">
              <input
                type="text"
                value={link}
                readOnly
                className="flex-grow bg-gray-100 p-3 rounded-lg text-sm text-gray-700"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  alert("Link copied to clipboard!");
                }}
              >
                Copy
              </button>
            </div>
          ) : (
            <button
              className={`mt-8 w-full py-3 rounded-lg text-white font-semibold ${
                filessize > 250 || files.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 transition duration-300"
              }`}
              onClick={filessize < 250 && files.length > 0 ? handleUpload : undefined}
              disabled={filessize > 250 || files.length === 0}
            >
              Upload Files
            </button>
          )}
        </div>
      </div>
    </div>
  );
}