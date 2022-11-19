//Introduccion a la pagina
alert("Bienvenidos a la web de Imperio Natural")

let nombre = prompt ("Ingrese su Nombre o presione 'f' para finalizar")
while(nombre != "f"|"F"){
    alert("Hola"+nombre);
}


function correr(){
    let producto = prompt("Por favor ingrese producto que desea comprar: Banana, Manzana, Naranaja, Mandarina.");
    
//Verificamos que ingrese una marca valida de nuestro comercio//
if(producto === "Banana"|"Manzana"|"Naranja"|"Mandarina"){
    console.log("Vendemos ese producto");
}else{
    alert("No trabajamos ese producto");
}} 

//Bucle o Ciclo    "for (i=1; i<10; i++)"

//le damos permiso que ingrese productos hasta ingresar "F" fin, formando asi el Array "Pedido".
const pedido1 = [];

do{
    let entrada = prompt("Ingresar otro producto o 'f' para finalizar");
    pedido1.push(entrada.tuUpperCase());
    console.log(listaPedido1.length);
}
while(producto != "F"|"f"){
    alert("Se ingreso"+ producto);
    for (producto=1; producto!= "f"|"F"; producto++)
    prompt("Ingresar otro producto o 'f' para finalizar");
    var newArray = pedido1 [producto];
};

//Recorrer el array de productos

for (let index = 0; index<5; index++ ){
    alert(pedido1 [index]);
}

//Eliminar productos de la lista
const eliminar = let(prompt("Detalle producto a eliminar"= productox)); {
    //ubicar el producto que quiera eliminar en el listado(Array)
    let index = pedido1.indexOf(productox);
    if (index != -1) {
        pedido1.splice (index, "");
    }
}
eliminar(productox)


document.addEventListener('DOMContentLoaded', () => {
// Definicion de Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Manzana',
        precio: 1,
        imagen: 'manzana.jpg'
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 1.5,
        imagen: 'cebolla.jpg'
    },
    {
        id: 3,
        nombre: 'Naranja',
        precio: 0.7,
        imagen: 'naranja.jpg'
    },
    {
        id: 4,
        nombre: 'Papa',
        precio: 1.2,
        imagen: 'papa.jpg'
    }

];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;


//  Dibuja todos los productos a partir de la base de datos.

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', agregarProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

//Agregar productos al carrito
function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coinciden las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del producto del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;


        // Boton para borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un producto del carrito
 */
function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

//Calcular precio total

function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

// Reset carrito
function resetCarrito() {
    carrito = [];
    renderizarCarrito();
    localStorage.clear();
}

//Declarmos funciones para almacenar en el localStorage
function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}
//Si es que ya habia un carrito guardado le agrego info
function cargarCarritoDeLocalStorage () {
    if (miLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();
})
