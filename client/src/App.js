import React, { useState } from 'react';
import Header from './components/Header/Header';
import Home from './components/Main/Home/Home';
// import Footer from './components/Footer/Footer';
import Cart from './components/Main/Cart/Cart';
import Register from './components/Main/Register/Register';
import Login from './components/Main/Login/Login';
import Wishlist from './components/Main/Wishlist/Wishlist';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from 'apollo-link-context';
import './App.css';

// --------------------------------------------------------------------------------
// Apollo Setup

// httpLink for Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

// authLink for Apollo Client
const authLink = setContext((_, { headers }) => {
  // Get token from localStorage
  const token = localStorage.getItem('id_token');

  // Return headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// --------------------------------------------------------------------------------






function App() {
  // Define state to track the active section
  const [activeSection, setActiveSection] = useState('Home'); // Default to 'Home'

  // Function to change the active section based on user selection
  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header activeSection={activeSection} onSectionChange={handleSectionChange} />

        {/* Conditionally render the selected Main component */}
        {activeSection === 'Home' && <Home />}
        {activeSection === 'Cart' && <Cart />}
        {activeSection === 'Wishlist' && <Wishlist />}
        {activeSection === 'Register' && <Register />}
        {activeSection === 'Login' && <Login />}

        {/* <Footer /> */}

      </div>
    </ ApolloProvider>
  );
}

export default App;