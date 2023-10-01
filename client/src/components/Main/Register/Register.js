// --------------------------------------------------------------------------------
// Imports/Dependencies

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../../../utils/mutations'
import Auth from '../../../utils/auth'
import { Form, Button, Alert } from "react-bootstrap";

// --------------------------------------------------------------------------------
// Component
function Register() {
    // --------------------------------------------------------------------------------
    // Helper Functions

    // Set initial state
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

    // Set state for form validation
    const [validated] = useState(false);
    // Set state for alert
    const [showAlert, setShowAlert] = useState(false);

    // Mutation to add user
    const [addUser] = useMutation(ADD_USER);

    // Create a function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Create a function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Check if form has everything
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Try to add user
        try {
            // Add user to DB
            const { data } = await addUser({
                variables: { ...userFormData }
            });
            // Store token
            Auth.login(data.addUser.token);

        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        // Reset form
        setUserFormData({
            username: '',
            email: '',
            password: '',
        });

    };




    return (
        <div className="forma-container">
            {/* This is needed for the validation functionality above */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="forma">
                {/* show alert if server response is bad */}
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    Something went wrong with your signup!
                </Alert>

                <Form.Group className="form-element">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your username"
                        name="username"
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className='invalido'>
                        <h6>Username is required!</h6>
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-element">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Your email address"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        <h6>Email is required!</h6>
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                    <h6>Password is required!</h6>
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={
                        !(
                            userFormData.username &&
                            userFormData.email &&
                            userFormData.password
                        )
                    }
                    type="submit"
                    variant="success"
                >
                    Submit
                </Button>
            </Form>
        </div>

    )
}

export default Register;