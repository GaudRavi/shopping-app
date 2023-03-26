import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DashboardSales } from '../../application/dashboard/models/DashboardSales';
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
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Categories } from '../../application/sales-screen/model/categories';

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

  // Dashboard related data
  getDashboardData(): Observable<DashboardSales>{
    return new Observable((observer) => {
    const uid = JSON.parse(localStorage.getItem('user')!)?.uid;
    const salesCollection = collection(this.getFirestoreDB(), 'dashboardSales');
    const queryRef = query(salesCollection, where('id', '==', uid), limit(1));
    let dashboardData: DashboardSales;
    onSnapshot(
      queryRef,
      async (snapshot) => {
        snapshot.docs.forEach((documnet) => dashboardData = {...documnet.data()} as DashboardSales)
        observer.next(dashboardData)
      },
      (error) => {
        console.log(error);
      }
    )
    })
  }

  create(dashboardSales: DashboardSales, uid: string): any {
    return this.db.collection('dashboardSales').doc(uid).set({ ...dashboardSales });
  }

  addProduct(dashboardSales: any): any {
    return this.db.collection('products').add({ ...dashboardSales });
  }

  setSalesTarget(id: string, data: DashboardSales): Promise<void> {
    return this.db.collection('dashboardSales').doc(id).update(data);
  }

  // sell screen data
  getCategoryData(): Observable<Categories[]>{
    return new Observable((observer) => {
    const uid = JSON.parse(localStorage.getItem('user')!)?.uid;
    const categoryCollection = collection(this.getFirestoreDB(), 'categories');
    const queryRef = query(categoryCollection, where('id', '==', uid), limit(1));
    let categoryData: Categories[];
    onSnapshot(
      queryRef,
      async (snapshot) => {
        snapshot.docs.forEach((documnet) => categoryData = {...documnet.data()} as any)
        observer.next(categoryData)
      },
      (error) => {
        console.log(error);
      }
    )
    })
  }
}
