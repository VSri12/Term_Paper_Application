import React, { useState } from "react";

export default function PatientLogin() {
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:5000/patient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login Successful!");
      } else {
        alert(data.error || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to login.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Patient Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={loginData.name} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
