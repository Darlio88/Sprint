Certainly! Here's an example of how you can write Jest tests for a backend API server built with Mongoose, Express, and Node.js.

Let's assume you have a `user` API with endpoints for creating a user, getting all users, and getting a specific user by ID. Here's a basic implementation:

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
```

Now, let's write some Jest tests for this API. Create a file named `app.test.js` and add the following code:

```javascript
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');
const User = require('./models/user');

// Mock User model
jest.mock('./models/user');

beforeAll(() => {
  // Connect to a test database
  mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Close the database connection after all tests
  await mongoose.connection.close();
});

beforeEach(() => {
  // Clear the mock implementation of User model methods before each test
  User.create.mockClear();
  User.find.mockClear();
  User.findById.mockClear();
});

describe('User API Tests', () => {
  it('should create a new user', async () => {
    const user = { name: 'John Doe', email: 'john@example.com' };

    User.create.mockResolvedValue(user);

    const response = await request(app).post('/api/users').send(user);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(user);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith(user);
  });

  it('should get all users', async () => {
    const users = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ];

    User.find.mockResolvedValue(users);

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(users);
    expect(User.find).toHaveBeenCalledTimes(1);
  });

  it('should get a user by ID', async () => {
    const user = { _id: '123', name: 'John Doe', email: 'john@example.com' };

    User.findById.mockResolvedValue(user);

    const response = await request(app).get('/api/users/