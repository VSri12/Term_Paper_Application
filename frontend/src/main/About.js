import React from 'react';


export default function About() {
  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>OUR VISION</h4>
      <p style={styles.paragraph}>
        No one should suffer in silence. Mental health struggles like anxiety can now be recognized through heart patterns, bringing awareness and support right to your fingertips. With AI-driven insights, we empower individuals to take control of their well-being—because mental health matters, and help should always be within reach."
      </p>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#E6D5B8',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
};
