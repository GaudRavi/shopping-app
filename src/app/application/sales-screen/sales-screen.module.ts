import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalesScreenPageRoutingModule } from './sales-screen-routing.module';
import { SalesScreenPage } from './sales-screen.page';
import { NgxsModule } from '@ngxs/store';
import { SalesScreenState } from './states/sales-screen.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesScreenPageRoutingModule,
    NgxsModule.forFeature([SalesScreenState])
  ],
  declarations: [SalesScreenPage]
})
export class SalesScreenPageModule {}
