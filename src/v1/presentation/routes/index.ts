import express from 'express'
import { fetchProjectMembers, createProjectMember, deleteProjectMember } from '../../services'
import { errorAPIProject } from './error.dto'

const router = express.Router()

router.get('/:id/members', async (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) throw new Error('Invalid project ID')
    const members = await fetchProjectMembers(projectId)
    return res.status(200).json(members)
  } catch (error) {
    console.log({ error })
    return res.status(400).json({ message: errorAPIProject.invalidId.message })
  }
})

router.post('/:id/members', async (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const { user_ids } = req.body

    if (isNaN(projectId)) throw new Error('Invalid project ID')
    if (!Array.isArray(user_ids) || user_ids.length === 0) {
      throw new Error('Invalid user_ids')
    }

    const member = await createProjectMember(projectId, user_ids[0])
    return res.status(201).json(member)
  } catch (err) {
    return res.status(400).json({ message: errorAPIProject.invalidInput.message, presentationError: String(err) })
  }
})

router.delete('/:projectId/members/:userId', async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId)
    const userId = parseInt(req.params.userId)

    if (isNaN(projectId) || isNaN(userId)) throw new Error('Invalid ID')

    await deleteProjectMember(projectId, userId)
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ message: errorAPIProject.invalidId.message, presentationError: String(error) })
  }
})

export default router
