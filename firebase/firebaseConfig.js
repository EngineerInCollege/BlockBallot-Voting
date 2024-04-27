import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

/* This code sets up a Firebase app and exports it as a default module. It initializes the
* Firebase database services using Firebase's modular SDK. It's
used to write the store the added candidates for each election ONLY for display purposes.
This database stores the name, description, municipality, office, party, and link to their
photo from an image URL. This information is not stored on the blockchain to save gas fees.
*/

const firebaseConfig = {
    apiKey: "AIzaSyAvMq6QYrfBx_zxmu9XjiaC1uTkvYbubZM",
    authDomain: "blockballotproject.firebaseapp.com",
    projectId: "blockballotproject",
    storageBucket: "blockballotproject.appspot.com",
    messagingSenderId: "181265805802",
    appId: "1:181265805802:web:94680c1691476d9e75c293"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase();

export { auth }; // Export only auth

export async function writeData(name, candidateData) {
  const reference = ref(db, 'candidates/' + name);

  try {
    await set(reference, {
      candidateData: candidateData
    });
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export const fetchRecentCandidates = async () => {
  try {
    const candidatesRef = ref(db, 'candidates');
    const snapshot = await get(candidatesRef);

    if (snapshot.exists()) {
      const candidates = [];
      snapshot.forEach((childSnapshot) => {
        const candidateData = childSnapshot.val();
        candidates.push({
          name: childSnapshot.key,
          ...candidateData
        });
      });
      return candidates;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching recent candidates:', error);
    return [];
  }
};