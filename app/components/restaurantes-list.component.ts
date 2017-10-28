import {Component, OnInit} from "angular2/core";
import {Restaurante} from "../model/Restaurante";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";

@Component({
	selector: "restaurantes-list",
	templateUrl: "app/view/restaurantes-list.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [RestauranteService]
	})

export class RestaurantesListComponent implements OnInit {
	public titulo:string = "Listado de restaurantes:";
	public restaurantes: Restaurante[];
	public status: string;
	public errorMessage;
	public confirmado:string;

	constructor(private _restauranteService: RestauranteService){}

 	ngOnInit() {
 		this.getRestaurantes();
 		console.log("status on list rests: " + this.status);
 		console.log(this.restaurantes);
		console.log("restaurantes-list component cargado");
	}

	getRestaurantes(){
		let box_restaurantes = <HTMLElement>document.querySelector("#restaurantes-list .loading");
		box_restaurantes.style.visibility = "visible";
		this._restauranteService.getRestaurantes().subscribe(res => {
			this.restaurantes = res.data;
			console.log(res);
			this.status = res.status;
			box_restaurantes.style.display = "none";
			},
			error => {
				this.errorMessage = <any>error;
				if(this.errorMessage !== null){
					console.log(this.errorMessage);
					alert("Error en la peticion");
				}

			});	
		
	}

	onBorrarConfirm(_id:string){
		this.confirmado = _id;
	}

	onCancelarBorrado(){
		this.confirmado = null;
	}

	onBorrarRestaurante(_id:string){

		this._restauranteService.deleteRestaurante(_id).subscribe(
				response => {
					
					this.status = response.status;
					console.log(response);

					if(this.status !== "success"){
						//alert("Error en el servidor");
					}
					this.getRestaurantes();
				},
				error => {
					this.ErrorMessage = <any>error;
					console.log(this.ErrorMessage);
					if(this.ErrorMessage !== null){
						
						alert("Error en la peticion");
					}

				}
			);
	}
}