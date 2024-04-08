import {Component, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {RouterModule} from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  // ! : càd ignorer l'initialisation

  // par convention on ajoute $ pour les variables de types observables
  //products$! : Observable<Array<Product>> ;

  public products : Array<Product>=[] ;
  public keyword: string ="";
  totalPages:number=0;
  pageSize: number=3;
  currentPage : number = 1;
  constructor(private productService :ProductService ,
              private router : Router) {


  }
  ngOnInit(): void {

  this.searchProducts();
  }
  searchProducts(){

    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize)
      .subscribe({
        next  : (resp) => {
          this.products=resp.body as Product[];
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
          //console.log(totalProducts)
          this.totalPages = Math.floor( totalProducts/ this.pageSize);
          console.log(this.totalPages);
          if(totalProducts % this.pageSize !=0){ // cad il ya le reste
              this.totalPages=this.totalPages+1;
          }
        },
        error : err => {
          console.log(err)
        }
      })
    //this.products$ = this.productService.getProduct(); // on peut ajouter .pipe() pour les erreurs
  }

  handleCheckProduct(p: Product) {
    //
    this.productService.checkProduct(p).subscribe({
      next : updatedProduct => {
        p.checked =! p.checked;
        //this.getProduct()
      }

    })

  }


  handleDelete(product: Product) {
    if(confirm("Sure u wanna delete"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProduct();
        // pour supprimer au niveau de frontend

        this.products = this.products.filter(p=>p.id!=product.id);
      }

    })
  }
  // searchProducts(){
  //   this.currentPage = 1;
  //   this.totalPages = 0;
  //     this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
  //       next : value => {
  //         this.products=value;
  //       },
  //       error: err => {
  //         console.error('Error fetching products:', err);
  //         // Gérer l'erreur ici, par exemple afficher un message d'erreur à l'utilisateur
  //       }
  //     })
  // }

  handleGotoPage(page: number) {
    this.currentPage = page;
    this.searchProducts();
  }

  handleEdit(p: Product) {
    this.router.navigateByUrl(`/editProduct/${p.id}`)
  }
}
