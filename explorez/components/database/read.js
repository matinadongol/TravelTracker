import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "./config"

export  async function load () {
    const tripsRef = collection(db, 'Trips');
  
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

export  async function loadFavoritePlaces () {
  const favoritePlacesRef = collection(db, 'FavoritePlaces');

  const querySnapshot = await getDocs(favoritePlacesRef);

  const favoritePlacesList = [];

  querySnapshot.forEach((doc) => {
    const favoritePlacesData = {
      ...doc.data(),
      id: doc.id,
  }

  favoritePlacesList.push(favoritePlacesData);
  });

  return favoritePlacesList;
}

export const subscribeToChanges = (callback) => {
  const collectionRef = collection(db, 'FavoritePlaces');
  return onSnapshot(collectionRef, callback);
}