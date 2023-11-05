import { collection, getDocs, query, where} from "firebase/firestore";
import { db } from "./config"

export  async function load () {
    const tripsRef = collection(db, 'Trips'); // Replace 'trips' with the actual name of your collection
  
    const q = query(tripsRef, where('completed', '==', false));
    const querySnapshot = await getDocs(q);
  
    const completedTrips = [];
  
    querySnapshot.forEach((doc) => {
      const tripData = {
        ...doc.data(),
        id: doc.id,
    }

      completedTrips.push(tripData);
    });
  
    return completedTrips;
  }

export  async function getCompletedTrips () {
    const tripsRef = collection(db, 'Trips');
  
    const q = query(tripsRef, where('completed', '==', true));
    const querySnapshot = await getDocs(q);
  
    const completedTrips = [];
  
    querySnapshot.forEach((doc) => {
      const tripData = {
        ...doc.data(),
        id: doc.id,
    }
      completedTrips.push(tripData);
    });
  
    return completedTrips;
  }