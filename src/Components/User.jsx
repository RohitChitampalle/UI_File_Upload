import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate()
  const [filesData, setFilesData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const id = useParams();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:8013/api/file/list/${id}`);
      console.log('result user url for download => ', res);
      setFilesData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await axios.post(`http://localhost:8013/api/file/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // After successful upload, refresh the file list
      getData();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDelete = async (downloadUrl) => {
    let form_data = new FormData();
    form_data.append("downloadUrl", downloadUrl);
    try {
      const response = await fetch(`http://localhost:8013/api/file/delete/${id}`, { method: "DELETE", headers: { 'contenten-Type': 'application/json' }, body: form_data });

      console.log('After delete  response:', response);

      // After successful deletion, refresh the file list
      getData();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  let logOut=()=>{
    localStorage.removeItem('token')
    navigate(`/login`)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>User</div>
        <button className="btn btn-outline-danger" onClick={() => logOut}>
          Logout
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Upload File
        </label>
        <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
        <button className="btn btn-primary mt-2" onClick={handleFileUpload}>
          Upload
        </button>
      </div>
      {filesData.map((da, i) => (
        <div key={i} className='m-3'>
          <span>
            <FaFileAlt /> {da.downloadUrl}
          </span>
          <button className="btn btn-danger ml-1" onClick={() => handleDelete(da.downloadUrl)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default User;
