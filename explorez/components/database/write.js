import { collection, addDoc, doc, updateDoc, getDocs, deleteDoc } from "firebase/firestore"
import { db } from "./config"

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
