import { Component, Input, OnInit } from '@angular/core';
import { DashboardSales } from '../../models/DashboardSales';

@Component({
  selector: 'app-sales-transactions',
  templateUrl: './sales-transactions.component.html',
  styleUrls: ['./sales-transactions.component.scss'],
})
export class SalesTransactionsComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Input() dashboardSales!: DashboardSales;

  constructor() { }

  ngOnInit() { }

  getSellGrowth(){
    let salesCount = this.dashboardSales.salesCount;
    let lastCycleSalesCount = this.dashboardSales.lastCycleSalesCount;
    if (salesCount === lastCycleSalesCount) return 0;
    if (salesCount === 0) return 100;
    return Math.abs((1 - (salesCount / lastCycleSalesCount)) * 100);
  }
}
