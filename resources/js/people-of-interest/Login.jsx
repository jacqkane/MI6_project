import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import '/resources/scss/Login.scss';

export default function Login(props) {
    const navigate = useNavigate();
    const { getUser } = useContext(UserContext);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("/login", {
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
        <form className="login-form" action="/login" method="post" onSubmit={handleSubmit}>
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

            <button>Login</button>
        </form>
    );
}
