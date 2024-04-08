import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrl: './app.component.css'
})
export class AppComponent {
  actions : Array<any> = [

    {title : "Home", "route":"/home",icon : "house" },
    {title : "product", "route":"/product",icon : "search" },
    {title : "newProduct", "route":"/newProduct",icon : "safe" },
  ];
  currentAction : any;


  setCurrentACtion(a: any) {
    this.currentAction = a;
  }
}
