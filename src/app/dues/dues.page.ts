import { Component, OnInit } from "@angular/core";
import { Due } from "./due.model";
import { RoutingService } from "../services/routing.service";
import { FirebaseService } from "../services/crud.service";

@Component({
  selector: "app-dues",
  templateUrl: "./dues.page.html",
  styleUrls: ["./dues.page.scss"],
})
export class DuesPage implements OnInit {
  monthList: Due[];

  constructor(
    private routeService: RoutingService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    // this.monthList = this.routeService.getMonths();

    //***This method is used to read the data from the firestore***
    this.firebaseService.readMonth().subscribe((data) => {
      this.monthList = data.map((e) => {
        return {
          uid: e.payload.doc.id,
          id: e.payload.doc.data()["id"],
          month: e.payload.doc.data()["month"],
          isPaid: e.payload.doc.data()["isPaid"],
          comment: e.payload.doc.data()["comment"],
        };
      });
      this.routeService.setMonthList(this.monthList);
    });
  }

  // Func() {
  //   console.log(this.routeService.monthList);
  // }
}
