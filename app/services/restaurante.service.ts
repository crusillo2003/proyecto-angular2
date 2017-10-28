import {Injectable} from "angular2/core";
import {Http, Response, Headers,RequestOptions} from "angular2/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Restaurante} from "../model/Restaurante";

@Injectable()
export class RestauranteService{

	headers: Headers;
    options: RequestOptions;

     constructor(private _http: Http) {
          this.headers = new Headers({ 'Content-Type': 'application/json',
          							'Content-Type': 'application/x-www-form-urlencoded', 
          							'Content-Type': 'multipart/form-data',
          							'supported': 'text/plain',
                                    'Accept': 'q=0.8;application/json;q=0.9' });
          this.options = new RequestOptions({ headers: this.headers });
      }


	getRestaurantes():Promise<any>{
		return this._http.get("http://localhost/proyecto-angular/slim/api.php/restaurantes")
		     	.map(res => res.json());
	}

	getRestaurante(_id:string){
		console.log("Consultando res con id "+ _id);
		return this._http.get("http://localhost/proyecto-angular/slim/api.php/restaurantes/"+_id)
		     	.map(res => res.json());
	}

	addRestaurante(restaurante:<any>){
		let json = JSON.stringify(restaurante);
		console.log(json);
		let params = "json:" + json;
		//let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});	

		let headers = new Headers({ 'Content-Type': 'application/json'
          							//'Content-Type': 'application/x-www-form-urlencoded',
          							//'supported': 'text/plain',
                                    'Accept': 'q=0.8;application/json;q=0.9' 
          							//'Content-Type': 'multipart/form-data'
          							});	

		return this._http
			.post("http://localhost/proyecto-angular/slim/api.php/restaurantes",
			json,{headers,headers}).map((res:Response) => res.json());
	}

	updateRestaurante(restaurante:Restaurante):Observable {
		let body = JSON.stringify(restaurante);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});	

		return 	this._http
			.put("http://localhost/proyecto-angular/slim/api.php/restaurantes",
				body,this.params)
			.map(this.extractData);
			
		/*return this._http
			.put("http://localhost/proyecto-angular/slim/api.php/restaurantes",
				body,this.params).map((res:Response) => res.json());*/
	}

	deleteRestaurante(_id:string){
		let body = JSON.stringify(_id);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});		
		return this._http
			.delete("http://localhost/proyecto-angular/slim/api.php/restaurantes/"+_id,
				this.params).map((res:Response) => res.json());
	}

	private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}