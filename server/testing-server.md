Sure! Here's an example of how you can test a Node.js Express API using Jest:

First, let's assume you have an Express API with a simple endpoint that returns a JSON response. Here's the code for your `app.js` file:

```javascript
const express = require('express');

const app = express();

app.get('/api/data', (req, res) => {
  const data = { message: 'Hello, World!' };
  res.json(data);
});

module.exports = app;
```

Now, let's create a test file named `app.test.js` to test this API using Jest:

```javascript
const request = require('supertest');
const app = require('./app');

describe('API Tests', () => {
  it('should return JSON data', async () => {
    const response = await request(app).get('/api/data');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Hello, World!');
  });
});
```

In this example, we use the `supertest` library to make HTTP requests to the Express API within our tests. We import the `app` instance from `app.js` and then create a test suite using `describe`.

Inside the test suite, we define a test case using `it` that expects a successful response with a status code of 200 and a JSON body containing the expected message.

To run the test, you'll need to have Jest and supertest installed in your project:

```
npm install jest supertest --save-dev
```

Then, you can run the test using the `jest` command:

```
jest app.test.js
```

Jest will execute the test and provide you with the test results.

Note: Make sure you have a running instance of your Express API while running the test so that supertest can make the actual HTTP request.