const mongoose = require('mongoose');
const { getDBStatus } = require('../config/db');

// Define Mongoose Schema according to Syllabus Week 6 (NoSQL Data Modelling)
const CourseItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long']
  },
  code: {
    type: String,
    required: [true, 'Course code is required (e.g. CS201)'],
    uppercase: true,
    trim: true
  },
  credits: {
    type: Number,
    required: true,
    min: [1, 'Credits must be at least 1'],
    max: [30, 'Credits cannot exceed 30']
  },
  department: {
    type: String,
    enum: ['Computer Science', 'Software Engineering', 'Big Data Analysis', 'Information Technology'],
    default: 'Software Engineering'
  },
  isElective: {
    type: Boolean,
    default: false
  },
  instructor: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CourseMongooseModel = mongoose.model('CourseItem', CourseItemSchema);

// In-Memory Mock Store for evaluation when MongoDB is not running locally
let memoryStore = [
  {
    _id: "6640a1b2c3d4e5f6a7b8c9d0",
    title: "Web Technologies 2 (Back End)",
    code: "SE305",
    credits: 5,
    department: "Software Engineering",
    isElective: false,
    instructor: { name: "Altynbek Seitenov", email: "atynbek.seitenov@astanait.edu.kz" },
    createdAt: new Date()
  },
  {
    _id: "6640a1b2c3d4e5f6a7b8c9d1",
    title: "Database Management Systems",
    code: "CS204",
    credits: 5,
    department: "Computer Science",
    isElective: false,
    instructor: { name: "Kamila Zhakupova", email: "kamila.zhakupova@astanait.edu.kz" },
    createdAt: new Date()
  }
];

const ItemService = {
  find: async (query = {}) => {
    if (getDBStatus()) {
      return await CourseMongooseModel.find(query);
    }
    return memoryStore;
  },

  findById: async (id) => {
    if (getDBStatus()) {
      return await CourseMongooseModel.findById(id);
    }
    return memoryStore.find(item => item._id === id);
  },

  create: async (data) => {
    if (getDBStatus()) {
      return await CourseMongooseModel.create(data);
    }
    const newItem = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      createdAt: new Date()
    };
    memoryStore.push(newItem);
    return newItem;
  },

  findByIdAndUpdate: async (id, updateData) => {
    if (getDBStatus()) {
      return await CourseMongooseModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }
    const idx = memoryStore.findIndex(item => item._id === id);
    if (idx !== -1) {
      memoryStore[idx] = { ...memoryStore[idx], ...updateData };
      return memoryStore[idx];
    }
    return null;
  },

  findByIdAndDelete: async (id) => {
    if (getDBStatus()) {
      return await CourseMongooseModel.findByIdAndDelete(id);
    }
    const idx = memoryStore.findIndex(item => item._id === id);
    if (idx !== -1) {
      return memoryStore.splice(idx, 1)[0];
    }
    return null;
  }
};

module.exports = {
  CourseMongooseModel,
  ItemService
};
