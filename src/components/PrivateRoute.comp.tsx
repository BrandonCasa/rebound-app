import { useSelector } from "react-redux";

function PrivateRoute({ children, ...remainingProps }) {
  const auth = useSelector((state: any) => state.firebase.auth);

  return { auth };
}

export default SignIn;
