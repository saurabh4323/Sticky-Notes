import { SignIn } from "@clerk/clerk-react";
import React from "react";
import Header from "./Header";

const Signin = () => {
  return (
    <div className="containe">
      <Header></Header>
      <div className="sign">
        <SignIn></SignIn>
      </div>
    </div>
  );
};

export default Signin;
