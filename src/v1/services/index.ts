import { getProjectMembers, addProjectMember, removeProjectMember } from '../infrastructure/persistance/database/'

export const fetchProjectMembers = async (projectId: number) => {
  try {
    const members = await getProjectMembers(projectId)
    return members
  } catch (error) {
    throw new Error(`Failed to fetch project members: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export const createProjectMember = async (projectId: number, userId: number) => {
  try {
    const user = await addProjectMember(projectId, userId)
    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`, // Combine first_name and last_name
      groups: []
    }
  } catch (error) {
    throw new Error(`Failed to create project member: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export const deleteProjectMember = async (projectId: number, userId: number): Promise<void> => {
  try {
    await removeProjectMember(projectId, userId)
  } catch (error) {
    throw new Error(`Failed to delete project member: ${error instanceof Error ? error.message : String(error)}`)
  }
}
