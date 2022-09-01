import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useNavigate } from "react-router-dom";

function SignIn(props: any) {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        navigate("/todos");
      });
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
    </div>
  );
}

export default SignIn;
