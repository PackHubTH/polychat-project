import { getAuth } from "firebase/auth";
import { app } from "./firestore"

export const auth = getAuth(app);