import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import isDev from "../helpers/devDetect";

const firebaseConfig = {
  apiKey: "AIzaSyCuaPnICOw47KhFAe8VMV-tlGSRVJdSWO0",
  authDomain: "rebound-380d6.firebaseapp.com",
  projectId: "rebound-380d6",
  storageBucket: "rebound-380d6.appspot.com",
  messagingSenderId: "684756945046",
  appId: "1:684756945046:web:9a6d74827ac6a678a55ab7",
  measurementId: "G-KN4SQMP7Q3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

if (isDev()) {
  connectAuthEmulator(auth, "http://localhost:9099");
}
export { app, analytics, db, auth };
