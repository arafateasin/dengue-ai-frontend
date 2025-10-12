// Simple test script to verify the API connection
// Run this in the browser console to test the prediction API

async function testPredictionAPI() {
  console.log("🧪 Testing Prediction API...");
  
  const API_BASE_URL = "http://localhost:8002";
  
  try {
    // Test 1: Health Check
    console.log("1. Testing health check...");
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log("✅ Health Check:", healthData);
    
    // Test 2: Live Weather Prediction
    console.log("2. Testing live weather prediction...");
    const predictionData = {
      location: "Kuala Lumpur",
      state: "Selangor",
      temperature: 32,
      humidity: 80,
      rainfall: 10
    };
    
    const predictionResponse = await fetch(`${API_BASE_URL}/predict/live-weather`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(predictionData)
    });
    
    const predictionResult = await predictionResponse.json();
    console.log("✅ Prediction Result:", predictionResult);
    
    return {
      health: healthData,
      prediction: predictionResult
    };
    
  } catch (error) {
    console.error("❌ Test failed:", error);
    return { error: error.message };
  }
}

// Run the test
testPredictionAPI().then(result => {
  console.log("🏁 Test completed:", result);
});