import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const sub = this.authService.authenticatedUser$.pipe(take(1)).subscribe(authData => {
            if(!authData) {
                return true; // If not authenticated, login is accessable
            } else {
                this.router.navigateByUrl("/all-tests");
            }
        });
        return false;
    }
    
}