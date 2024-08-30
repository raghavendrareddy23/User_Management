import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white p-4 mt-4 text-center">
      <p>&copy; {new Date().getFullYear()} User Management System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
