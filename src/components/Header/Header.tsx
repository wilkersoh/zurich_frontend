"use client";

import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../Button";
import { AuthState, setAuth } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { Spinner } from "../Spinner";

export const Header = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(setAuth(session as AuthState));
    }
  }, [session, dispatch]);

  const handleLogin = async () => {
    await signIn("google", { redirectTo: "/users" });
  };

  const handleLogout = async () => {
    await signOut();
  };

  const renderHeaderTitle = () => {
    return (
      <Link href="/" className="text-xl font-semibold text-gray-600">
        Zurich
      </Link>
    );
  };

  const renderAuthButton = () => {
    if (status === "loading")
      return (
        <Button>
          <Spinner />
        </Button>
      );

    if (!!session?.user)
      return <Button onClick={handleLogout}>Sign out</Button>;
    return <Button onClick={handleLogin}>Sign in with Google</Button>;
  };

  const renderPageLinks = () => {
    return (
      <Link href="/users" className="text-gray-600 hover:text-gray-900">
        Users
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto py-3">
        <nav className="flex items-center justify-between">
          {renderHeaderTitle()}
          <div className="flex items-center gap-4">
            {renderPageLinks()}
            {renderAuthButton()}
          </div>
        </nav>
      </div>
    </header>
  );
};
