import React from 'react';
import Rooms from './pages/Rooms';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Guest House</h1>
      </header>
      <main className="w-full max-w-5xl">
        <Rooms />
      </main>
    </div>
  );
}

export default App;