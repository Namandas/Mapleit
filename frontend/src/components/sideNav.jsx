import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SideNav = ({ userId }) => {
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/files/read-user-dir/${userId}`);
        setDirectories(response.data.files);
      } catch (error) {
        console.error('Error fetching directories', error);
      }
    };

    fetchDirectories();
  }, [userId]);

  const renderDirectory = (directory, parentPath = '') => {
    const fullPath = `${parentPath}/${directory.name}`;
    return (
      <li key={fullPath}>
        {directory.type === 'directory' ? (
          <>
            <span>{directory.name}</span>
            {directory.children && (
              <ul>
                {directory.children.map((child) => renderDirectory(child, fullPath))}
              </ul>
            )}
          </>
        ) : (
          <Link to={`/allfiles/file${fullPath}`}>{directory.name}</Link>
        )}
      </li>
    );
  };

  return (
    <div className="side-nav">
      <ul>
        {directories.map((directory) => renderDirectory(directory))}
      </ul>
    </div>
  );
};

export default SideNav;
