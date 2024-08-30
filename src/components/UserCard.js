import React from 'react';
import { FaEdit, FaTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';

const UserCard = ({ user, onEdit, onDelete }) => {
  const avatarUrl = `https://avatar.iran.liara.run/public/boy?username=${user.username}`;

  const handleLocationClick = () => {
    const { lat, lng } = user.address.geo;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="m-4 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-xl p-6 relative group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={`${user.name}'s avatar`}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <h1 className="text-white text-2xl font-semibold">{user.name}</h1>
      </div>
      <p className="text-gray-200 mb-1"><strong>Id:</strong> {user.id}</p>
      <p className="text-gray-200 mb-1"><strong>Username:</strong> {user.username}</p>
      <p className="text-gray-200 mb-1"><strong>Email:</strong> {user.email}</p>
      <p className="text-gray-200 mb-1"><strong>Phone:</strong> {user.phone}</p>
      <p className="text-gray-200 mb-1"><strong>Website:</strong> <a href={`http://${user.website}`} className="underline hover:text-yellow-300" target="_blank" rel="noreferrer">{user.website}</a></p>
      <p className="text-gray-200 mb-1"><strong>Company:</strong> {user.company.name}</p>
      <p className="text-gray-200 mb-1"><strong>Address:</strong> {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
      <p className="text-gray-200 mb-1">
        <strong>Location:</strong>
        <span
          className="cursor-pointer text-yellow-300 hover:text-yellow-500 transition duration-300"
          onClick={handleLocationClick}
        >
          <FaMapMarkerAlt className="inline ml-2 mr-1" />
          {`Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}`}
        </span>
      </p>
      <div className="flex justify-end space-x-4 mt-4 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FaEdit className="text-white text-xl cursor-pointer hover:text-blue-300 transition duration-300" onClick={onEdit} />
        <FaTrashAlt className="text-white text-xl cursor-pointer hover:text-red-300 transition duration-300" onClick={onDelete} />
      </div>
    </div>
  );
};

export default UserCard;
