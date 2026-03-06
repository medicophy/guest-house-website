import React from 'react';
import './App.css';
import Rooms from './Rooms';

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-logo">Lavish Inn Guest House</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Rooms</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our Guest House</h1>
        <p>Comfortable stays, beautiful views, and excellent service.</p>
      </section>

      {/* Rooms */}
      <main>
        <Rooms />
      </main>

      {/* Footer */}
      <footer className="footer">
        &copy; 2026 Guest House. All rights reserved.
      </footer>
    </div>
  );
}

export default App;