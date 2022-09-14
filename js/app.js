const carrito = document.querySelector('#carrito'),
    contenedorCarrito = document.querySelector('#lista-carrito tbody'),
    vaciarCarritoBtn = document.querySelector('#vaciar-carrito'),
    listaCursos = document.querySelector('#lista-cursos'),
    titulo = document.querySelector("#encabezado");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agergas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Eliminar curso
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
    //deslizamiento Cursos En Linea
    window.addEventListener('scroll', deslizar)
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        LeerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    // console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(cursos => cursos.id !== cursoId);
    }
    carritoHTML();
}

// function vaciarCarrito(e) {
//     if (!e.target.classList.contains('vaciar-carrito')) {
//         articulosCarrito = [];
//         limpiarHTML();
//     }
// }

function LeerDatosCurso(curso) {
    // console.log(curso);
    const infoCurso = {
        imagen: curso.querySelector('.card img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    // console.log(existe);
    if (existe) {
        // console.log('existe');
        let cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                // curso.cantidad += 1;
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }
    else {
        // console.log(infoCurso);
        articulosCarrito = [...articulosCarrito, infoCurso];
        // console.log(articulosCarrito);
    }
    carritoHTML();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();
    // Recorre el carrito y general el HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        // console.log(curso);
        const {imagen, titulo, precio, cantidad, id} = curso
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100px'>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href='#' class='borrar-curso' data-id="${id}"> X </a>
            </td> 
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//Deslizamiento Cursos En Línea
function deslizar() {
//   const scrollPX = window.scrollY;
//   console.log(scrollPX);
    const ubicacion = titulo.getBoundingClientRect(); //para saber al ubicación
    // console.log(ubicacion);
    if (ubicacion.top < 300) {
        titulo.classList.add('desplazo-on');
    }
}