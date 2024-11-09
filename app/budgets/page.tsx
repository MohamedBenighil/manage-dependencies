"use client";
import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";

const page = () => {
  return (
    <Wrapper>
      <div className=" bg-blue-500 flex">
        <div className="bg-green-500 w-full">page</div>
        <div className="bg-red-500 w-full">page</div>
      </div>
    </Wrapper>
  );
};

export default page;
