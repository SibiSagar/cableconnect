import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { NavController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  validationForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private navController: NavController
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
    });
  }

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long.",
      },
    ],
  };

  loginUser(value) {
    this.authService.loginUser(value).then(
      (res) => {
        console.log(res);
        this.errorMessage = "";
        this.navController.navigateForward("/dashboard");
      },
      (err) => {
        this.errorMessage = err.message;
      }
    );
  }

  goToRegisterPage() {
    this.navController.navigateForward("/register");
  }
}
