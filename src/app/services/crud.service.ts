// firebase.service.ts
import { Injectable, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthenticationService } from "./authentication.service";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  collectionName: string = "testx";
  anotherCollection: string = "newData";

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthenticationService,
    private navCtrl: NavController
  ) {}

  ionViewdidLoad() {
    this.authService.userDetails().subscribe((user) => {
      console.log(user.uid);
      this.collectionName = user.uid;
    });
  }

  ngOnInit() {}

  create_student(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_students() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  //reading routingData collection
  readMonth() {
    return this.firestore.collection("newData").snapshotChanges();
  }

  //updating the details in the database
  update_month(recordID, record) {
    this.firestore.doc("newData" + "/" + recordID).update(record);
  }

  delete_student(record_id) {
    this.firestore.doc(this.collectionName + "/" + record_id).delete();
  }
}
