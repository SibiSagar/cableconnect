import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DuesPage } from "./dues.page";

const routes: Routes = [
  {
    path: "",
    component: DuesPage,
  },
  {
    path: "duepay/:id",
    loadChildren: () =>
      import("./duepay/duepay.module").then((m) => m.DuepayPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuesPageRoutingModule {}
