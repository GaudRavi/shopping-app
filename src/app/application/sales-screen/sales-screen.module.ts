import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalesScreenPageRoutingModule } from './sales-screen-routing.module';
import { SalesScreenPage } from './sales-screen.page';
import { NgxsModule } from '@ngxs/store';
import { SalesScreenState } from './states/sales-screen.state';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesScreenPageRoutingModule,
    NgxsModule.forFeature([SalesScreenState])
  ],
  declarations: [
    SalesScreenPage,
    ProductCardComponent
  ]
})
export class SalesScreenPageModule {}
