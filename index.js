const productos = [];
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const botones = document.getElementById("botones");
const sectorTienda = document.getElementById("productos");
const menorAMayor = document.getElementById("menorAMayor");
const borrarFiltros = document.getElementById("borrarFiltros");
//const buscador = document.getElementById("buscador");
const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
};
const verCarrito = document.getElementById("verCarrito");

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
    });
    };
};

crearTarjetas ();

menorAMayor.addEventListener("click", () => {
    sectorTienda.innerHTML = "";
    let filtro = [...productos].sort((a,b) => a.precio - b.precio);
    for (const filtrado of filtro) {
        let cardFiltrada = document.createElement("div.col");
        cardFiltrada.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${filtrado.img}" class="card-img-top" alt="${filtrado.nombre}">
        <div class="card-body">
          <h5 class="card-title">${filtrado.nombre}</h5>
          <p class="card-text">${filtrado.descripcion}</p>
          <p class="card-text">$${filtrado.precio}</p>
          <button id="${filtrado.id}">Agregar al carrito</button>
        </div>
        <div class="card-footer">
            <small class="text-muted">${filtrado.tipo}</small>
        </div>
      </div>`
      sectorTienda.append(cardFiltrada);

      let addCarrito = document.getElementById(filtrado.id);
      addCarrito.addEventListener("cilck", () => {
        carrito.push(filtrado);
      });
    };
});

borrarFiltros.addEventListener("click", () => {
    sectorTienda.innerHTML = "";
    crearTarjetas()
});

verCarrito.addEventListener ("click", () => {
    sectorTienda.innerHTML = "";
    for (const item of carrito) {
        let cardCarrito = document.createElement("div.col");
        cardCarrito.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${item.img}" class="card-img-top" alt="${item.nombre}">
        <div class="card-body">
          <h5 class="card-title">${item.nombre}</h5>
          <p class="card-text">${item.descripcion}</p>
          <p class="card-text">$${item.precio}</p>
          <button id="${item.id}">Agregar al carrito</button>
        </div>
        <div class="card-footer">
            <small class="text-muted">${item.tipo}</small>
        </div>
      </div>`
      sectorTienda.append(cardCarrito);
    };
});

function cargarProductosDesdeLocalStorage(){
    let carritoLocalStorage = [];
    if (localStorage.length!=0){
        carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    }
    return carritoLocalStorage;
}
