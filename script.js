//ELEMENTOS DEL HTML
let $cajaDePersonajes = document.getElementById('cajaDePersonajes');

//AUDIO
const audioElement = document.getElementById('rickAndMortyAudio');
window.onload = function() {
  audioElement.play();
};

//VARIABLES
let todosPersonajes = [];
let pagina = 1; 

//mostrar personajes en el html
function mostrarPersonajes (array) {
  $cajaDePersonajes.innerHTML = '';
  for(let i=0; i<array.length; i++){
    $cajaDePersonajes.innerHTML += `<div>
    <img src=${array[i].image}>
    <h2>${array[i].name}</h2>
    <p>Género: ${array[i].gender}</p>
    <p>Especie: ${array[i].species}</p>
  </div>`
  }

}

//FETCH
function funcionFetchPaginado (numerodepagina){
  fetch (`https://rickandmortyapi.com/api/character/?page=${numerodepagina}`)
  .then((data)=>{
    return data.json();
  })
  .then((data)=>{
     todosPersonajes = data.results;
     mostrarPersonajes(todosPersonajes); 
  });
}
funcionFetchPaginado (pagina)
//-----------------------------------------------------------------------
//FILTROS BOTONES (TODXS, MUJERES, HOMBRES, NO BINARIO, SIN INFORMACIÓN)
//1: Seleccionar botón (traer de html)
let $todxs = document.getElementById('todxs');
let $mujer = document.getElementById('mujer');
let $hombre = document.getElementById('hombre');
let $generoNoBinario = document.getElementById('generoNoBinario');
let $desconocido = document.getElementById('desconocido');

//2: Hacer la función (usar .filter)

//function filtrarTodosPersonajes (){
  
//  let resultado1 = mostrarPersonajes()
//  mostrarPersonajes(resultado1);
//  console.log(resultado1);
//}
//llamar array y mostrarlo
function filtrarMujeres (){
  let resultado2 = todosPersonajes.filter((personaje)=>{
    return personaje.gender === 'Female';
   })
  mostrarPersonajes(resultado2);
};
function filtrarHombres (){
  let resultado3 = todosPersonajes.filter((personaje)=>{
    return personaje.gender === 'Male';
   })
  mostrarPersonajes(resultado3);
};
function filtrarNoBinario (){
  let resultado4 = todosPersonajes.filter((personaje)=>{
    return personaje.gender === 'genderless';
   })
  mostrarPersonajes(resultado4);
};
function filtrarDesconocido (){
  let resultado5 = todosPersonajes.filter((personaje)=>{
    return personaje.gender === 'unknown';
   })
  mostrarPersonajes(resultado5);
};
//3: Hacer los eventos (click por parte del usuario)
//$todxs.addEventListener ('click', filtrarTodosPersonajes);
$mujer.addEventListener ('click', filtrarMujeres);
$hombre.addEventListener ('click', filtrarHombres);
$generoNoBinario.addEventListener ('click', filtrarNoBinario);
$desconocido.addEventListener ('click', filtrarDesconocido);
//--------------------------------------------------------------------
//BOTONES DEL PAGINADO
//1: Seleccionar botón (traer de html)
let $botonPaginaInicioB = document.getElementById('botonPaginaInicio');
let $botonAnteriorB = document.getElementById('botonAnterior');
let $botonSiguienteB = document.getElementById('botonSiguiente');
let $botonPaginaFinalB = document.getElementById('botonPaginaFinal');
//2: Hacer la función (usar variable pagina y condiciones if-else)
function funcionBotonPaginaInicio (){
  funcionFetchPaginado(1)
  pagina=1;
  if (pagina===1){
    $botonPaginaInicioB.disabled=true;
    $botonAnteriorB.disabled=true;
    $botonSiguienteB.disabled=false;
    $botonPaginaFinalB.disabled=false;
  }
};

function funcionBotonAnterior (){
  pagina--;
  if (pagina===1){
    $botonAnteriorB.disabled=true;
    $botonPaginaInicioB.disabled=true;
  }
  else if (pagina >1 && pagina<43){
    $botonSiguienteB.disabled=false;
    $botonPaginaFinalB.disabled=false;
    $botonAnteriorB.disabled=false;
    $botonPaginaInicioB.disabled=false;
  }
  funcionFetchPaginado(pagina);
};

function funcionBotonSiguiente (){
  pagina++;
  if (pagina===42){
    $botonSiguienteB.disabled=true;
    $botonPaginaFinalB.disabled=true;
  }else if (pagina > 1 && pagina < 42 ) {
    $botonSiguienteB.disabled=false;
    $botonPaginaFinalB.disabled=false;
    $botonAnteriorB.disabled=false;
    $botonPaginaInicioB.disabled=false;
  } 
  funcionFetchPaginado (pagina); 
}

function funcionBotonPaginaFinal (){
  funcionFetchPaginado(42)
  pagina=42;
  if (pagina===42){
    $botonPaginaFinalB.disabled=true;
    $botonSiguienteB.disabled=true;
    $botonAnteriorB.disabled=false;
    $botonPaginaInicioB.disabled=false;
  } 
  
};  

//3: Hacer los eventos (click por parte del usuario)
$botonPaginaInicioB.addEventListener ('click', funcionBotonPaginaInicio);
$botonAnteriorB.addEventListener ('click', funcionBotonAnterior);
$botonSiguienteB.addEventListener ('click', funcionBotonSiguiente);
$botonPaginaFinalB.addEventListener ('click', funcionBotonPaginaFinal);
