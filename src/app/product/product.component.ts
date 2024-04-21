import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import { Router } from '@angular/router';
import {AppStateService} from "../services/app-state.service";


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
              private router : Router , public appStateService: AppStateService){

  }
  ngOnInit(): void {

  this.searchProducts();
  }
  searchProducts(){

      this.productService.searchProducts(
      this.appStateService.productState.keyword,
      this.appStateService.productState.currentPage,
      this.appStateService.productState.pageSize)
      .subscribe({
        next  : (resp) => {


          //this.appStateService.productState.products=resp.body as Product[];
          let products = resp.body as Product[];
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
         // this.appStateService.productState.totalProducts = totalProducts;
          //console.log(totalProducts)
          let totalPages =
          this.appStateService.productState.totalPages = Math.floor( totalProducts/ this.appStateService.productState.pageSize);
          console.log(this.totalPages);
          if(totalProducts % this.appStateService.productState.pageSize !=0){ // cad il ya le reste
           //   this.appStateService.productState.totalPages=this.appStateService.productState.totalPages+1;
            ++totalPages;
          }
          this.appStateService.setPorductState({
              products : products,
            totalProducts : totalProducts,
            totalPages : totalPages,
            // donc une fois les donneés sont charggés
            status : "LOADED"


            }

          )
        },
        error : err => {
          console.log(err)
          this.appStateService.setPorductState({
            status : "ERROR",
            errorMessae : err


          })
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

       //this.appStateService.productState.products = this.appStateService.productState.products.filter((p:any)=>p.id!=product.id);
            this.searchProducts();
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
    this.appStateService.productState.currentPage = page;
    this.searchProducts();
  }

  handleEdit(p: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${p.id}`)
  }

}
