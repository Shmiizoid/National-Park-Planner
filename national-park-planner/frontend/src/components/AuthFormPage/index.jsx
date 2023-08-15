import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../../utils/backend";
import './styles.css';

export default function AuthFormPage({ setLoggedInUser }) {
  const { formType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (formType === "login") {
      const { token, email } = await logIn(formData);
      localStorage.setItem("userToken", token);
      setLoggedInUser({ email }); // Set the logged-in user's email
    } else {
      const { token, email } = await signUp(formData);
      localStorage.setItem("userToken", token);
      setLoggedInUser({ email }); // Set the logged-in user's email
    }

    navigate("/");
  }

  return (
    <div id="form">
    <div className="flex items-center justify-center h-[90vh] bg-warm-gray-100">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl text-center font-bold text-gray-700 mb-6">
          {formType === "signup" ? "Sign Up" : "Log In"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-600"
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-600"
              id="password"
              name="password"
              type="password"
              minLength="6"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              {formType === "signup" ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}