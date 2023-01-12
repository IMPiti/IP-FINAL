import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { FirebaseService } from './FirebaseService.service';


@Injectable()
export class AuthGuard {
  constructor(
    public fbs: FirebaseService
  ) {

  }
  

}