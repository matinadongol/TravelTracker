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

  export  async function loadPackingList (tripId) {
    try {
      const packingListRef = collection(db, 'Trips', tripId, 'packingList');
  
      // Fetch all documents from the packingList collection
      const querySnapshot = await getDocs(packingListRef);
      const packList = []
      // Convert documents to an array of packing list items
      const packingList = querySnapshot.forEach((doc) => {
          const packListData = {
            ...doc.data(),
            id: doc.id,
        }
        packList.push(packListData)
    });
      // setPackingList(packingList)
      
      return packList;
    } catch (error) {
      console.error('Error loading packing list:', error);
      return [];
    }
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
  
  export  async function getFilteredTrips (filter, completed) {
    const tripsRef = collection(db, 'Trips');
  
    const q = query(tripsRef, where('tripTag', '==', filter),
    where('completed', '==', completed));
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