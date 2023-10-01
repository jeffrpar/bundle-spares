// see SignupForm.js for comments
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import "./Login.css";
import { LOGIN_USER } from "../../../utils/mutations";
import Auth from "../../../utils/auth";

function Login() {
    const [userFormData, setUserFormData] = useState({ email: "", password: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [login] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: "",
            email: "",
            password: "",
        });
    };

    return (
        <div className="forma-container">
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="forma">
                <Alert className="alert"
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    <h2>Something went wrong with your login credentials!</h2>
                </Alert>
                <Form.Group className="form-element">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your email"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                </Form.Group>

                <Form.Group className="form-element">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Your password"
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                </Form.Group>
                <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type="submit"
                    variant="success"
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;