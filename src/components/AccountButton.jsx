import * as IconSvgs from "@mui/icons-material";
import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function AccountButton(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const signInGoogle = (event) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    });
  };

  if (user) {
    return <IconSvgs.AccountCircleRounded sx={{ fontSize: 24, color: "white", mr: "12px" }} />;
  } else {
    return (
      <Button variant="contained" onClick={(event) => signInGoogle(event)}>
        Sign In
      </Button>
    );
  }
}

export default AccountButton;
