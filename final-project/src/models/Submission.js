let submissions = [];
let nextSubId = 1;

const Submission = {
  findAll: (filter = {}) => {
    let list = [...submissions];
    if (filter.studentId) list = list.filter(s => s.studentId === parseInt(filter.studentId));
    if (filter.courseId) list = list.filter(s => s.courseId === parseInt(filter.courseId));
    return list;
  },

  findById: (id) => {
    return submissions.find(s => s.id === parseInt(id));
  },

  create: ({ studentId, studentName, courseId, title, fileName, filePath, sizeBytes }) => {
    const item = {
      id: nextSubId++,
      studentId: parseInt(studentId),
      studentName,
      courseId: parseInt(courseId),
      title: title || 'Lab Submission',
      fileName,
      filePath,
      sizeBytes,
      grade: null,
      feedback: null,
      gradedBy: null,
      submittedAt: new Date()
    };
    submissions.push(item);
    return item;
  },

  gradeSubmission: (id, { grade, feedback, instructorName }) => {
    const item = submissions.find(s => s.id === parseInt(id));
    if (!item) return null;
    item.grade = Number(grade);
    item.feedback = feedback || '';
    item.gradedBy = instructorName;
    item.gradedAt = new Date();
    return item;
  }
};

module.exports = Submission;
