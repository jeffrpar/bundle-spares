import React, { useState, useEffect } from "react";
import './Home.css'
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../../../utils/queries"; // Import the GraphQL query
import { QUERY_ME } from "../../../utils/queries"; // Import the GraphQL query
import { ADD_TO_CART } from "../../../utils/mutations"; // Import the GraphQL mutation
import { SAVE_ITEM } from "../../../utils/mutations"; // Import the GraphQL mutation
import { REMOVE_FROM_CART } from "../../../utils/mutations"; // Import the GraphQL mutation
import { REMOVE_SAVED_ITEM } from "../../../utils/mutations"; // Import the GraphQL mutation
import Auth from "../../../utils/auth";

function Home() {

  // Query to get user data
  const myData = useQuery(QUERY_ME);
  // UseState to store user data
  const [userData, setUserData] = useState({});


  // Execute the GraphQL query to fetch item data
  const { loading, data } = useQuery(QUERY_ALL_ITEMS);
  console.log(data);

  // UseState to store user data
  const [itemsData, setItemsData] = useState({});

  // UseEffect to set user data
  useEffect(() => {
    if (data) {
      setItemsData(data);
    }
  }
    , [data]);

  useEffect(() => {
    if (myData) {
      setUserData(myData.me);
    }
  }
    , [myData]);


  // Execute the GraphQL mutation to add an item to the cart
  const [addToCart] = useMutation(ADD_TO_CART, { refetchQueries: [QUERY_ALL_ITEMS, QUERY_ME] });

  // Function to handle the add to cart button
  const handleAddToCart = async (itemId) => {
    try {
      const { data } = await addToCart({
        variables: { id: itemId },
      });
      console.log(data);
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

  // Execute the GraphQL mutation to add an item to the saved items
  const [SaveItem] = useMutation(SAVE_ITEM, { refetchQueries: [QUERY_ALL_ITEMS, QUERY_ME] });
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

  // Function to handle the add to cart button
  const handleAddToWishlist = async (itemId) => {
    try {
      const { data } = await SaveItem({
        variables: { id: itemId },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };





  if (loading) return <p>Loading...</p>;





  return (
    <>

      <div className="home">

        {itemsData.allItems?.map(item => {

          return (
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="cart-item-name">
                <h3>{item.name}</h3>
              </div>
              <div className="cart-item-stock">
                <h3><span>Stock: </span>{item.stock}</h3>
              </div>
              <div key={item.category._id} className="cart-item-category">
                <h3>{item.category.category}</h3>
              </div>
              <div className="buttons">
                {Auth.loggedIn() ?
                  (
                    <>
                      <>
                        {myData.data.me.cart.find(cartItem => cartItem._id === item._id) ? (
                          // If the item is in the cart, show the remove button
                          <div className="cart-item-remove">
                            <button onClick={() => handleRemoveFromCart(item._id, item._id)}><i class="fa-solid fa-ban"></i></button>
                          </div>
                        ) : (
                          <>
                            <div className="cart-item-add">
                              <button onClick={() => handleAddToCart(item._id)}><i class="fa-solid fa-cart-shopping"></i></button>
                            </div>
                          </>
                        )}

                      </>
                      <>
                        {myData.data.me.savedItems.find(cartItem => cartItem._id === item._id) ? (
                          // If the item is in the SaveItem, show the remove button
                          <div className="cart-item-remove">
                            <button onClick={() => handleRemoveFromSaved(item._id, item._id)}><i class="fa-solid fa-heart"></i></button>
                          </div>
                        ) : (
                          <>
                            <div className="cart-item-add">
                              <button onClick={() => handleAddToWishlist(item._id)}><i class="fa-regular fa-heart"></i></button>
                            </div>
                          </>
                        )}

                      </>
                    </>
                  )
                  :
                  (
                    <>
                      <h1 className="log-to">LOG IN TO ADD TO CART</h1>
                    </>
                  )
                }
              </div>
            </div>
          )
        })}

      </div>

    </>
  );
}

export default Home;
