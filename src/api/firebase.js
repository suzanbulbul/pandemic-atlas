import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
    const storageRef = ref(storage, `images/${data.image.name + v4()}`);
  
    try {
      const snapshot = await uploadBytes(storageRef, data.image);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      // Resmin URL'sini data nesnesine ekle
      data.imageURL = downloadURL;
  
      // Dosya nesnesini veriden kaldır
      delete data.image;
  
      // Firestore'a ürün bilgileri ve resim URL'si ile birlikte veri ekle
      await addDoc(collection(firestore, "products"), data);
  
      console.log('Data Firestore\'a başarıyla yüklendi!');
      toaster.success('Data Firestore\'a başarıyla yüklendi!');
    } catch (error) {
      console.error('Firestore\'a veri yüklenirken hata oluştu: ', error);
      toaster.error('Firestore\'a veri yüklenirken hata oluştu: ' + error.message);
    }
  };
