import { Injectable, OnInit } from "@angular/core";
import { Due } from "../dues/due.model";
import { FirebaseService } from "./crud.service";

@Injectable({
  providedIn: "root",
})
export class RoutingService implements OnInit {
  monthList = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  setMonthList(list) {
    this.monthList = list;
    console.log(this.monthList);
  }

  getMonth(paramId: number) {
    console.log(this.monthList);
    const month = this.monthList.find((month) => {
      return month.id === paramId;
    });
    return month;
  }
}
