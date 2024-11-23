// screens/HomeScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import Slider from '@react-native-community/slider';


const HomeScreen = () => {
  const [mood, setMood] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  // Handle mood submission
  const handleMoodSubmit = async () => {
    if (mood && description) {
      setLoading(true);

      try {
        // Sending data to the ChatGPT API
        const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003", // or whichever model you use
            prompt: `User mood: ${mood}, Description: ${description}. Provide insights on how they can improve their mood.`,
            max_tokens: 150,
          },
          {
            headers: {
              Authorization: `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`, // Replace with your OpenAI API key
            },
          }
        );

        // Assuming the response contains AI insights
        setAiResponse(response.data.choices[0].text);
        setLoading(false);
      } catch (error) {
        console.error("Error sending mood data:", error);
        setLoading(false);
        Alert.alert(
          "Error",
          "There was an issue with submitting your mood. Please try again later."
        );
      }
    } else {
      Alert.alert("Please fill in both fields!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Mood Tracker App!</Text>

      <Text style={styles.label}>Enter your mood (1-5)</Text>
      <TextInput
        style={styles.input}
        placeholder="Mood (1-5)"
        value={mood}
        onChangeText={setMood}
        keyboardType="numeric"
        maxLength={1}
      />

      <Text style={styles.label}>Describe your mood</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe how you feel"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Submit Mood" onPress={handleMoodSubmit} />

      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {aiResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>AI Insights:</Text>
          <Text>{aiResponse}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  responseContainer: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  responseText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HomeScreen;
