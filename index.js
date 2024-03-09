const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/food-nutrition-db', {
  serverSelectionTimeoutMS: 5000, 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const foodSchema = new mongoose.Schema({
  foodItemName: { type: String, required: true },
  foodGroup: String,
  description: String,
  nutritionalInformation: String,
  servingSize: String,
  allergens: [String],
  ingredients: [String],
  preparationMethods: [String],
  certifications: [String],
  countryOfOrigin: String,
  brandOrManufacturer: String,
  dietaryRestrictions: [String],
  healthBenefits: [String],
  bestPractices: String,
});

const Food = mongoose.model('Food', foodSchema);

const exampleFoodData = {
  foodItemName: 'Apple',
  foodGroup: 'Fruits',
  description: 'A red or green fruit with a sweet taste.',
  nutritionalInformation: 'Rich in fiber, vitamins, and antioxidants.',
  servingSize: '1 medium-sized apple',
  allergens: ['None'],
  ingredients: ['Apple'],
  preparationMethods: ['Wash and slice'],
  certifications: ['Organic'],
  countryOfOrigin: 'United States',
  brandOrManufacturer: 'Local Farms Co.',
  dietaryRestrictions: ['None'],
  healthBenefits: ['Supports heart health', 'Boosts immunity'],
  bestPractices: 'Choose organic apples for maximum health benefits.',
};

const saveExampleFoodData = async () => {
  try {
    const exampleFoodInstance = new Food(exampleFoodData);
    const savedFood = await exampleFoodInstance.save();
    console.log('Example food data saved successfully:', savedFood);
  } catch (err) {
    console.error('Error saving food data:', err);
  }
};

saveExampleFoodData();

app.get('/', (req, res) => {
  res.send('Welcome to the Food and Nutrition API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
