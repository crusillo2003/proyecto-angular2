import {Component, OnInit} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/Restaurante";

@Component({
	selector: "restaurante-edit",
	templateUrl: "app/view/restaurante-add.html",
	providers: [RestauranteService]
	})

export class RestauranteEditComponent implements OnInit {
	public titulo = "Editar restaurante";
	public restaurante: Restaurante;
	public errorMessage: string;
	public status: string;
	public filesToUpload: Array<File>;

	constructor(
		private _restauranteService: RestauranteService,
		private _routeParams: RouteParams,
		private _router: Router
	){}

	onSubmit(){

		this._restauranteService.updateRestaurante(this.restaurante).subscribe(
				response => {
					
					this.status = response.status;
					console.log(response);

					alert("Restaurant actualizado");
					console.log("Lanzando la priera listaen ipdate");
					this._router.navigate(["Home"]);

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

			console.log("Lanzando la segunda listaen ipdate");
			this._router.navigate(["Home"]);
			
	}

	ngOnInit() {
		this.restaurante = new Restaurante(
							parseInt(this._routeParams.get("id")),
							this._routeParams.get("nombre"),
							this._routeParams.get("direccion"),
							"null",
							this._routeParams.get("descripcion"),							
							this._routeParams.get("precio")
							);


		this.getRestaurante();
		console.log("Componete RestauranteEdit cargado")	;
	}

	getRestaurante(){
		let id = this._routeParams.get("id");
		this._restauranteService.getRestaurante(id).subscribe(res => {
			this.restaurante = res;	
			},
			error => {
				
				this.errorMessage = <any>error;
				if(this.errorMessage !== null){
					console.log(this.errorMessage);
					alert("Error en la peticion");
				}

			});
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