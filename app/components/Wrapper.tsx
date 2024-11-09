import React from "react";
import Navbar from "./Navbar";
type WrapperProps = {
  children: React.ReactNode;
};
const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div>
      <Navbar />
      <div className="px-5 md:px-[10%] my-10 bg-slate-400">{children}</div>
    </div>
  );
};

export default Wrapper;
