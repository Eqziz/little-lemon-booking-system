// In-memory data store representing database layer (Model)
let users = [
  { id: 1, name: "Nodir Mukhammedov", role: "Software Engineer", email: "nodir@example.com", createdAt: new Date("2026-01-15") },
  { id: 2, name: "Altynbek Seitenov", role: "Senior Lecturer", email: "atynbek.seitenov@astanait.edu.kz", createdAt: new Date("2026-02-01") },
  { id: 3, name: "Kamila Zhakupova", role: "Lecturer", email: "kamila.zhakupova@astanait.edu.kz", createdAt: new Date("2026-02-10") }
];

let nextId = 4;

const UserModel = {
  findAll: () => {
    return users;
  },

  findById: (id) => {
    return users.find(u => u.id === parseInt(id));
  },

  create: (userData) => {
    const newUser = {
      id: nextId++,
      name: userData.name.trim(),
      role: userData.role.trim(),
      email: userData.email.trim(),
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },

  deleteById: (id) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return null;
  }
};

module.exports = UserModel;
