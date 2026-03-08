import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <header className="mb-8 w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Guest House</h1>
        <Navbar />
      </header>
      <main className="w-full max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
}

export default App;