import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-transactions',
  templateUrl: './sales-transactions.component.html',
  styleUrls: ['./sales-transactions.component.scss'],
})
export class SalesTransactionsComponent implements OnInit {
  isLoading: boolean = true;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false
    }, 3000);
  }

}
