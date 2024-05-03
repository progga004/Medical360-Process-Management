import React, { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";

const AllUsersPage = () => {
  const { user } = useAuthContext();
  const { getAllDepartments, getAllUsers, users } = useGlobalContext();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("lastRoute", "/all-users");
    console.log(users);
    const fetchUsers = async () => {
      if (user && !users) {
        await getAllDepartments();
        await getAllUsers();
      }
    };
    fetchUsers();

    return () => {
      localStorage.removeItem("lastRoute");
    };
  }, [user, users]); // Re-fetch when auth.token changes

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowercasedTerm) ||
          user.email.toLowerCase().includes(lowercasedTerm) ||
          (user.department &&
            user.department.name.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  return (
    <>
      <Banner goBackPath="/resource-management" />
      <div className="flex justify-center my-4">
        <h1 className="text-3xl font-bold text-blue-500">All Users</h1>
      </div>
      <div className="flex justify-between items-center mx-8 mb-4">
        <SearchBar onSearch={setSearchTerm} />
        {user && user.isAdmin && (
          <Link
            to={"/register"}
            className="bg-[#2260FF] text-white px-2 py-1 rounded-md font-medium text-xl"
          >
            New User
          </Link>
        )}
      </div>
      <div className="p-8">
        {users && (
          <Table
            cards={filteredUsers}
            isAdmin={user && user.isAdmin}
            context="user"
          />
        )}
        {!users && <p>No user data available.</p>}
      </div>
    </>
  );
};

export default AllUsersPage;
