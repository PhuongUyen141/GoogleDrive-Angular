// import { Component, OnInit } from '@angular/core';
// import {FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import {HttpClient} from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.scss']
// })
// export class SignUpComponent implements OnInit {

//   constructor(public auth:AuthService, public http:HttpClient, public fb:FormBuilder) { }
//   userprofile = this.fb.group({
//     firstName:new FormControl(''),
//     lastName:new FormControl(''),
//     email: new FormControl('',[Validators.required,Validators.email]),
//     password: new FormControl('',[Validators.required,Validators.minLength(8)]),
//     retypepassword:new FormControl('',[Validators.required] ),
//     phonenumber:new FormControl(''),

//   },{validators:this.checkPassword});
// checkPassword(group: FormGroup){
//   let password = group.get('password').value;
//   console.log(password);
//   let retypepassword =group.get('retypepassword').value;
//   return password === retypepassword ? null : { notSame: true } 
// }

// hide = true;
// get retypeInput() { return this.userprofile.get('password'); }
// get passwordInput() { return this.userprofile.get('retypepassword'); }  

// async onSummitFrom(){
//   console.log( this.userprofile.value);
//   this.createuser(this.userprofile.value)
// }
// public async createuser(user:any){
//   try {
//    console.log(await this.http.post(environment.endpoint+'user',user).toPromise());
//    console.log(await this.http.post(environment.endpoint+'createFolder/createUserFolder',user).toPromise())
//   } catch (error) {
//     console.log(error)
//   }
// }
  

//   ngOnInit(): void {
//   }
  
 
  


// }



import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userprofile:FormGroup;
  hidePassword = true;
  hideretypePassword =true;
  submitted = false;
  constructor(public auth:AuthService, public http:HttpClient, public fb:FormBuilder) { }




get retypeInput() { return this.userprofile.get('password'); }
get passwordInput() { return this.userprofile.get('retypepassword'); }  

async onSummitFrom(){
  this.submitted = true;
// Stop if field is invalid
        if (this.userprofile.invalid) {
            return;
        }
  console.log( this.userprofile.value);
  this.createuser(this.userprofile.value)
  this.userprofile.reset();
}
get f() { return this.userprofile.controls; }
public async createuser(user:any){
  try {
   console.log(await this.http.post(environment.endpoint+'user',user).toPromise());
   console.log(await this.http.post(environment.endpoint+'createFolder/createUserFolder',user).toPromise())
  } catch (error) {
    console.log(error)
  }
}
checkPassword(group: FormGroup){
  let password = group.get('password').value;
  // console.log(password);
  let retypepassword =group.get('retypepassword').value;
  // console.log(retypepassword)
  return password === retypepassword ? null : { notSame: true } 
}

  ngOnInit(): void {
    
    this.userprofile = this.fb.group({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      retypepassword:new FormControl('',[Validators.required] ),
      phonenumber:new FormControl('',Validators.required),
  
    },{validators: this.checkPassword});

  }
  
 
  


}