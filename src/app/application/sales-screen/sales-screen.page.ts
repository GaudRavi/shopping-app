import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommonService } from '../../shared/services/common.service';
import { FirestorDBService } from '../../shared/services/firestore-db.service';
import { SetCategories } from './actions/sales-screen.action';
import { Category } from './model/Category';
import { SalesScreenState } from './states/sales-screen.state';
import { Product } from './model/Product';

@Component({
  selector: 'app-sales-screen',
  templateUrl: './sales-screen.page.html',
  styleUrls: ['./sales-screen.page.scss'],
})
export class SalesScreenPage implements OnInit, OnDestroy {

  isCategoryLoading: boolean = true;
  isProductLoading: boolean = true;
  categories!: Category[];
  products!: Product[];
  selectedCategory!: string;

  constructor(
    private commonService: CommonService,
    private store: Store,
    private firebaseDB: FirestorDBService
  ) { }

  ngOnInit() {
    this.getCategoryData();
  }

  async getCategoryWiseProduct(category: any){
    if(this.selectedCategory !== category.name){
      this.isProductLoading = true;
      this.selectedCategory = category.name;
      this.products =  await this.firebaseDB.getCategoryWiseProduct(category.categoryId)
      this.isProductLoading = false;
    }
  }

  getCategoryData() {
    if(this.commonService.isOnline){
      this.firebaseDB.getCategoryData().then((data: any) => {
        this.categories = data?.categories;
        this.store.dispatch(new SetCategories({categories: data?.categories, id: data?.id})).subscribe();
        this.isCategoryLoading = false;
        this.getCategoryWiseProduct(this.categories[0]);
      })
    }else{
      this.store.select(SalesScreenState.getCategories).subscribe((data:any) => {
        this.categories = data?.categories;
        this.isCategoryLoading = false;
        this.getCategoryWiseProduct(this.categories[0]);
      });
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
