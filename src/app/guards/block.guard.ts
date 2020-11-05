import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FirebaseService } from "../servicios/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class BlockGuard implements CanActivate {
 
  constructor(private auth: FirebaseService, private router: Router){ }

  canActivate(): Observable<boolean> {
    return this.auth.authFire.authState.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
