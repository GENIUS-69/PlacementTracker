require('dotenv').config();
const mongoose = require('mongoose');
const Roadmap = require('./models/Roadmap');
const connectDB = require('./config/db');

const dsaData = require('./data/dsa.json');
const devopsData = require('./data/devops.json');
const systemDesignData = require('./data/system_design.json');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing roadmaps
    await Roadmap.deleteMany();
    console.log('Existing roadmaps cleared.');

    // Helper to generate slug IDs
    const slugify = (text) => text?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'id';

    const prepareData = (data) => ({
      ...data,
      topics: data.topics.map(topic => ({
        ...topic,
        topicId: topic.topicId || slugify(topic.title),
        subtopics: topic.subtopics.map(sub => ({
          ...sub,
          subtopicId: sub.subtopicId || slugify(sub.title)
        }))
      }))
    });

    // Insert new roadmaps with auto-generated IDs
    await Roadmap.insertMany([
      prepareData(dsaData), 
      prepareData(devopsData), 
      prepareData(systemDesignData)
    ]);
    console.log('Roadmaps seeded successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
