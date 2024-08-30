import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-200 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2">Welcome to User Management</h2>
        <p className="text-lg mb-4">Manage your users effortlessly with our intuitive interface.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;