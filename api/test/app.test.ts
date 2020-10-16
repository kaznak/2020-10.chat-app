import request from 'supertest'
import { helloWorld } from '../src/app'

describe('GET /user', function () {
  it('responds with json', (done) => {
    request(helloWorld)
      .get('/')
      .expect(200, 'Hello World')
      .expect('Content-Type', 'text/plain')
      .end(done)
  })
})
