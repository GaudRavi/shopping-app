import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Pagination } from 'swiper';
import { FirestorDBService } from '../../shared/services/firestore-db.service';
import { DashboardSales } from './models/DashboardSales';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../shared/services/common.service';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardPage implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('swiper') swiper!: SwiperComponent;
  dashboardSales!: DashboardSales;
  salesTargetControl: FormControl;
  netIncome!: number;
  lastCycleNetIncome!: number;
  isLoading: boolean = true;
  isEditTarget: boolean = false;
  isOnline: boolean = false;
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination:  { clickable: true },
    spaceBetween: 10
  };
  subscription: any;

  constructor(
    private firebaseDB: FirestorDBService,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.salesTargetControl = this.fb.control(0, [Validators.min(0)]);
    this.isOnline = this.commonService.isOnline;
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  ngOnInit() {
    if(window.innerWidth > 767) {
      this.config.slidesPerView = 3;
    }
    this.getDashboardSales();
  }

  getDashboardSales() {
    if(this.commonService.isOnline){
      this.subscription = this.firebaseDB.getDashboardData().subscribe((dashboardData) => {
        this.dashboardSales = dashboardData as DashboardSales;
        localStorage.setItem('dashboardSales', JSON.stringify(this.dashboardSales));
        this.netIncome = this.dashboardSales.profit - this.dashboardSales.expenses;
        this.lastCycleNetIncome = this.dashboardSales.lastCycleProfit - this.dashboardSales.lastCycleExpenses;
        this.salesTargetControl.patchValue(this.dashboardSales.salesTarget);
        this.isLoading = false;
      });
    }else{
      this.dashboardSales = JSON.parse(localStorage.getItem('dashboardSales')!);
      this.isLoading = false;
    }
  }

  async editTargetValue(){
    this.salesTargetControl.disable();
    let id: string = this.dashboardSales.id!;
    let data = {
      ...this.dashboardSales,
      salesTarget: +this.salesTargetControl.value
    };
    await this.firebaseDB.setSalesTarget(id, data).then();
    this.salesTargetControl.enable();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
