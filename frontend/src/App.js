import React, { useState } from 'react';
import axios from 'axios';
import PeopleList from './PeopleList';  // Adjust the import path based on your file structure

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>CSV Uploader</h2>
      <input type="file" accept=".csv" onChange={onFileChange} />
      <button onClick={onUpload}>Upload</button>
      <p>{message}</p>
      <PeopleList />
    </div>
  );
}

export default App;
