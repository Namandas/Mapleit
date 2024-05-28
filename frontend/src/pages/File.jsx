import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideNav from '../components/sideNav';
import FileViewer from '../components/FileViewer';

const File = ({ userId }) => {
  return (
    <div className="home">
      <SideNav userId={userId} />
      <div className="content">
        <Routes>
          <Route path="/file/*" element={<FileViewer userId={userId} />} />
        </Routes>
      </div>
    </div>
  );
};

export default File;
