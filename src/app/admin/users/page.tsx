"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  UserFormData,
} from "@/store/actions/userActions";
import { selectUser, clearSelectedUser, User } from "@/store/slices/userSlice";
import UserFormModal from "@/components/Modal/UserFormModal";
import NavigationMenu from "@/components/NavigationMenu";
import TopNavBar from "@/components/TopNavBar";

const ManageUsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, selectedUser, status, error } = useSelector(
    (state: RootState) => state.user
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(clearSelectedUser());
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    dispatch(selectUser(user));
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(id));
    }
  };

  const handleSubmitUser = async (data: UserFormData) => {
    setIsModalOpen(false);

    if (modalMode === "add") {
      await dispatch(createUser(data));
    } else {
      await dispatch(updateUser({ id: data.id!, userData: data }));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearSelectedUser());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavigationMenu />
      <TopNavBar />
      <div className="pl-64 pt-16">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Users</h1>
            <button
              onClick={handleAddUser}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Add New User
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && (
            <p className="text-red-500">Error: {error}</p>
          )}

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={`user-${user.id}`}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {user.name.firstname} {user.name.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.username}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-4 text-center text-sm text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <UserFormModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmitUser}
            user={selectedUser}
            title={modalMode === "add" ? "Add New User" : "Edit User"}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUsersPage;
