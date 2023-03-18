import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-target',
  templateUrl: './sales-target.component.html',
  styleUrls: ['./sales-target.component.scss'],
})
export class SalesTargetComponent implements OnInit {
  isLoading: boolean = true;
  isEditTarget: boolean = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false
    }, 1500);
  }

  editTarget(){
    this.isEditTarget = !this.isEditTarget;
  }
}
