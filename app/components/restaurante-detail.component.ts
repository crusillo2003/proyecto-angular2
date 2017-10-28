import {Component, OnInit} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/Restaurante";

@Component({
	selector: "restaurante-detail",
	templateUrl: "app/view/restaurante-detail.html",
	providers: [RestauranteService]
	})

export class RestauranteDetailComponent implements OnInit {

	public parametro;
	public restaurante:Restaurante;
	public errorMessage:string;

	constructor(
		private _restauranteService: RestauranteService,
		private _routeParams: RouteParams,
		private _router: Router
	){}

	ngOnInit() {
		this.restaurante = new Restaurante(
							0,
							this._routeParams.get("nombre"),
							this._routeParams.get("direccion"),
							"null",
							this._routeParams.get("descripcion"),							
							"bajo"
							);
		this.parametro = this._routeParams.get("id");	
		this.getRestaurante();	
	}

	getRestaurante(){
		this._restauranteService.getRestaurante(this.parametro).subscribe(res => {
			
			this.restaurante = res;	
			console.log(this.restaurante);
			},
			error => {
				this._router.navigate(["Home"]);
				this.errorMessage = <any>error;
				/*if(this.errorMessage !== null){
					console.log(this.errorMessage);
					alert("Error en la peticion");
				}*/

			});
	}
}