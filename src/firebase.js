import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBfB8iOS1lBs91b3P_pwJofuU62-mrRegs',
  authDomain: 'vizovote.firebaseapp.com',
  projectId: 'vizovote',
  storageBucket: 'vizovote.firebasestorage.app',
  messagingSenderId: '13830722555',
  appId: '1:13830722555:web:5502d98d94ad4e8902315e',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage(app)
