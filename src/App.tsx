import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import ContactInfoSection from "./components/ContactInfoSection";
import ContactListSection from "./components/ContactListSection";

function App() {
  return (
      <>
        <Header />
        <main>
          <ContactInfoSection />
          <ContactListSection />
        </main>
      </>
  )
}

export default App;
