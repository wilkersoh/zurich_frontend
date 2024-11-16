"use client";

import React, { useEffect } from "react";
import {
  fetchUsers,
  getAllUsers,
  getMaskedEmails,
  getStatus,
  toggleMaskEmail,
} from "@/store/features/users/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/Button";
import { IconEye } from "@/components/Icons/Eye";
import { StringHelper } from "../../utils/string-helper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Page = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getAllUsers);
  const status = useAppSelector(getStatus);
  const maskedEmails = useAppSelector(getMaskedEmails);

  useEffect(() => {
    dispatch(fetchUsers() as unknown as PayloadAction<void>);
  }, [dispatch]);

  const handleToggleEmail = (userId: number) => {
    dispatch(toggleMaskEmail(userId));
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr className="bg-gray-100">
          <th className="px-6 py-3 border-b text-left w-[10%]">ID</th>
          <th className="px-6 py-3 border-b text-left w-[30%]">Email</th>
          <th className="px-6 py-3 border-b text-left w-[30%]">First Name</th>
          <th className="px-6 py-3 border-b text-left w-[30%]">Last Name</th>
        </tr>
      </thead>
    );
  };

  const renderUsersList = () => {
    if (status === "loading") {
      return (
        <tr>
          <td colSpan={4}>
            <Spinner className="my-8 mx-auto" />
          </td>
        </tr>
      );
    }

    return (
      <>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 border-b">{user.id}</td>
            <td className="px-6 py-4 border-b flex gap-2 justify-between">
              <div className="h-full">
                {maskedEmails[user.id]
                  ? StringHelper.maskEmail(user.email)
                  : user.email}
              </div>
              <Button
                className="px-1 py-1 w-[28px] flex items-center justify-center"
                onClick={() => handleToggleEmail(user.id)}
              >
                {maskedEmails[user.id] ? <IconEye.Closed /> : <IconEye.Open />}
              </Button>
            </td>
            <td className="px-6 py-4 border-b">{user.first_name}</td>
            <td className="px-6 py-4 border-b">{user.last_name}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="p-4 container mx-auto px-0">
      <table className="min-w-full bg-white border border-gray-300">
        {renderTableHeader()}
        <tbody>{renderUsersList()}</tbody>
      </table>
    </div>
  );
};

export default Page;
