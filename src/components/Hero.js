import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 mt-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to User Management</h2>
        <p className="text-lg mb-6">Manage your users effortlessly with our intuitive interface.</p>
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
