const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){

  //Cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

  //Mostrar os cursos do localStorage
  document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
  })

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML();
    // console.log(e.target.classList)
  });
}


// Funciones
function agregarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement
    leerDatosCurso(cursoSeleccionado)
  }
}

//Elimina un curso del carrito
function eliminarCurso(e){
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');

    //Elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

    carritoHTML(); //Iterar sobre el carrito y mostrar su HTML

  }
}

// Leer informacion del curso seleccionado y extrae su información
function leerDatosCurso(curso){

  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }


  //Verificar si el curso ya existe
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
  if(existe){
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map( curso => {
      if(curso.id === infoCurso.id){
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agrega elementos al arreglo de carritos
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();

}

//Muestra el carrito de compras en el HTML
function carritoHTML(){

  //limpiar el HTML
  limpiarHTML();

  //Recorre el carrito el genera el HTML
  articulosCarrito.forEach(curso => {

    const { imagen, titulo, precio, cantidad, id } = curso
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${imagen}" width = 100>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class= "borrar-curso" data-id=${id}> X </a></td>
    `;

    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);

  });

  //Adicionar o carrinho de compras ao Storage
  sincronizarStorage();
  
}

function sincronizarStorage(){
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//Elimina los curso del tbody
function limpiarHTML(){
  //forma lenta
  contenedorCarrito.innerHTML = '';

  //forma rápida
  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}