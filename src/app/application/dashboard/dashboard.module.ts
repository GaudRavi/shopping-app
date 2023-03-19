import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { SwiperModule } from 'swiper/angular';
import { DashboardPage } from './dashboard.page';
import { SalesTargetComponent } from './components/sales-target/sales-target.component';
import { SalesTransactionsComponent } from './components/sales-transactions/sales-transactions.component';
import { NetIncomeComponent } from './components/net-income/net-income.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SwiperModule
  ],
  declarations: [
    DashboardPage,
    SalesTargetComponent,
    SalesTransactionsComponent,
    NetIncomeComponent
  ]
})
export class DashboardPageModule {}
