import { Component, Input, OnInit } from '@angular/core';
import { dashboardSales } from 'src/app/shared/models/dashboardSales';

@Component({
  selector: 'app-sales-transactions',
  templateUrl: './sales-transactions.component.html',
  styleUrls: ['./sales-transactions.component.scss'],
})
export class SalesTransactionsComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Input() dashboardSales!: dashboardSales[];

  constructor() { }

  ngOnInit() { }

  getSellGrowth(){
    let salesCount = this.dashboardSales[0].salesCount;
    let lastCycleSalesCount = this.dashboardSales[0].lastCycleSalesCount;
    if (salesCount === lastCycleSalesCount) return 0;
    if (salesCount === 0) return 100;
    return Math.abs((1 - (salesCount / lastCycleSalesCount)) * 100);
  }
}
