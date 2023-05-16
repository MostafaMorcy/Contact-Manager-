import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // username: string = '';
  // password: string = '';
  // error: string = '';
loginForm=new FormGroup({
    username:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required])
    })
 errorMassage:string='';
 constructor(private router: Router, private _loginService: LoginService) {}
  ngOnInit() {}
  
  sendData(loginForm:FormGroup){
   this._loginService.userLogin(loginForm.value).subscribe({
   next:(res)=>{
    if (res.message == 'success') {
              console.log('Login successful!');
              localStorage.setItem('userToken', res.token);
              this._loginService.saveUserData()
              this.router.navigate(['/list']);
            } else {
              this.errorMassage = res.message;
            }
      }
  })






}
}


// onSubmit() {
//   this._loginService
//     .userLogin({
//       username: this.username,
//       password: this.password,
//     })
//     .subscribe((res) => {
//       if (res.message == 'success') {
//         console.log('Login successful!');
//         localStorage.setItem('userToken', res.token);
//         this.router.navigate(['/list']);
//       } else {
//         this.error = res.message;
//       }
//     });
// }