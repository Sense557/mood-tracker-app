import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";

const MoodInsights: React.FC = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInsights = async () => {
    setLoading(true);
    // Simulate an API call to get AI-generated insights
    setTimeout(() => {
      setInsight("Here is your AI-generated insight based on your mood!");
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Button title="Get Mood Insights" onPress={fetchInsights} />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        insight && (
          <Text style={{ marginTop: 20, fontSize: 16, fontStyle: "italic" }}>
            {insight}
          </Text>
        )
      )}
    </View>
  );
};

// Use default export for consistency
export default MoodInsights;
