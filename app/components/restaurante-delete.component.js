System.register(["angular2/core", "angular2/router", "../services/restaurante.service", "../model/Restaurante"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, restaurante_service_1, Restaurante_1;
    var RestauranteDeleteComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (restaurante_service_1_1) {
                restaurante_service_1 = restaurante_service_1_1;
            },
            function (Restaurante_1_1) {
                Restaurante_1 = Restaurante_1_1;
            }],
        execute: function() {
            RestauranteDeleteComponent = (function () {
                function RestauranteDeleteComponent(_restauranteService, _routeParams, _router) {
                    this._restauranteService = _restauranteService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.titulo = "Eliminar restaurante";
                }
                RestauranteDeleteComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this._restauranteService.deleteRestaurante(this.restaurante).subscribe(function (response) {
                        _this.status = response.status;
                        console.log(response);
                        if (_this.status !== "success") {
                            alert("Error en el servidor");
                        }
                    }, function (error) {
                        _this.ErrorMessage = error;
                        console.log(_this.ErrorMessage);
                        if (_this.ErrorMessage !== null) {
                            alert("Error en la peticion");
                        }
                    });
                    this._router.navigate(["Home"]);
                };
                RestauranteDeleteComponent.prototype.ngOnInit = function () {
                    this.restaurante = new Restaurante_1.Restaurante(parseInt(this._routeParams.get("id")), this._routeParams.get("nombre"), this._routeParams.get("direccion"), "null", this._routeParams.get("descripcion"), this._routeParams.get("precio"));
                    this.getRestaurante();
                    console.log("Componete RestauranteEdit cargado");
                };
                RestauranteDeleteComponent.prototype.callPrecio = function (value) {
                    this.restaurante.precio = value;
                };
                RestauranteDeleteComponent.prototype.getRestaurante = function () {
                    var _this = this;
                    var id = this._routeParams.get("id");
                    this._restauranteService.getRestaurante(id).subscribe(function (res) {
                        _this.restaurante = res;
                        console.log(_this.restaurante);
                    }, function (error) {
                        _this._router.navigate(["Home"]);
                        _this.errorMessage = error;
                        /*if(this.errorMessage !== null){
                            console.log(this.errorMessage);
                            alert("Error en la peticion");
                        }*/
                    });
                };
                RestauranteDeleteComponent = __decorate([
                    core_1.Component({
                        selector: "restaurante-delete",
                        templateUrl: "app/view/restaurantes-list.html",
                        providers: [restaurante_service_1.RestauranteService]
                    }), 
                    __metadata('design:paramtypes', [restaurante_service_1.RestauranteService, router_1.RouteParams, router_1.Router])
                ], RestauranteDeleteComponent);
                return RestauranteDeleteComponent;
            }());
            exports_1("RestauranteDeleteComponent", RestauranteDeleteComponent);
        }
    }
});
//# sourceMappingURL=restaurante-delete.component.js.map