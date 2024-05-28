import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MonacoEditor from '@monaco-editor/react';

const FileViewer = ({ userId }) => {
  const { '*' : filePath } = useParams();
  const [fileContent, setFileContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/files/read-user-dir/${userId}/${filePath}`);
        setFileContent(response.data.content);
      } catch (error) {
        console.error('Error fetching file content', error);
      }
    };

    fetchFileContent();
  }, [userId, filePath]);
    

  const getLanguageFromFilePath = (filePath) => {
    const extension = filePath.split('.').pop();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      case 'cs':
        return 'csharp';
      case 'xml':
        return 'xml';
      // Add more mappings as needed
      default:
        return 'plaintext';
    }
  };
  
  const handleEditorChange = (value) => {
    setFileContent(value);
  };

  const saveFileContent = async () => {
    setIsSaving(true);
    try {
      await axios.post(`http://localhost:3000/api/v1/files/save-file`, {
        userId,
        filePath,
        content: fileContent
      });
      alert('File saved successfully');
    } catch (error) {
      console.error('Error saving file content', error);
      alert('Failed to save file');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="file-viewer">
      <h2>{filePath}</h2>
      <MonacoEditor
        height="90vh"
        language={getLanguageFromFilePath(filePath)}// Adjust the language based on file type
        value={fileContent}
        onChange={(value) => handleEditorChange(value)}
      />
      <button onClick={saveFileContent} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default FileViewer;
