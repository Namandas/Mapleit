import express from 'express';
import run from './run.js';
import files from './files.js';

const router = express.Router();

router.use('/run', run);
router.use('/files', files);

export default router;
