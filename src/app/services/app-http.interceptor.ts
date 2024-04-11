import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private appStateService : AppStateService,private loadingService : LoadingService) {


  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /*
    this.appStateService.setPorductState({
      status : "LOADING" // avant qu'il retourne la requete il fait loading
    })*/
    this.loadingService.showLoadingSpinner()
    // Crée une copie de la requête et ajoute les en-têtes d'authentification
    const authReq = req.clone({
     headers : req.headers.set("Autorization","Bearer JWT ")
    });

    // Passe la requête modifiée au gestionnaire suivant
    return next.handle(authReq).pipe(
      finalize(()=>{
        // this.appStateService.setPorductState({
        //   status : "LOADED" // avant qu'il retourne la requete il fait loading
        // })
        this.loadingService.hideLoadingSpinner()
      })
    );
  }
}
