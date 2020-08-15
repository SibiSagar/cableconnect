import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}
  //value from the formGroup
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password).then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  logoutUser() {
    return new Promise<any>((resolve, reject) => {
      console.log(this.auth.currentUser);
      if (this.auth.currentUser) {
        this.auth
          .signOut()
          .then(() => {
            console.log("Log out");
            resolve();
          })
          .catch((error) => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return this.auth.user;
  }
}
