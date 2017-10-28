System.register(["angular2/core", "angular2/http", "rxjs/add/operator/map", "rxjs/Observable"], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var RestauranteService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            RestauranteService = (function () {
                function RestauranteService(_http) {
                    this._http = _http;
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'multipart/form-data',
                        'supported': 'text/plain',
                        'Accept': 'q=0.8;application/json;q=0.9' });
                    this.options = new http_1.RequestOptions({ headers: this.headers });
                }
                RestauranteService.prototype.getRestaurantes = function () {
                    return this._http.get("http://localhost/proyecto-angular/slim/api.php/restaurantes")
                        .map(function (res) { return res.json(); });
                };
                RestauranteService.prototype.getRestaurante = function (_id) {
                    console.log("Consultando res con id " + _id);
                    return this._http.get("http://localhost/proyecto-angular/slim/api.php/restaurantes/" + _id)
                        .map(function (res) { return res.json(); });
                };
                RestauranteService.prototype.addRestaurante = function (restaurante) {
                    var json = JSON.stringify(restaurante);
                    console.log(json);
                    var params = "json:" + json;
                    //let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});	
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json',
                        //'Content-Type': 'application/x-www-form-urlencoded',
                        //'supported': 'text/plain',
                        'Accept': 'q=0.8;application/json;q=0.9'
                    });
                    return this._http
                        .post("http://localhost/proyecto-angular/slim/api.php/restaurantes", json, { headers: headers, headers: headers }).map(function (res) { return res.json(); });
                };
                RestauranteService.prototype.updateRestaurante = function (restaurante) {
                    var body = JSON.stringify(restaurante);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                    return this._http
                        .put("http://localhost/proyecto-angular/slim/api.php/restaurantes", body, this.params)
                        .map(this.extractData);
                    /*return this._http
                        .put("http://localhost/proyecto-angular/slim/api.php/restaurantes",
                            body,this.params).map((res:Response) => res.json());*/
                };
                RestauranteService.prototype.deleteRestaurante = function (_id) {
                    var body = JSON.stringify(_id);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                    return this._http
                        .delete("http://localhost/proyecto-angular/slim/api.php/restaurantes/" + _id, this.params).map(function (res) { return res.json(); });
                };
                RestauranteService.prototype.extractData = function (res) {
                    var body = res.json();
                    return body || {};
                };
                RestauranteService.prototype.handleError = function (error) {
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg);
                    return Observable_1.Observable.throw(errMsg);
                };
                RestauranteService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RestauranteService);
                return RestauranteService;
            }());
            exports_1("RestauranteService", RestauranteService);
        }
    }
});
//# sourceMappingURL=restaurante.service.js.map