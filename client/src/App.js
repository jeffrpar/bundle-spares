import React, { useState } from 'react';
import Header from './components/Header/Header';
import Home from './components/Main/Home/Home';
// import Footer from './components/Footer/Footer';

function App() {
  // Define state to track the active section
  const [activeSection, setActiveSection] = useState('Home'); // Default to 'Home'

  // Function to change the active section based on user selection
  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <div className="App">
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Conditionally render the selected Main component */}
      {activeSection === 'Home' && <Home />}

      {/* <Footer /> */}
    </div>
  );
}

export default App;