import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { dashboardSales } from 'src/app/shared/models/dashboardSales';

@Component({
  selector: 'app-sales-target',
  templateUrl: './sales-target.component.html',
  styleUrls: ['./sales-target.component.scss'],
})
export class SalesTargetComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Input() isOnline: boolean = false;
  @Input() dashboardSales!: dashboardSales[];
  @Input() isEditTarget: boolean = false;
  @Input() salesTargetControl!: FormControl;
  @Output() editTargetValue = new EventEmitter<any>();
  constructor() { }

  ngOnInit() { }

  toggleEdit (){
    this.isEditTarget = !this.isEditTarget;
  }

  editTarget(){
    this.editTargetValue.emit();
    this.isEditTarget = false;
  }

  getSellGrowth(){
    let totalSales = this.dashboardSales[0].totalSales;
    let lastCycleSales = this.dashboardSales[0].lastCycleSales;
    if (totalSales === lastCycleSales) return 0;
    if (totalSales === 0) return 100;
    return Math.abs((1 - (totalSales / lastCycleSales)) * 100);
  }

  get progressPercentage(): number {
    if (!this.dashboardSales[0].salesTarget) return 0;
    return Math.floor((this.dashboardSales[0].totalSales / this.dashboardSales[0].salesTarget) * 100);
  }
}
