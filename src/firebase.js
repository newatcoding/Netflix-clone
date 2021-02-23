import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA_eBAfnnPaIIRKzUjUoN-176ecSDiMyH4",
    authDomain: "netflix-clone-96032.firebaseapp.com",
    projectId: "netflix-clone-96032",
    storageBucket: "netflix-clone-96032.appspot.com",
    messagingSenderId: "529309830265",
    appId: "1:529309830265:web:7adf915c11221a640498a8"
  }; 

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {auth};

  export default db;