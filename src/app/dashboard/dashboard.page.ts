import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirebaseService } from "../services/crud.service";

interface StudentData {
  Name: string;
  Age: number;
  Address: string;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  userEmail: string;
  testVar;
  studentList = [];
  studentData: StudentData;
  studentForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.studentData = {} as StudentData;
  }

  ngOnInit() {
    // current user details
    this.authService.userDetails().subscribe(
      (res) => {
        console.log("res", res);
        if (res !== null) {
          this.userEmail = res.email;
          this.testVar = res.uid;
        } else {
          this.navCtrl.navigateBack("");
        }
      },
      (err) => {
        console.log("err", err);
      }
    );

    //crud
    this.studentForm = this.fb.group({
      Name: ["", [Validators.required]],
      Age: ["", [Validators.required]],
      Address: ["", [Validators.required]],
    });

    this.firebaseService.read_students().subscribe((data) => {
      this.studentList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()["Name"],

          Age: e.payload.doc.data()["Age"],
          Address: e.payload.doc.data()["Address"],
        };
      });
      console.log(this.studentList);
    });
  }

  CreateRecord() {
    console.dir(this.userEmail);

    this.firebaseService
      .create_student(this.studentForm.value)
      .then((resp) => {
        this.studentForm.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_student(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record["Name"] = recordRow.EditName;
    record["Age"] = recordRow.EditAge;
    record["Address"] = recordRow.EditAddress;
    this.firebaseService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  logout() {
    this.authService
      .logoutUser()
      .then((res) => {
        console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
