import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { dashboardSales } from '../models/dashboardSales';
import {
  getFirestore,
  Firestore,
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestorDBService {
  app: FirebaseApp;
  fireDB!: Firestore;

  constructor(private db: AngularFirestore) {
    this.app = initializeApp(environment.firebase);
    this.fireDB = getFirestore(this.app);
  }

  getFirestoreDB() {
    return this.fireDB;
  }

  getDashboardData(): Observable<dashboardSales>{
    return new Observable((observer) => {
    const uid = JSON.parse(localStorage.getItem('user')!)?.uid;
    const userCollection = collection(this.getFirestoreDB(), 'dashboardSales');
    const queryRef = query(userCollection, where('id', '==', uid), limit(1));
    let dashboardData: dashboardSales;
    onSnapshot(
      queryRef,
      async (snapshot) => {
        snapshot.docs.forEach((documnet) => dashboardData = {...documnet.data()} as dashboardSales)
        observer.next(dashboardData)
      },
      (error) => {
        console.log(error);
      }
    )
    })
  }

  create(dashboardSales: dashboardSales, uid: string): any {
    return this.db.collection('dashboardSales').doc(uid).set({ ...dashboardSales });
  }

  setSalesTarget(id: string, data: dashboardSales): Promise<void> {
    return this.db.collection('dashboardSales').doc(id).update(data);
  }

  // delete(id: string): Promise<void> {
  //   return this.tutorialsRef.doc(id).delete();
  // }
}
