const productos = [];
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const regreso = document.getElementById("regresar");
const comprar = document.getElementById("comprar");
const formula = document.getElementById("formula");
const totalTotal = document.getElementById("total");
const sectorTienda = document.getElementById("productos");
const menorAMayor = document.getElementById("menorAMayor");
const borrarFiltros = document.getElementById("borrarFiltros");
//const buscador = document.getElementById("buscador");
const verCarrito = document.getElementById("verCarrito");
const yearActual = new Date().getFullYear();
const abonar = document.getElementById("abonar");

class Producto {
    constructor(nombre, precio, tipo, descripcion, img, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.img = img;
        this.id = id;
    }
}

productos.push(new Producto("arco iris waldorf", 3500, "encastres", "madera", " ", 1));
productos.push(new Producto("mini cuna", 4200, "deco", "madera", " ", 2));
productos.push(new Producto("herramientas", 2300, "varios", "madera", " ", 3));
productos.push(new Producto("pata pata", 5400, "plaza", "madera", " ", 4));
productos.push(new Producto("balancin", 6900, "deco", "madera", " ", 5));

function crearTarjetas() {
    for (const producto of productos) {
        let card = document.createElement("div.col");
        card.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text">$${producto.precio}</p>
          <button id="${producto.id}">Agregar al carrito</button>
        </div>
        <div class="card-footer">
            <small class="text-muted">${producto.tipo}</small>
        </div>
      </div>`
        sectorTienda.append(card);

        let addCarrito = document.getElementById(producto.id);
        addCarrito.addEventListener("click", () => {
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'En Carrito',
                showConfirmButton: false,
                timer: 900
            })
        });
    };
};

crearTarjetas();


menorAMayor.addEventListener("click", () => {
    sectorTienda.innerHTML = "";
    let filtro = [...productos].sort((a, b) => a.precio - b.precio);
    for (const filtrado of filtro) {
        let cardFiltrada = document.createElement("div.col");
        cardFiltrada.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text">$${producto.precio}</p>
          <button id="${producto.id}">Agregar al carrito</button>
        </div>
        <div class="card-footer">
            <small class="text-muted">${producto.tipo}</small>
        </div>
      </div>`
        sectorTienda.append(cardFiltrada);

        let addCarrito = document.getElementById(producto.id);
        addCarrito.addEventListener("cilck", () => {
            carrito.push(producto);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'En Carrito',
                showConfirmButton: false,
                timer: 900
            })
        });
    };
});

borrarFiltros.addEventListener("click", () => {
    sectorTienda.innerHTML = "";
    crearTarjetas();
});

verCarrito.addEventListener("click", () => {
    if (localStorage.length === 0) {
                sectorTienda.innerHTML = "<h2>no añadiste productos, AGREGA AHORA <h2>";
                comprar.classList = "d-none";
            }else{
                comprar.classList = "btn btn-primary btn-lg";
                sectorTienda.innerHTML = "";
                for (const item of carrito) {
                    let cardCarrito = document.createElement("div.col");
                    cardCarrito.innerHTML = `<div class="card" style="width: 18rem;">
                                        <img src="${item.img}" class="card-img-top" alt="${item.nombre}">
                                        <div class="card-body">
                                        <h5 class="card-title">${item.nombre}</h5>
                                        <p class="card-text">${item.descripcion}</p>
                                        <p class="card-text">$${item.precio}</p>
          
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted">${item.tipo}</small>
                                    </div>
                                </div>`
                    sectorTienda.append(cardCarrito);
                };
};

        menorAMayor.classList = "d-none"; borrarFiltros.classList = "d-none"; verCarrito.classList = "d-none";

        regreso.classList = "btn btn-primary btn-lg"; regreso.addEventListener("click", () => {
            menorAMayor.classList = "btn btn-primary btn-lg";
            borrarFiltros.classList = "btn btn-primary btn-lg";
            verCarrito.classList = "btn btn-primary btn-lg";
        regreso.classList = "d-none";
        comprar.classList = "d-none";

        sectorTienda.innerHTML = "";
        crearTarjetas();

        });
    });

    comprar.addEventListener("click", () => {
        let total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, 0);
        totalTotal.innerHTML = `Total: $${total}`;
    });



for (let i= 1; i <= 12; i++){
    let opcion = document.createElement("opcion");
    opcion.value = i;
    opcion.innerHTML = i;
    formula.seleccionMes.appendChild(opcion);

};

for (let i = yearActual; i < yearActual + 12; i++) {
    let opcion = document.createElement("opcion");
    opcion.value = i;
    opcion.innerHTML = i;
    formula.seleccionYear.appendChild(opcion);
};

formula.addEventListener("submit", (e) =>{
    let form = e.target;
    let nombre = form.children[0].value;
    let numTarjeta = form.children[1].value;
    let mes = form.children[2].value;
    let año = form.children[3].value;
    let clave = form.children[4].value;

    localStorage.removeItem("carrito");
    sectorTienda.innerHTML = "";
    carrito.splice(0, Infinity);
});

function cargarProductosDesdeLocalStorage(){
    let carritoLocalStorage = [];
    if (localStorage.length!=0){
        carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    }
    return carritoLocalStorage;
};
