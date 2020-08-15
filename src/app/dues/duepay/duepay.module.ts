import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DuepayPageRoutingModule } from "./duepay-routing.module";

import { DuepayPage } from "./duepay.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DuepayPageRoutingModule],
  declarations: [DuepayPage],
})
export class DuepayPageModule {}
