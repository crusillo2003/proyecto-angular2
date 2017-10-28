System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Restaurante;
    return {
        setters:[],
        execute: function() {
            Restaurante = (function () {
                function Restaurante(id, nombre, direccion, imagen, descripcion, precio) {
                    this.id = id;
                    this.nombre = nombre;
                    this.direccion = direccion;
                    this.imagen = imagen;
                    this.descripcion = descripcion;
                    this.precio = precio;
                }
                return Restaurante;
            }());
            exports_1("Restaurante", Restaurante);
        }
    }
});
//# sourceMappingURL=Restaurante.js.map