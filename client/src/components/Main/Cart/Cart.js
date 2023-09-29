// --------------------------------------------------------------------------------
// Imports/Dependencies

import React, { useState, useEffect } from 'react';
import './Cart.css'
import { useQuery, useMutation } from '@apollo/client'
import Auth from '../../../utils/auth'
import { QUERY_ME } from '../../../utils/queries'
import { REMOVE_FROM_CART } from '../../../utils/mutations'


// --------------------------------------------------------------------------------
// Component
function Cart() {

    // --------------------------------------------------------------------------------
    // Helper Functions

    // Query to get user data
    const { loading, data } = useQuery(QUERY_ME);

    // Retrieve user data from query
    const userData = data?.me || {};

    // Mutation to remove item from cart
    const [removeFromCart] = useMutation(REMOVE_FROM_CART);

    // --------------------------------------------------------------------------------
    // Create a function to handle removing an item from the cart
    const handleRemoveFromCart = async (itemId) => {
        // Get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        // If token is null, return false
        if (!token) { return false };

        // Try to remove item from cart
        try {
            // Remove item from cart
            await removeFromCart({
                variables: { id: itemId }
            });

        } catch (err) {
            console.error(err);
        }
    };

    // --------------------------------------------------------------------------------
    // Rendering

    // If loading, return loading message
    if (loading) {
        return <div>Loading...</div>
    }


    // After loading, return the cart
    return (
        <div>Cart</div>
    )
}

export default Cart;
