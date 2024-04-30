import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

//Toaster
import  toaster  from 'react-hot-toast';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app); 

export const uploadDataToFirestore = async (data) => {
    data.uploadDate = new Date().toISOString();
    
    const storageRef = ref(storage, `images/${data.image.name + v4()}`);
 
    const snapshot = await uploadBytes(storageRef, data.image);
    const downloadURL = await getDownloadURL(snapshot.ref);

    data.imageURL = downloadURL;

    delete data.image;

    const response = await addDoc(collection(firestore, "products"), data).then((res) => {
      if (res.error) {
        return res;
      } else {
        return res;
      }
    })
    return response
};

export const fetchDataFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "products"));
    const data = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const item = {
        id: doc.id,
        ...docData
      };
      data.push(item);
    });
    return data;
  } catch (error) {
    return error;
  }
};

const uploadDataToRealtimeDatabase = async (data) => {
  try {
    // Veri yolunu belirleyerek veriyi eklemek
    const newDataRef = await db.ref('products').push(data);

    // Başarılı yanıt döndürme
    return { success: true, newDataRef };
  } catch (error) {
    // Hata durumunda hata mesajını döndürme
    return { error: error.message };
  }
};