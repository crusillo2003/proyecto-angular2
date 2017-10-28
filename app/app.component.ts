import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestaurantesListComponent}  from "./Components/restaurantes-list.component";
import {RestauranteDetailComponent} from "./Components/restaurante-detail.component";
import {RestauranteAddComponent} from "./Components/restaurante-add.component";
import {RestauranteEditComponent} from "./Components/restaurante-edit.component";



@Component({
	selector: "mi-app",
	templateUrl: "app/view/home.html",
	directives: [RestaurantesListComponent, ROUTER_DIRECTIVES],
	})	

@RouteConfig([
	{path:"/", name: "Home", component: RestaurantesListComponent, useAsDefault: true},
	{path:"/restaurante/:id", name: "Restaurante", component: RestauranteDetailComponent},
	{path:"/crear-restaurante", name: "CrearRestaurante", component: RestauranteAddComponent},
	{path:"/editar-restaurante/:id", name: "EditarRestaurante", component: RestauranteEditComponent}
	])
export class AppComponent{
	public titulo:string = "Restaurantes";
}