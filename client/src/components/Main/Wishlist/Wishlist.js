// --------------------------------------------------------------------------------
// Imports/Dependencies

import React, { useState, useEffect } from 'react';
import './Wishlist.css'
import { useQuery, useMutation } from '@apollo/client'
import Auth from '../../../utils/auth'
import { QUERY_ME } from '../../../utils/queries'
import { REMOVE_SAVED_ITEM } from '../../../utils/mutations'
import { ADD_TO_CART } from '../../../utils/mutations'
import { REMOVE_FROM_CART } from '../../../utils/mutations'


// --------------------------------------------------------------------------------
// Component
function Wishlist() {

    // --------------------------------------------------------------------------------
    // Helper Functions

    // Query to get user data
    const { loading, data } = useQuery(QUERY_ME);


    // UseState to store user data
    const [savedData, setSavedData] = useState({});

    // UseEffect to set user data
    useEffect(() => {
        if (data) {
            setSavedData(data.me);
        }
    }
        , [data]);

    // Mutation to remove item from saved items
    const [removeSavedItem] = useMutation(REMOVE_SAVED_ITEM, { refetchQueries: [QUERY_ME] });

    // --------------------------------------------------------------------------------
    // Create a function to handle removing an item from the saved items
    const handleRemoveFromSaved = async (itemId, id) => {
        // Get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        // If token is null, return false
        if (!token) { return false };

        // Try to remove item from saved items
        try {
            // Remove item from saved items
            await removeSavedItem({
                variables: { id: itemId }
            });


        } catch (err) {
            console.error(err);
        }
    };

    // Query to get user data
    const myData = useQuery(QUERY_ME);

    // UseState to store user data
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (myData) {
            setUserData(myData.me);
        }
    }
        , [myData]);

    // Execute the GraphQL mutation to add an item to the cart
    const [addToCart] = useMutation(ADD_TO_CART, { refetchQueries: [QUERY_ME] });

    // Function to handle the add to cart button
    const handleAddToCart = async (itemId) => {
        try {
            const { data } = await addToCart({
                variables: { id: itemId },
            });
            handleRemoveFromSaved(itemId, itemId)
        } catch (err) {
            console.error(err);
        }
    };

    // Mutation to remove item from cart
    const [removeFromCart] = useMutation(REMOVE_FROM_CART, { refetchQueries: [QUERY_ME] });

    // --------------------------------------------------------------------------------
    // Create a function to handle removing an item from the cart
    const handleRemoveFromCart = async (itemId, id) => {
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


    // After loading, return the saved items
    return (
        <>

            <div className='saved'>
                <h2>WishList</h2>
                {
                    Auth.loggedIn() ?
                        (
                            <>

                                <div className="cart-card">
                                    {savedData.savedItems?.map((item, index) => {
                                        return (
                                            <>
                                                <div key={item._id} className="cart-item">
                                                    <div className="cart-item-image">
                                                        <img src={item.img} alt={item.name} />
                                                    </div>
                                                    <div className="cart-item-name">
                                                        <h3>{item.name}</h3>
                                                    </div>
                                                    <div className="cart-item-stock">
                                                        <h3>{item.stock}</h3>
                                                    </div>
                                                    <div className="cart-item-category">
                                                        <h3>{item.category.category}</h3>
                                                    </div>
                                                    <div className='buttons'>
                                                        {myData.data.me.cart.find(cartItem => cartItem._id === item._id) ? (
                                                            // If the item is in the cart, show the in cart info
                                                            <div className="cart-item-remove">
                                                                <h3>In cart</h3>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {/* {myData.data.me.ownedItems.find(owned => owned._id === item._id)?.(
                                                                    handleRemoveFromSaved(item._id, item._id)
                                                                )} */}
                                                                {myData.data.me.ownedItems.find(cartItem => cartItem._id === item._id) ? (
                                                                    <>
                                                                        <div className="cart-item-remove own">
                                                                            <h3>Owned</h3>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="cart-item-add">
                                                                            <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
                                                                        </div>
                                                                    </>
                                                                )}

                                                            </>
                                                        )}

                                                        <div className="cart-item-remove">
                                                            <button onClick={() => handleRemoveFromSaved(item._id, item._id)}>Remove</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    })}
                                </div>

                            </>
                        )
                        :
                        (
                            <>
                                <div>Not Logged In, Log in in order to see your saved items</div>
                            </>
                        )
                }
            </div>
        </>
    )
}

export default Wishlist;
