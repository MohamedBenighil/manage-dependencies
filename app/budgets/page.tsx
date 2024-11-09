"use client";
import React, { useEffect } from "react";
import { test } from "../actions";

const page = () => {
  useEffect(() => {
    test();
  }, []);
  return <div>page</div>;
};

export default page;
