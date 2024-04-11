import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any> = [

    {title : "Home", "route":"/home",icon : "house" },
    {title : "product", "route":"/product",icon : "search" },
    {title : "newProduct", "route":"/newProduct",icon : "safe" },
  ];
  currentAction : any;
  public isLoading : boolean=false;
constructor(public appStateService : AppStateService ,public loadingService :LoadingService) {
  // this.loadingService.isLoading$.subscribe({
  //   next : (value)=>{
  //     this.isLoading= value
  //   }
  // })
}
  setCurrentACtion(a: any) {
    this.currentAction = a;
  }
}
