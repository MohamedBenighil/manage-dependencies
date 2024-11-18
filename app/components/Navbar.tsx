"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { checkAndAddUser } from "../actions";
const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      checkAndAddUser(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  return (
    <>
      {isLoaded &&
        (isSignedIn ? (
          <>
            {/* Navbar : if user is logged */}
            <div className=" flex justify-between items-center px-5 md:px-[10%]  ">
              {/* LOGO */}
              <div className="text-2xl font-bold">
                {" "}
                <span className="">e</span>
                <span className="text-accent ">.Track</span>{" "}
              </div>

              {/* 3 Links  */}
              <div className="gap-2  md:flex hidden  mt-4">
                <Link className="btn btn-accent" href="/budgets">
                  Mes Budgets
                </Link>
                <Link className="btn btn-accent" href="">
                  Tableau de bord
                </Link>
                <Link className="btn btn-accent" href="/transactions">
                  Mes dépenses
                </Link>
              </div>

              {/* Avatar  */}
              <div className=" mt-1">
                <UserButton />
              </div>
            </div>

            {/* 3 Links in seprate navbar  */}
            <div className=" gap-2  flex md:hidden justify-between px-2  ">
              <Link className="btn btn-sm btn-accent " href="/budgets">
                Mes Budgets
              </Link>
              <Link className="btn btn-sm btn-accent " href="">
                Tableau de bord
              </Link>
              <Link className="btn btn-sm btn-accent " href="/transactions">
                Mes dépenses
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Navbar : if user is loggedout */}
            <div className=" flex justify-between items-center px-5  md:px-[10%]">
              {/* LOGO */}
              <div className="text-2xl font-bold">
                <span className="">e</span>
                <span className="text-accent ">.Track</span>{" "}
              </div>

              {/* 2 Links  */}
              <div className="gap-2 md:flex hidden mt-4">
                <Link className="btn " href="/sign-in">
                  Se connecter
                </Link>
                <Link className="btn btn-accent" href="/sign-up">
                  S'inscrire
                </Link>
              </div>
            </div>
            {/* 2 Links in seprate navbar used for phone  */}
            <div className=" gap-2  flex md:hidden justify-between px-2 mt-2">
              <Link className="btn btn-sm " href="/sign-in">
                Se connecter
              </Link>
              <Link className="btn btn-sm " href="/sign-up">
                S'inscrire
              </Link>
            </div>
          </>
        ))}
    </>
  );
};

export default Navbar;
