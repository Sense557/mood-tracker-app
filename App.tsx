import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native"; // Use Expo's components
import axios from "axios";
import Slider from "@react-native-community/slider"; // Import Slider from the new package

const App = () => {
  const [moodScale, setMoodScale] = useState<number>(1); // Mood scale (1-5)
  const [description, setDescription] = useState<string>(""); // Mood description input
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [insight, setInsight] = useState<string>(""); // AI-generated insight

  // Handle form submission and request to the ChatGPT API
  const handleSubmit = async () => {
    if (!description) {
      alert("Please provide a mood description.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions", // ChatGPT API URL
        {
          model: "gpt-3.5-turbo", // Choose the appropriate model
          prompt: `The user is feeling a mood of ${moodScale} and described it as: ${description}. Provide insights on how to improve their mood.`,
          max_tokens: 150, // Max response tokens
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
            "Content-Type": "application/json", // Set the request content type
          },
        }
      );

      // Set the AI insights after a successful API response
      setInsight(response.data.choices[0].text.trim());
    } catch (error) {
      setInsight("Error fetching insight. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>

      <Text>Rate your mood (1-5):</Text>
      <Text>{moodScale}</Text>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={moodScale}
        onValueChange={(value) => setMoodScale(value)}
      />

      <Text>Describe your mood:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="How do you feel today?"
      />

      <Button title="Submit" onPress={handleSubmit} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {insight && (
        <View style={styles.insightContainer}>
          <Text style={styles.insightText}>AI Insights:</Text>
          <Text>{insight}</Text>{" "}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  insightContainer: {
    marginTop: 20,
  },
  insightText: {
    fontWeight: "bold",
  },
});

export default App;
