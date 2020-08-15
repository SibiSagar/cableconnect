import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NavController } from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  validationForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Enter a valid email." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long.",
      },
    ],
    username: [
      { type: "required", message: "Username Required." },
      {
        type: "minlength",
        message: "Username must be at least 4 characters long.",
      },
    ],
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
      date: new FormControl("", [Validators.required]),
      Username: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value).then(
      (res) => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      }
    );
  }

  goLoginPage() {
    this.navCtrl.navigateBack("");
  }
}
