// --------------------------------------------------------------------------------
// Imports/Dependencies

import React, { useState, useEffect } from 'react';
import './Wishlist.css'
import { useQuery, useMutation } from '@apollo/client'
import Auth from '../../../utils/auth'
import { QUERY_ME } from '../../../utils/queries'
import { REMOVE_SAVED_ITEM } from '../../../utils/mutations'


// --------------------------------------------------------------------------------
// Component
function Wishlist() {

    // --------------------------------------------------------------------------------
    // Helper Functions

    // Query to get user data
    const { loading, data } = useQuery(QUERY_ME);


    // UseState to store user data
    const [userData, setUserData] = useState({});

    // UseEffect to set user data
    useEffect(() => {
        if (data) {
            setUserData(data.me);
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

            // Filter out the item that was removed
            const filteredData = userData.savedItems.filter(item => item._id !== id);

            // Set the user data to the filtered data 
            setUserData({ ...userData, savedItems: filteredData });

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
            {
                Auth.loggedIn() ?
                    (
                        <>
                            <h1>WishList</h1>
                            <div className="saved-card">
                                {userData.savedItems?.map((item, index) => {
                                    return (
                                        <div key={item._id} className="saved-item">
                                            <div className="saved-item-image">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="saved-item-name">
                                                <h3>{item.name}</h3>
                                            </div>
                                            <div className="saved-item-stock">
                                                <h3>${item.stock}</h3>
                                            </div>
                                            <div className="saved-item-category">
                                                <h3>${item.category}</h3>
                                            </div>
                                            <div className="saved-item-remove">
                                                <button onClick={() => handleRemoveFromSaved(item._id, item._id)}>Remove</button>
                                            </div>
                                        </div>
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
        </>
    )
}

export default Wishlist;
