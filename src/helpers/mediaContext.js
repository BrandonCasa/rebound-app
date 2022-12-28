import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { useContext } from "react";

// Central provider to store user media accross the app
export const MediaContext = createContext({});
export const MediaProvider = ({ children }) => {
  const [storedMedia, setStoredMedia] = useState({});
  const [oldUserDocs, setOldUserDocs] = useState({});
  const [userDocs, setUserDocs] = useState({});

  React.useEffect(() => {
    userDocs.forEach((someUserDoc) => {
      // If the userDoc hasn't changed, don't update the storedMedia
      if (oldUserDocs[someUserDoc?.userDoc?.uid] === someUserDoc) return;

      let oldStoredMedia = storedMedia;
      if (someUserDoc?.userDocLoading === true || someUserDoc?.userDoc === undefined) {
        // If the userDoc is loading or undefined, set the storedMedia to an empty object
        oldStoredMedia[someUserDoc?.userDoc?.uid] = {};
      }
      if (someUserDoc?.userDocLoading === false) {
        // If the userDoc is loaded, set the storedMedia to the userDoc's media
        oldStoredMedia[someUserDoc?.userDoc?.uid] = {
          banner: {
            bannerChanging: someUserDoc?.userDoc?.bannerChanging,
            bannerName: someUserDoc?.userDoc?.bannerName,
          },
          avatar: {
            avatarChanging: someUserDoc?.userDoc?.avatarChanging,
            avatarName: someUserDoc?.userDoc?.avatarName,
          },
        };
      }
      setStoredMedia(oldStoredMedia);
    });
    setOldUserDocs(userDocs);
  }, [userDocs]);
  return <MediaContext.Provider value={storedMedia}>{children}</MediaContext.Provider>;
};
