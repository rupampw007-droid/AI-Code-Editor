import express from 'express'
import { createProject, deleteProject, getProject, getProjectById, getStarredProjects, toggleStar } from '../controllers/project.controller';

const router = express.Router();

router.post('/', createProject)
router.get('/', getProject)
router.get('/starred', getStarredProjects)
router.get('/:id', getProjectById)
router.patch('/:id', toggleStar)
router.delete('/:id', deleteProject)

export default router