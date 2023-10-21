import { collection, getDocs} from "firebase/firestore";
import { db } from "./config"

export function load () {
    let data =[]

    return new Promise((resolve, reject) => {
        const dbCollection = collection(db, "Trips");
        getDocs(dbCollection)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trip = {
                        ...doc.data(),
                        id: doc.id,
                    }
                    data.push(trip)
                })
                resolve(data)
            })
            .catch((error) => {
                reject("failed")
            });
        });
}