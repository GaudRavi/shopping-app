import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  go(){
    this.router.navigate(['/signup'])
  }

  submitLoginForm(value:any){
    this.formSubmitted = true;
    if(this.loginForm.valid){
      this.authservice.SignIn(value.email, value.password)
      this.formSubmitted = false;
    }
  }
}

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdvfeob2xiq0a8D6yctxel_QUVDqD43mw",
  authDomain: "shopping-app-51235.firebaseapp.com",
  projectId: "shopping-app-51235",
  storageBucket: "shopping-app-51235.appspot.com",
  messagingSenderId: "369894349172",
  appId: "1:369894349172:web:e590af20a4b50eae8df421",
  measurementId: "G-60R2QPV28N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/
