const request = require('supertest');
const fs = require('fs');
const path = require('path');
const db = require('../server/models');

const server = 'http://localhost:3000';

// const { Pool } = require('pg');
// // TODO: require db
// // require('dotenv').config();

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

// // const testPool = new Pool({
// //   connectionString:
// // });

// const testDb = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return newPool.query(text, params, callback);
//   }
// };

const userID = 15;
const testQuery = `SELECT job_id, user_id, job_role, company_name, 
phone, email, contact_name, job_link, status 
FROM jobs 
WHERE user_id = $1`;
const testParams = [userID];

// const getTestQuery = async () => {
//   const res = await db.query(testQuery, testParams);
//   return res;
// };

// const testData = getTestQuery();
// console.log('testData', testData);

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/users', () => {
    const testUserInfo = {
      firstName: 'Test',
      lastName: 'Name',
      email: 'test@db.com',
      password: 'test123',
    };

    const testObj = {
      first_name: testUserInfo['firstName'],
      last_name: testUserInfo['lastName'],
      email: testUserInfo['email'],
    };

    describe('POST', () => {
      it('Creates a new user by inserting user info into SQL database', () => {
        return request(server)
          .post('/users')
          .send(testUserInfo)
          .expect(200)
          .then(async (res) => {
            console.log('res.body', res.body);
            const { first_name, last_name, email } = res.body;
            expect({ first_name, last_name, email }).toEqual(testObj);
          });
        // const res = await request(server).post('/users').send(testUserInfo);
        // console.log('testInfo', testUserInfo);
        // console.log('res.body', res.body);
        // expect(res.status).toEqual(200);
        // expect(res.body).toEqual(testUserInfo);
      });
    });

    describe('GET', () => {
      it("Successfully sends user's job application info", async () => {
        const res = await request(server).get(`/users/${userID}`);
        // expect('Content-Type', /application\/json/);
        console.log('res.body', res.body);
        const testData = await db.query(testQuery, testParams);
        expect(res.body).toEqual(testData.rows);
      });
    });
  });
});
