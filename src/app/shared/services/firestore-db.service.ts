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
import { Category } from '../../application/sales-screen/model/Category';
import { Product } from '../../application/sales-screen/model/Product';

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
  getCategoryData(): Promise<any>{
    return new Promise((resolve, reject) => {
      const uid = JSON.parse(localStorage.getItem('user')!)?.uid;
      const categoryCollection = collection(this.getFirestoreDB(), 'categories');
      const queryRef = query(categoryCollection, where('id', '==', uid), limit(1));
      let categoryData: Category[];
      onSnapshot(
        queryRef,
        async (snapshot) => {
          snapshot.docs.forEach((documnet) => categoryData = {...documnet.data()} as any)
          resolve(categoryData);
        },
        (error) => reject(error)
      )
    })
  }

  getProductData(): Promise<Product[]>{
    return new Promise((resolve, reject) => {
      const uid = JSON.parse(localStorage.getItem('user')!)?.uid;
      const productCollection = collection(this.getFirestoreDB(), 'products');
      const queryRef = query(productCollection, where('userId', '==', uid));
      let product: Product[] = [];
      onSnapshot(
        queryRef,
        async (snapshot) => {
          snapshot.docs.forEach((documnet) => product.push({...documnet.data()} as any))
          resolve(product)
        },
        (error) => reject(error)
      )
    })
  }

  getCategoryWiseProduct(categoryId: number): Promise<Product[]>{
    return new Promise((resolve, reject) => {
      const uid = JSON.parse(localStorage.getItem('user')!)?.uid;
      const productCollection = collection(this.getFirestoreDB(), 'products');
      const queryRef = query(
        productCollection,
        where('userId', '==', uid),
        where('categoryId', '==', categoryId)
      );

      let product: Product[] = [];
      onSnapshot(
        queryRef,
        async (snapshot) => {
          snapshot.docs.forEach((documnet) => product.push({...documnet.data()} as any))
          resolve(product)
        },
        (error) => reject(error)
      )
    })
  }
}
