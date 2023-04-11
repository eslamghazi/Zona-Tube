import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'please wait, We are logging you in.';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  async login() {
    try {
      this.showAlert = true;
      this.alertColor = 'blue';
      this.alertMsg = 'please wait, We are logging you in.';
      this.inSubmission = true;

      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      console.log(error);
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'An error has been occurs,Please try again later ';
    }
    this.alertColor = 'green';
    this.alertMsg = 'Success! you are now logged in.';
  }
}
