import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "../config/firebase";

export const login = async (data: any) => {
    const { email, password } = data

    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid } = response.user

        return {
            status: true,
            user: {
                id: uid,
                email
            }
        }
    } catch (error: any) {
        throw new Error(error.code)
    }
}

export const logout = async () => {
    try {
        return await FirebaseAuth.signOut()
    } catch (error: any) {
        throw new Error(error.code)
    }
}