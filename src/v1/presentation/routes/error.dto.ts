export const errorAPIProject = {
  invalidId: {
    message: 'Invalid project or user ID provided',
    code: 'INVALID_ID',
    status: 400
  },
  invalidInput: {
    message: 'Invalid input data provided',
    code: 'INVALID_INPUT',
    status: 400
  },
  projectNotFound: {
    message: 'Project not found',
    code: 'PROJECT_NOT_FOUND',
    status: 404
  },
  userNotFound: {
    message: 'User not found',
    code: 'USER_NOT_FOUND',
    status: 404
  },
  memberAlreadyExists: {
    message: 'User is already a member of this project',
    code: 'MEMBER_ALREADY_EXISTS',
    status: 409
  },
  memberNotFound: {
    message: 'Member not found in this project',
    code: 'MEMBER_NOT_FOUND',
    status: 404
  },
  internalServerError: {
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
    status: 500
  }
} as const

export type ProjectErrorType = keyof typeof errorAPIProject
