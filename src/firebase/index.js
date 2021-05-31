import config from "./config";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const app = firebase.initializeApp(config);
export const auth = app.auth();
export var db = app.firestore();
export default db;
