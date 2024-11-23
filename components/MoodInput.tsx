import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const MoodInput: React.FC = () => {
  const [mood, setMood] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (mood && description) {
      console.log("Mood Submitted:", mood, description);
      // TODO: Handle submission logic here
    } else {
      alert("Please enter a mood and description!");
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18 }}>How are you feeling today? (1-5)</Text>
      <TextInput
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          padding: 8,
          marginBottom: 10,
          borderRadius: 5,
        }}
        keyboardType="numeric"
        value={mood ? mood.toString() : ""}
        onChangeText={(text) => setMood(parseInt(text))}
        placeholder="Enter mood (1-5)"
      />
      <TextInput
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          padding: 8,
          marginBottom: 10,
          borderRadius: 5,
        }}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe your mood..."
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

// Use default export for consistency
export default MoodInput;
