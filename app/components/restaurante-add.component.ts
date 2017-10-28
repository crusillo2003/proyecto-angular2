import {Component, OnInit} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/Restaurante";

@Component({
	selector: "restaurante-add",
	templateUrl: "app/view/restaurante-add.html",
	providers: [RestauranteService]
	})

export class RestauranteAddComponent implements OnInit {
	public titulo = "Crear nuevo restaurante";
	public parametro;
	public restaurante:Restaurante;
	public ErrorMessage;
	public status;

	public filesToUpload: Array<File>;


	constructor(
		private _restauranteService: RestauranteService,
		private _routeParams: RouteParams,
		private _router: Router
	){}

	onSubmit(){
		
		this._restauranteService.addRestaurante(this.restaurante).subscribe(
				response => {
					
					this.status = response.status;
					console.log(response);

					if(this.status !== "success"){
						alert("Error en el servidor");
					}

				},
				error => {
					this.ErrorMessage = <any>error;
					console.log(this.ErrorMessage);
					if(this.ErrorMessage !== null){
						
						alert("Error en la peticion");
					}

				}

				
			);

			this._router.navigate(["Home"]);
	}

	ngOnInit() {
		this.restaurante = new Restaurante(
							0,
							this._routeParams.get("nombre")?this._routeParams.get("nombre"):"Nuevo Restaurante",
							this._routeParams.get("direccion")?this._routeParams.get("direccion"):"Nueva direccion",
							this._routeParams.get("imagen")?this._routeParams.get("imagen"):"imagen",
							this._routeParams.get("descripcion")?this._routeParams.get("descripcion"):"Nueva descripcion",							
							this._routeParams.get("precio")?this._routeParams.get("precio"):"bajo"
							);


		console.log("Componete RestauranteAdd cargadp")	;
	}

	callPrecio(value){
		this.restaurante.precio = value;
	}

	public resultUpload;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;

		this.makeFileRequest("http://localhost/proyecto-angular/slim/api.php/upload", [], this.filesToUpload).then((result) => {              
				
				this.resultUpload = result;
				this.restaurante.imagen = this.resultUpload.filename;
				console.log("imagen result: " + this.restaurante.imagen);
		}, (error) =>{
			console.log("Error al cargar imagen: " + error);
		});
		
	}


	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject) => {
				var formData: any = new FormData();
				var xhr = new XMLHttpRequest();

				for(var i = 0; i < files.length; i++){
					formData.append("uploads[]", files[i], files[i].name);
				}

				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4){
						if(xhr.status == 200){
							resolve(JSON.parse(xhr.response));
						}else{
							reject(xhr.response);
						}
					}
				}
				xhr.open("POST", url, true);
				xhr.send(formData);
			});
	}
}