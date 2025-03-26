import chai from 'chai'
import { describe, it, after } from 'mocha'
import request from 'supertest'
import app from '../../src/app'

describe('Integration tests - presentation:routes', () => {
  const urlBase = 'api/v1'

  after(async () => {})

  describe('GET /projects/:id/members', () => {
    it('should get all project members', async () => {
      const response = await request(app).get(`/${urlBase}/projects/1/members`).set('Accept', 'application/json')

      chai.expect(response.status).to.equal(200)
      chai.expect(response.body).to.be.an('array')
      if (response.body.length > 0) {
        chai.expect(response.body[0]).to.have.property('id')
        chai.expect(response.body[0]).to.have.property('name')
        chai.expect(response.body[0]).to.have.property('groups').that.is.an('array')
      }
    })

    it('should return an empty array for a project with no members', async () => {
      const response = await request(app).get(`/${urlBase}/projects/5/members`).set('Accept', 'application/json')

      chai.expect(response.status).to.equal(200)
      chai.expect(response.body).to.be.an('array')
      chai.expect(response.body).to.have.length(0)
    })
  })

  describe('POST /projects/:id/members', () => {
    it('should add a new member', async () => {
      const newUsersToAdd = [12]

      const response = await request(app).post(`/${urlBase}/projects/5/members`).send({ user_ids: newUsersToAdd }).set('Accept', 'application/json')

      chai.expect(response.status).to.equal(201)
      chai.expect(response.body).to.have.property('id')
      chai.expect(response.body).to.have.property('name')
      chai.expect(response.body).to.have.property('groups').that.is.an('array')
    })
  })

  describe('DELETE /projects/:projectId/members/:userId', () => {
    it('should delete a member', async () => {
      const response = await request(app).delete(`/${urlBase}/projects/5/members/12`).set('Accept', 'application/json')

      chai.expect(response.status).to.equal(204)
    })
  })
})
