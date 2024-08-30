import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = ({ user, onSave, onCancel, isEditMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
    catchPhrase: "",
    bs: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
        companyName: user.company?.name || "",
        catchPhrase: user.company?.catchPhrase || "",
        bs: user.company?.bs || "",
        street: user.address?.street || "",
        suite: user.address?.suite || "",
        city: user.address?.city || "",
        zipcode: user.address?.zipcode || "",
      });
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "username",
      "email",
      "phone",
      "website",
      "companyName",
      "catchPhrase",
      "bs",
      "street",
      "suite",
      "city",
      "zipcode",
    ];

    // Check for empty required fields
    const emptyFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (emptyFields.length > 0) {
      newErrors.general = "All fields are required";
    }

    // Individual field validations
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (
      formData.website &&
      !/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[a-z0-9-_.]*)*\/?$/.test(
        formData.website
      )
    ) {
      newErrors.website = "Website URL is invalid";
    }

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").trim()} is required`;
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.general) {
        toast.error(validationErrors.general);
      } else {
        const specificError = Object.values(validationErrors)[0];
        toast.error(specificError);
      }
      return;
    }

    try {
      await onSave(formData);
      toast.success("User saved successfully!");
    } catch (error) {
      toast.error(
        "Network error: Unable to save user. Please try again later."
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Update User" : "Add User"}
        </h2>

        {[
          "name",
          "username",
          "email",
          "phone",
          "website",
          "companyName",
          "catchPhrase",
          "bs",
          "street",
          "suite",
          "city",
          "zipcode",
        ].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field
                .replace(/([A-Z])/g, " $1")
                .trim()}`}
              className={`w-full p-2 border rounded-lg ${
                errors[field] ? "border-red-500" : ""
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
