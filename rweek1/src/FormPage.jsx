import React, { useState } from "react";
import "./FormPage.css";
const countries = {
  India: [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Odisha",
    "Chennai",
    "Hyderabad",
    "Jaipur",
    "Lucknow",
    "Pune",
  ],
  USA: [
    "New York",
    "San Francisco",
    "Chicago",
    "Los Angeles",
    "Boston",
    "Las Vegas",
    "Columbia",
    "Detroit",
    "Oklahoma",
  ],
};
export default function FormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!/^\+\d{1,4}-\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be in +CC-NNNNNNNNNN format.";      
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!/^\w{10}$/.test(formData.pan))
      newErrors.pan = "PAN must be 10 characters.";
    if (!/^\d{12}$/.test(formData.aadhar))
      newErrors.aadhar = "Aadhar must be 12 digits.";
    return newErrors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };
  if (submitted) {
    return (
      <div className="form-container">
        <h2>Form Submitted Successfully</h2>
        <div className="summary-box">
          {Object.entries(formData).map(([key, value]) => (
            <div className="summary-item" key={key}>
              <span className="summary-label">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^\w/, (c) => c.toUpperCase())}
                :
              </span>
              <span className="summary-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Username", name: "username" },
          { label: "E-mail", name: "email" },
          { label: "Phone (+CC-NNNNNNNNNN format)", name: "phone" },
          { label: "PAN No.", name: "pan" },
          { label: "Aadhar No.", name: "aadhar" },
        ].map(({ label, name }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input name={name} value={formData[name]} onChange={handleChange} />
            {errors[name] && <div className="error">{errors[name]}</div>}
          </div>
        ))}

        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={(e) => {
              handleChange(e);
              setFormData((prev) => ({ ...prev, city: "" }));
            }}
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <div className="error">{errors.country}</div>}
        </div>

        <div className="form-group">
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select City</option>
            {(countries[formData.country] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <div className="error">{errors.city}</div>}
        </div>

        <button type="submit" disabled={Object.keys(validate()).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
}
