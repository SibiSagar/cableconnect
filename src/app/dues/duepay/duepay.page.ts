import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Due } from "../due.model";
import { RoutingService } from "src/app/services/routing.service";
import { FirebaseService } from "src/app/services/crud.service";

@Component({
  selector: "app-duepay",
  templateUrl: "./duepay.page.html",
  styleUrls: ["./duepay.page.scss"],
})
export class DuepayPage implements OnInit {
  currentRouteId: number;
  currentMonth;
  comments: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private routingService: RoutingService,
    private routes: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    //***Select the month object from the URL***
    this.activeRoute.params.subscribe((params: Params) => {
      this.currentRouteId = +params["id"];
      this.currentMonth = this.routingService.getMonth(this.currentRouteId); //getting the month detail
      console.log(this.currentMonth);
    });
  }

  // payFunc() {
  //   this.currentMonth.isPaid = true;
  //   console.log(this.currentMonth.isPaid);
  //   console.log(this.currentMonth.comment);
  //
  // }

  //***For object gets updated once Pay button is clicked */
  payFunc() {
    console.log(this.currentMonth.isPaid);
    console.log(this.currentMonth.comment);

    let record = {};
    record["id"] = this.currentMonth.id;
    record["month"] = this.currentMonth.month;
    record["isPaid"] = true;
    record["comment"] = this.currentMonth.comment;
    this.firebaseService.update_month(this.currentMonth.uid, record);
    this.routes.navigateByUrl("/dues");
  }
}
