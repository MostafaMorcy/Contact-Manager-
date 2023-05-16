import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit {
  isLogin:boolean=false
constructor(private _loginService:LoginService){
  this._loginService.userData.subscribe({
    next:()=>{
      if(this._loginService.userData.getValue() !=null){
        this.isLogin=true
      }else{
        this.isLogin=false 
  
      }
    }
      })

}
ngOnInit() {
  

}
signOut(){
  this._loginService.logout()
    }
}
