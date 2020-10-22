import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FirebaseService } from "../servicios/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class BlockGuard implements CanActivate {
 
  constructor(private auth: FirebaseService, private router: Router){ }

  canActivate(){
    if(this.auth.getCurrentUser()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
