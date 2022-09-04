import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function App(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    //firebase.login({ provider: "google", type: "popup" });
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

  if (loading) {
    return (
      <div>
        <p>Logging In...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error Loggin In: {error}</p>
      </div>
    );
  }

  if (!user) {
    <div>
      <Button onClick={signInGoogle}>Please Login</Button>
    </div>;
  }

  return (
    <div>
      <Button onClick={signInGoogle}>xd</Button>
      {JSON.stringify(user)}
    </div>
  );
}

export default App;
