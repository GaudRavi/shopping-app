import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-net-income',
  templateUrl: './net-income.component.html',
  styleUrls: ['./net-income.component.scss'],
})
export class NetIncomeComponent implements OnInit {
  isLoading: boolean = true;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false
    }, 9000);
  }

}
