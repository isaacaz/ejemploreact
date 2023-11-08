import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { FirebaseDB } from "../config";
import { IUser } from "../types";

const getAllData = async () => {
    const dataRef = collection(FirebaseDB, "User");
    const querySnapshot = await getDocs(dataRef);
    const data = querySnapshot.docs.map((doc) => {
        return {
            ...doc.data() as IUser,
            id: doc.id,
        }
    });
    return data;
};

const getData = async (id: string) => {
    const docRef = doc(FirebaseDB, "User", id + "");
    const docSnap = await getDoc(docRef);
    const data = { ...docSnap.data() as IUser, id: docSnap.id } as IUser
    return data
}


const insertData = async (user: IUser) => {
    try {
        await addDoc(collection(FirebaseDB, "User"), user);
    } catch (error) {
        console.error("Error al insertar", error);
        throw new Error("No se pudo insertar")
    }
}


const deleteData = async (id: string) => {
    try {
        const docRef = doc(FirebaseDB, "User", id + "");
        await deleteDoc(docRef);
    } catch (error: any) {
        console.error("Error al eliminar:", error);
        throw new Error("No se pudo eliminar")
    }
}



const updateData = async (user: IUser) => {
    try {
        const docRef = doc(FirebaseDB, "User", user.id + "");
        await updateDoc(docRef, user as any);
    } catch (error:any) {
        console.error("Error al actualozar", error);
        throw new Error("No se pudo actualizar")
    }
}


export default {
    getAllData, getData, insertData, updateData, deleteData
}