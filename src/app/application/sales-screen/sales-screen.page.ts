import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommonService } from '../../shared/services/common.service';
import { FirestorDBService } from '../../shared/services/firestore-db.service';
import { SetCategories } from './actions/sales-screen.action';
import { Categories } from './model/categories';
import { SalesScreenState } from './states/sales-screen.state';

@Component({
  selector: 'app-sales-screen',
  templateUrl: './sales-screen.page.html',
  styleUrls: ['./sales-screen.page.scss'],
})
export class SalesScreenPage implements OnInit, OnDestroy {

  subscription: any;
  isLoading: boolean = true;
  categories!: Categories[];

  constructor(
    private commonService: CommonService,
    private store: Store,
    private firebaseDB: FirestorDBService
  ) { }

  ngOnInit() {
    this.getDashboardSales();
  }

  getDashboardSales() {
    if(this.commonService.isOnline){
      this.subscription = this.firebaseDB.getCategoryData().subscribe((data: any) => {
        this.categories = data?.categories;
        this.store.dispatch(new SetCategories({categories: data?.categories, id: data?.id})).subscribe();
        this.isLoading = false;
      })
    }else{
      this.store.select(SalesScreenState.getCategories).subscribe((data:any) => {
        this.categories = data?.categories;
        this.isLoading = false;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
