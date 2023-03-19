import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { dashboardSales } from '../models/dashboardSales';

@Injectable({
  providedIn: 'root'
})
export class FirestorDBService {
  private dbPath = '/dashboardSales';
  Ref: AngularFirestoreCollection<dashboardSales>;

  constructor(private db: AngularFirestore) {
    this.Ref = db.collection(this.dbPath);
  }

  getAllDashboardSales(): AngularFirestoreCollection<dashboardSales> {
    return this.Ref;
  }

  // create(tutorial: any): any {
  //   return this.tutorialsRef.add({ ...tutorial });
  // }

  setSalesTarget(id: string, data: dashboardSales): Promise<void> {
    return this.Ref.doc(id).update(data);
  }

  // delete(id: string): Promise<void> {
  //   return this.tutorialsRef.doc(id).delete();
  // }
}
