import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
// import SwiperCore, { Pagination } from 'swiper/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardPage implements OnInit {
  @ViewChild('swiper') swiper!: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination:  { clickable: true },
    spaceBetween: 10
  };
  constructor() { }

  ngOnInit() {
    if(window.innerWidth > 767) {
      this.config.slidesPerView = 3;
    }
  }

}
