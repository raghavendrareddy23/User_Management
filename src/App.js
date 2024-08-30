import React, { useState, useEffect, useCallback } from "react";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import Modal from "./components/Model";
import { Puff } from "react-loader-spinner";
import { getUsers, deleteUser, updateUser, addUser } from "./API/api";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [totalUsers, setTotalUsers] = useState(0);
  const [deleting, setDeleting] = useState(false); 

  const loadUsers = useCallback(() => {
    setLoading(true);
    getUsers(page, usersPerPage)
      .then((response) => {
        setUsers(response.data);
        setTotalUsers(response.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to fetch users");
        setLoading(false);
      });
  }, [page, usersPerPage]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormVisible(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormVisible(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setDeleting(true); 
      deleteUser(userId)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          toast.error("Failed to delete user");
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userData } : user
        )
      );
      updateUser(selectedUser.id, userData)
        .then(() => {
          toast.success("User updated successfully");
          setIsFormVisible(false); 
          setSelectedUser(null); 
        })
        .catch((error) => {
          toast.error("Failed to update user");
        });
    } else {
      addUser(userData)
        .then(() => {
          toast.success("User added successfully");
          setIsFormVisible(false); 
        })
        .catch((error) => {
          toast.error("Failed to add user");
        });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="mx-auto rounded-lg">
      <Header />
      <Hero />
      <ToastContainer />
      <button
        className="bg-blue-500 text-white p-2 rounded-lg m-4 transition hover:bg-blue-600"
        onClick={handleAddUser}
      >
        Add User
      </button>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Puff type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => handleEditUser(user)}
                onDelete={() => handleDeleteUser(user.id)}
              />
            ))}
          </div>
          <div className="flex justify-around mt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`bg-gray-300 text-black p-2 rounded-lg flex items-center m-4 ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages || totalPages === 0}
              className={`bg-gray-300 text-black p-2 rounded-lg flex items-center m-4 ${
                page === totalPages || totalPages === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
            </button>
          </div>
        </div>
      )}
      <Modal isVisible={isFormVisible} onClose={() => setIsFormVisible(false)}>
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={() => setIsFormVisible(false)}
          isEditMode={!!selectedUser}
        />
      </Modal>
      {deleting && (
        <div className="flex justify-center items-center h-screen">
          <h1>Deleting.....</h1>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
