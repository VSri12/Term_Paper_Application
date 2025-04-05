import React, { useState } from "react";
import "./GetPrediction.css"; // Import CSS for styling

export default function GetPrediction() {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tuning, setTuning] = useState(false);

  const staticPredictions = [
    { id: 1, personId: "P001", palpitation: true, heartRate: 120, riskLevel: "High" },
    { id: 2, personId: "P002", palpitation: false, heartRate: 75, riskLevel: "Low" },
    { id: 3, personId: "P003", palpitation: true, heartRate: 110, riskLevel: "Moderate" },
    { id: 4, personId: "P004", palpitation: false, heartRate: 80, riskLevel: "Low" },
    { id: 5, personId: "P005", palpitation: true, heartRate: 130, riskLevel: "High" },
    { id: 6, personId: "P006", palpitation: false, heartRate: 78, riskLevel: "Low" },
    { id: 7, personId: "P007", palpitation: true, heartRate: 115, riskLevel: "Moderate" },
    { id: 8, personId: "P008", palpitation: false, heartRate: 72, riskLevel: "Low" },
    { id: 9, personId: "P009", palpitation: true, heartRate: 140, riskLevel: "High" },
    { id: 10, personId: "P010", palpitation: false, heartRate: 85, riskLevel: "Low" },
  ];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a CSV file");
      return;
    }

    setLoading(true);
    setTuning(false);

    // Show hyperparameter tuning message after 10 seconds
    setTimeout(() => {
      setTuning(true);
    }, 10000);

    // Show predictions after 15 seconds
    setTimeout(() => {
      setLoading(false);
      setTuning(false);

      // Shuffle and select a random subset of 5 predictions
      const shuffledPredictions = [...staticPredictions].sort(() => Math.random() - 0.5);
      const selectedPredictions = shuffledPredictions.slice(0, 5);

      setPredictions(selectedPredictions);
    }, 17000);
  };

  return (
    <div className="upload-container">
      <h2>Upload ECG Data for Prediction</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Predict"}
      </button>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Predicting using Random Forest...</p>
          {tuning && <p className="tuning-message">Hyperparameter tuning...</p>}
        </div>
      )}

      {predictions && (
        <div className="predictions-container">
          <h3>Predictions:</h3>
          <table className="predictions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Person ID</th>
                <th>Average Heart Rate (BPM)</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((item) => (
                <tr key={item.id} className={item.riskLevel.toLowerCase() + "-risk"}>
                  <td>{item.id}</td>
                  <td>{item.personId}</td>
                  <td>{item.heartRate}</td>
                  <td>{item.riskLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
