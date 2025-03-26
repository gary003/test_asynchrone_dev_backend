export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Project Members API',
    description: 'A REST API for managing project members, including recursive group membership retrieval.',
    version: '1.0.0',
    contact: {
      name: 'Gary Johnson',
      email: 'gary.johnson.freelance@gmail.com',
      url: 'https://github.com/gary003'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:8080/api/v1',
      description: 'Local development server'
    }
  ],
  paths: {
    '/projects/{id}/members': {
      get: {
        tags: ['project'],
        summary: 'Retrieve project members recursively',
        description: 'Fetches a flattened list of members for a specific project, including users and members of nested groups (up to 5 levels).',
        operationId: 'getProjectMembers',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The ID of the project to retrieve members for.',
            schema: {
              type: 'integer',
              example: 1
            }
          }
        ],
        responses: {
          '200': {
            description: 'A list of project members, including their group affiliations.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Member'
                  }
                },
                example: [
                  { id: 1, name: 'John Doe', groups: [] },
                  { id: 2, name: 'Jane Smith', groups: ['A', 'B'] },
                  { id: 3, name: 'Alice Johnson', groups: ['B'] },
                  { id: 4, name: 'Ben Stevenson', groups: ['A'] }
                ]
              }
            }
          },
          '400': {
            description: 'Bad request (e.g., invalid project ID).',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Invalid project ID'
                }
              }
            }
          },
          '500': {
            description: 'Server error during member retrieval.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Failed to fetch project members: Database error'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Member: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The unique ID of the member.',
            example: 1
          },
          name: {
            type: 'string',
            description: 'The full name of the member.',
            example: 'John Doe'
          },
          groups: {
            type: 'array',
            description: 'The names of groups from which the member was included.',
            items: {
              type: 'string'
            },
            example: ['A', 'B']
          }
        },
        required: ['id', 'name', 'groups']
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'A description of the error.'
          }
        },
        required: ['message']
      }
    }
  }
}
