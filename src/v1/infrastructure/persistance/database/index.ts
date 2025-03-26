import { getConnection } from './db_connection/connectionFile'
import { ProjectMember, User } from './entity'
import logger from '../../../helpers/logger'

interface ProjectMemberQueryResult {
  id: number
  first_name: string
  last_name: string
}

export const getProjectMembers = async (projectId: number) => {
  const connection = await getConnection()

  const query = `
      SELECT u.id, u.first_name, u.last_name
      FROM projects_members pm
      JOIN users u ON pm.user_id = u.id
      WHERE pm.project_id = ${projectId};
    `
  try {
    const members = await connection.query(query)

    return await members.map((m: ProjectMemberQueryResult) => ({
      id: m.id,
      name: `${m.first_name} ${m.last_name}`,
      groups: []
    }))
  } catch (error) {
    logger.error('Error executing getProjectMembers query:', error)
    throw new Error(`Failed to fetch project members: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export const addProjectMember = async (projectId: number, userId: number) => {
  const connection = await getConnection()
  const userRepo = connection.getRepository(User)
  const memberRepo = connection.getRepository(ProjectMember)

  try {
    const user = await userRepo.findOne({ where: { id: userId } })
    if (!user) throw new Error('User not found')

    await memberRepo.insert({
      project_id: projectId,
      user_id: userId,
      created_at: new Date().toISOString()
    })

    return user
  } catch (error) {
    logger.error('Error adding project member:', error)
    throw new Error(`Failed to add project member: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export const removeProjectMember = async (projectId: number, userId: number) => {
  const connection = await getConnection()
  const memberRepo = connection.getRepository(ProjectMember)

  try {
    const result = await memberRepo.delete({
      project_id: projectId,
      user_id: userId
    })

    if (result.affected === 0) {
      throw new Error('Member not found in this project')
    }
  } catch (error) {
    logger.error('Error removing project member:', error)
    throw new Error(`Failed to remove project member: ${error instanceof Error ? error.message : String(error)}`)
  }
}
