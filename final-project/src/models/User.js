const bcrypt = require('bcryptjs');

let users = [];
let nextId = 1;

const User = {
  create: async ({ name, email, password, role = 'student' }) => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      const err = new Error('Email is already registered.');
      err.status = 409;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      id: nextId++,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role.toLowerCase(), // 'student', 'instructor', 'admin'
      enrolledCourses: [],
      createdAt: new Date()
    };

    users.push(user);
    const { password: _, ...cleanUser } = user;
    return cleanUser;
  },

  findByEmail: (email) => {
    return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  },

  findById: (id) => {
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
      const { password, ...cleanUser } = user;
      return cleanUser;
    }
    return null;
  },

  findAll: () => {
    return users.map(({ password, ...u }) => u);
  },

  comparePassword: async (inputPass, hashedPass) => {
    return await bcrypt.compare(inputPass, hashedPass);
  }
};

module.exports = User;
