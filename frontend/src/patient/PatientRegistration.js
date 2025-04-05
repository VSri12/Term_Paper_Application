import React, { useState } from "react";

export default function PatientRegistration() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    past_issues: "",
    current_medications: "",
    heart_rate_file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleFileChange = (e) => {
    setPatient({ ...patient, heart_rate_file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", patient.name);
    formData.append("age", patient.age);
    formData.append("past_issues", patient.past_issues);
    formData.append("current_medications", patient.current_medications);
    if (patient.heart_rate_file) {
        formData.append("csv_file", patient.heart_rate_file); // Correctly append file
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/patient/register", {
            method: "POST",
            body: formData, // No need for `Content-Type`, fetch handles it
        });

        const data = await response.json();
        alert(data.message || "Patient added successfully!");
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to add patient.");
    }
};

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={patient.name} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
        <input type="number" name="age" placeholder="Age" value={patient.age} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
        <input type="text" name="past_issues" placeholder="Past Issues" value={patient.past_issues} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="current_medications" placeholder="Current Medications" value={patient.current_medications} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="file" name="heart_rate_file" onChange={handleFileChange} className="w-full p-2 border rounded mb-2" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
