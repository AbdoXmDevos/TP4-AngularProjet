import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {


  public productState: any = {
    products: [],
    keyword: "",
    totalPages: 0,
    pageSize: 3,
    currentPage: 1,
    totalProduct: 0,
    status: "",
    errorMessae: ""


  }
  constructor() {
  }
  public  setPorductState(state :any){
    // ... signifie que vous créez une copie de tous les attributs
    // bp : on va copie le state pour modifier les valeurs
    this.productState={...this.productState,...state}
  }
}
