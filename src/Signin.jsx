import { SignIn } from "@clerk/clerk-react";
import React from "react";
import Header from "./Header";
import "./sign.css";
const Signin = () => {
  return (
    <div className="containe">
      <Header></Header>
      <div className="side">
        <div className="sign">
          <SignIn></SignIn>
        </div>
      </div>
    </div>
  );
};

export default Signin;
