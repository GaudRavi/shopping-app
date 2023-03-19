import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
// import SwiperCore, { Pagination } from 'swiper/core';
import { FirestorDBService } from 'src/app/shared/services/firestor-db.service';
import { map } from 'rxjs';
import { dashboardSales } from 'src/app/shared/models/dashboardSales';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardPage implements OnInit {
  @ViewChild('swiper') swiper!: SwiperComponent;
  dashboardSales!: dashboardSales[];
  salesTargetControl: FormControl;
  netIncome!: number;
  lastCycleNetIncome!: number;
  isLoading: boolean = true;
  isEditTarget: boolean = false;
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination:  { clickable: true },
    spaceBetween: 10
  };

  constructor(
    private firebaseDB: FirestorDBService,
    private fb: FormBuilder
  ) {
    this.salesTargetControl = this.fb.control(0, [Validators.min(0)]);
  }

  ngOnInit() {
    this.getDashboardSales();
    if(window.innerWidth > 767) {
      this.config.slidesPerView = 3;
    }
  }

  getDashboardSales(): void {
    this.firebaseDB.getAllDashboardSales().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.dashboardSales = data;
      this.netIncome = this.dashboardSales[0].profit - this.dashboardSales[0].expenses;
      this.lastCycleNetIncome = this.dashboardSales[0].lastCycleProfit - this.dashboardSales[0].lastCycleExpenses;
      this.salesTargetControl.patchValue(this.dashboardSales[0].salesTarget);
      this.isLoading = false;
    });
  }

  async editTargetValue(){
    this.salesTargetControl.disable();
    let id: any = this.dashboardSales[0].id;
    let data = {
      ...this.dashboardSales[0],
      salesTarget: +this.salesTargetControl.value
    };
    await this.firebaseDB.setSalesTarget(id, data).then();
    this.salesTargetControl.enable();
  }

}
