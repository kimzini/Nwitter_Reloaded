import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA_1qaWdqalva-ITXDvYss7C7ZLz-nCtek",
    authDomain: "nwitter-reloaded-f90c8.firebaseapp.com",
    projectId: "nwitter-reloaded-f90c8",
    storageBucket: "nwitter-reloaded-f90c8.appspot.com",
    messagingSenderId: "681152618508",
    appId: "1:681152618508:web:695ddf0590d00218928e29"
};

const app = initializeApp(firebaseConfig); // 위 config 옵션을 통해서 app을 생성

export const auth = getAuth(app); // app에 대한 인증 서비스 사용할 예정

export const storage = getStorage(app);

export const db = getFirestore(app);

