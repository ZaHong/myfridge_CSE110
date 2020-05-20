// tests/product.test.js
import {addFood} from "../src/models/food";

const mongoose = require('mongoose');
const {User, addUser} = require('../src/models/user.js')
const mock_db = require('./mock_db.js')

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await mock_db.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await mock_db.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await mock_db.closeDatabase());

/**
 * Product test suite.
 */
describe('User ', () => {

    /**
     * Tests that a valid product can be created through the productService without throwing any errors.
     */
    it('user can be created correctly', async () => {
        expect(async () => await addUser(user1_info))
            .not
            .toThrow();
    });
});



/**
 * Complete product example.
 */
const user1_info = {
    email: 'sample@ucsd.edu',
    password: 'helloworld'
};

/**
 * food info
 */
const food1_info = {
    name: 'Apple',
    duration: 5
};