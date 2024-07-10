import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Signin = () => {
  return (
    <div className="containe">
      <div className="sign">
        <SignIn></SignIn>
      </div>
    </div>
  );
};

export default Signin;
