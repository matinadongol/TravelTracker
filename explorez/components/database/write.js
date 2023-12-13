import { collection, addDoc, doc, updateDoc, deleteDoc, setDoc,getDocs } from "firebase/firestore"
import { db } from "./config"
import { add } from "lodash";

export async function save(data) {
    try{
        const dbCollection = collection(db, "Trips");
        const docRef = await addDoc(dbCollection, data);

        return docRef.id
    }
    catch(e){
        return null
    }
}

export async function update(id, data) {
    try{
        const docRef = doc(db, "Trips", id)
        await updateDoc(docRef, data)
    }
    catch(e) {
        return false
    } 
}

export async function savePackingList(tripId, packingListItems) {
    try {
      const packingListRef = collection(db, 'Trips', tripId, 'packingList');
  
      const existingItems = await getDocs(packingListRef);
      existingItems.forEach(async (item) => await deleteDoc(doc(packingListRef, item.id)));
      for (const packingListItem of packingListItems) {
        await addDoc(packingListRef, { itemName: packingListItem.itemName });
      }
  
      return true;
    } catch (error) {
      console.error('Error saving packing list:', error);
      return false;
    }
  }
  

  export async function updatePackingList(tripId, data) {
    try {
        const packingListRef = collection(db, 'Trips', `${tripId}`, 'packingList');
        for (const item of data) {
            const newItemRef = await addDoc(packingListRef, { item: item });
        }

        return true;
    } catch (error) {
        console.error('Error saving packing list:', error);
        return false;
    }
}

export async function deletePackingListItem(tripId, itemId) {
    try {
      const packingListItemRef = doc(db, 'Trips', `${tripId}`, 'packingList', `${itemId}`);
      await deleteDoc(packingListItemRef);

      const updatedListRef = collection(db, 'Trips', `${tripId}`, 'packingList');
    const updatedListSnapshot = await getDocs(updatedListRef);
    const updatedList = updatedListSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return updatedList;
    } catch (error) {
      console.error('Error deleting packing list item:', error);
    }
  }


export async function remove(id) {
    try{
        const docRef = doc(db, "Trips", id)
        await deleteDoc(docRef)
    }
    catch(e) {
        return false
    } 
}

export async function getFavoritePlaces() {
    try {
        const querySnapshot = await getDocs(collection(db, "FavoritePlaces"));
        return querySnapshot;
    } catch (error) {
        console.error("Error getting favorite places:", error);
        throw error;
    }
}

export async function saveFavoritePlace(data) {
    try {
        const existingPlacesSnapshot = await getFavoritePlaces()

        const isExisting = existingPlacesSnapshot.docs.some((doc) => {
            return doc.data().id === data.id
        });

        if (!isExisting) {
            const dbCollection = collection(db, "FavoritePlaces");
            const docRef = await addDoc(dbCollection, data);
            return docRef.id
        } else {
            return null
        }
    } catch (e) {
        console.error('Error saving favorite place:', e);
        return null;
    }
}

export async function removeFavoritePlaces(id) {
    try {
        console.log(id)
        const docRef = doc(db, "FavoritePlaces", id);
        await deleteDoc(docRef);
        return true; 
    } catch (e) {
        console.error('Error removing favorite place:', e);
        return false
    }
}
