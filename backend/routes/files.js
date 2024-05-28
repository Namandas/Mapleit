import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const BASE_DIRECTORY = path.join(path.resolve(), './baseFiles/ReactApp');
const USER_DIRECTORY = path.join(path.resolve(), './userFiles');

fs.ensureDirSync(BASE_DIRECTORY);
fs.ensureDirSync(USER_DIRECTORY);

router.use(express.json());

// Create file
router.post('/create-user-directory', (req, res) => {
  const userId = uuidv4();
  const userDir = path.join(USER_DIRECTORY, userId);
  console.log(userDir);
  fs.ensureDir(userDir)
    .then(() => fs.copy(BASE_DIRECTORY, userDir))
    .then(() => res.status(201).json({ token: userId, message: 'File created successfully' }))
    .catch(err => res.status(500).json({ message: 'Error creating File' }));
});

const readDirectoryRecursively = async (dirPath) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      return {
        name: entry.name,
        type: 'directory',
        children: await readDirectoryRecursively(fullPath)
      };
    } else {
      return {
        name: entry.name,
        type: 'file',
      };
    }
  }));

  return files;
};

router.get('/read-user-dir/:userId', async (req, res) => {
  const { userId } = req.params;
  const userDir = path.join(USER_DIRECTORY, userId);
  try {
    if (!await fs.pathExists(userDir)) {
      return res.status(404).json({ message: 'Directory does not exist' });
    }
    const detailedFiles = await readDirectoryRecursively(userDir);
    res.status(200).json({ files: detailedFiles });
  } catch (err) {
    console.error(`Error reading directory for user: ${userId}`, err);
    res.status(500).json({ message: 'Error reading directory', error: err.message });
  }
});

// Serve nested files
router.get('/read-user-dir/:userId/*', async (req, res) => {
  const { userId } = req.params;
  const filePath = req.params[0]; // Get the wildcard part
  const userFilePath = path.join(USER_DIRECTORY, userId, filePath);
  try {
    if (!await fs.pathExists(userFilePath)) {
      return res.status(404).json({ message: 'File does not exist' });
    }
    const fileContent = await fs.readFile(userFilePath, 'utf8');
    res.status(200).json({ content: fileContent });
  } catch (err) {
    console.error(`Error reading file for user: ${userId}, file: ${filePath}`, err);
    res.status(500).json({ message: 'Error reading file', error: err.message });
  }
});

export default router;
