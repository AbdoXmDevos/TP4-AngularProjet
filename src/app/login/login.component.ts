import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AppStateService} from "../services/app-state.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup;
  errorMessage : undefined;
  constructor(private fb : FormBuilder,
              private router : Router,
              private  auth : AuthService,
              private stateService : AppStateService)  {

  }
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: [''], // Définir le contrôle du champ username
      password: [''] // Définir le contrôle du champ password
    });
  }

  handleLogin(){
    // console.log(this.formLogin.value);
    // if(this.formLogin.value.username=="admin" && this.formLogin.value.password=="admin" ){
    //   this.router.navigateByUrl("/admin")
    // }
    let username = this.formLogin.value.username
    let password = this.formLogin.value.password
    this.auth.login(username,password).
    then(resp=>{
        this.router.navigateByUrl("/admin")
    })
      .catch(error=>{
        this.errorMessage = error;
      })
  }
}
