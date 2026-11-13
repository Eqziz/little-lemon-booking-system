const bcrypt = require('bcryptjs');

// In-memory persistent mock storage for users
const users = [];
let nextId = 1;

const UserModel = {
  create: async ({ name, email, password, role = 'student' }) => {
    // Check duplicate email
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      const err = new Error('User already exists with this email address');
      err.status = 409;
      throw err;
    }

    // Salt and hash password (bcrypt rounds = 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: nextId++,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role.toLowerCase(), // 'student', 'instructor', 'admin'
      createdAt: new Date()
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  findByEmail: (email) => {
    return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  },

  findById: (id) => {
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  comparePassword: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
};

module.exports = UserModel;
