import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
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