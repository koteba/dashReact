import React, { useState } from "react";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        file: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setFormData({ ...formData, file: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formPayload = new FormData();
        formPayload.append("first_name", formData.firstName);
        formPayload.append("last_name", formData.lastName);
        formPayload.append("user_name", formData.userName);
        formPayload.append("email", formData.email);
        formPayload.append("password", formData.password);
        formPayload.append("confirm_password", formData.confirmPassword);
        formPayload.append("file", formData.file);

        fetch("https://vica.website/api/register", {
            method: "POST",
            body: formPayload,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                // Show success message or handle response
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle error
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleInputChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
            />
            <input type="file" onChange={handleFileChange} />
            <input type="submit" value="Sign Up" />
        </form>
    );
};

export default SignUp;
