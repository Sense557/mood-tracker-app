import axios from 'axios';

// Backend API URL for mood data submission (Change based on your backend URL)
const API_URL = "http://localhost:5000/api/get-mood-insights"; // Replace with actual API endpoint

// Function to send mood data and get AI insights
export const submitMood = async (moodScale: number, moodDescription: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, {
      moodScale,
      moodDescription,
    });
    return response.data.insights;  // Assuming the API returns insights in this field
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw new Error('Failed to fetch insights');
  }
};
