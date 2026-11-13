let courses = [
  {
    id: 1,
    title: 'Web Technologies 2 (Back End)',
    code: 'SE305',
    credits: 5,
    department: 'Software Engineering',
    instructorId: 1,
    description: '10-week intensive backend development course covering Node.js, Express, Databases, and RESTful Security.',
    createdAt: new Date('2026-01-10')
  },
  {
    id: 2,
    title: 'Data Structures and Algorithms',
    code: 'CS201',
    credits: 5,
    department: 'Computer Science',
    instructorId: 1,
    description: 'Core course on algorithm complexity, sorting, graphs, and dynamic programming.',
    createdAt: new Date('2026-01-15')
  }
];

let nextCourseId = 3;

const Course = {
  findAll: (filter = {}) => {
    let result = [...courses];
    if (filter.department) {
      result = result.filter(c => c.department.toLowerCase() === filter.department.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
    }
    return result;
  },

  findById: (id) => {
    return courses.find(c => c.id === parseInt(id));
  },

  create: ({ title, code, credits, department, description, instructorId }) => {
    const newCourse = {
      id: nextCourseId++,
      title: title.trim(),
      code: code.toUpperCase().trim(),
      credits: Number(credits) || 5,
      department: department || 'Software Engineering',
      description: description || '',
      instructorId: parseInt(instructorId),
      createdAt: new Date()
    };
    courses.push(newCourse);
    return newCourse;
  },

  updateById: (id, updates) => {
    const index = courses.findIndex(c => c.id === parseInt(id));
    if (index === -1) return null;
    courses[index] = { ...courses[index], ...updates, id: courses[index].id };
    return courses[index];
  },

  deleteById: (id) => {
    const index = courses.findIndex(c => c.id === parseInt(id));
    if (index === -1) return null;
    return courses.splice(index, 1)[0];
  }
};

module.exports = Course;
