import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import '/resources/scss/Register.scss';

export default function Register(props) {
    const navigate = useNavigate();
    const { getUser } = useContext(UserContext);

    const [values, setValues] = useState({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("/register", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        });

        const response_data = await response.json();

        getUser();
        navigate("/main");

        if (Math.floor(response.status / 100) !== 2) {
            switch (response.status) {
                case 422:
                    console.log("VALIDATION FAILED:", response_data.errors);
                    break;
                default:
                    console.log("UNKNOWN ERROR", response_data);
                    break;
            }
        }
    };

    const handleChange = (event) => {
        setValues((previous_values) => {
            return {
                ...previous_values,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <>
            <h3>Register Form</h3>

            <form className="register-form" action="/register" method="post" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="name"
                />

                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="email"
                />

                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="password"
                />

                <input
                    type="password"
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={handleChange}
                    placeholder="password_confirmation"
                />

                <button>Register</button>
            </form>
        </>
    );
}
