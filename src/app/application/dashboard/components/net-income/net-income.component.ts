import { Component, Input, OnInit } from '@angular/core';
import { dashboardSales } from 'src/app/shared/models/dashboardSales';

@Component({
  selector: 'app-net-income',
  templateUrl: './net-income.component.html',
  styleUrls: ['./net-income.component.scss'],
})
export class NetIncomeComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Input() dashboardSales!: dashboardSales[];
  @Input() netIncome!: number;
  @Input() lastCycleNetIncome!: number;

  constructor() { }

  ngOnInit() { }
  
  getSellGrowth(){
    if (this.netIncome === this.lastCycleNetIncome) return 0;
    if (this.netIncome === 0) return 100;
    return Math.abs((1 - (this.netIncome / this.lastCycleNetIncome)) * 100);
  }

}
