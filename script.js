// script.js

// Datos iniciales
// Array inicial de sillas
const sillas = Array(6).fill(null).map(() => ({
  nombre: "",
  especialidad: "",
  edad: 0,
  bata: "",
  enfermedad: "",
  guardias: 0,
  salario: "",
  hospital: ""
}));
  
  // Pistas
  const pistas = [
    "Teresa se sienta en la tercera silla y no es cardióloga",
  "Los médicos sentados contiguamente (inmediatamente anterior o posterior) se llevan entre ellos como máximo 25 años y como mínimo 5",
  "Pepe se sienta en la silla inmediatamente anterior a la silla en la que se sienta el médico que lleva la bata gris",
  "El médico que se sienta en la cuarta silla no trata la próstata y hace menos guardias que el médico que trata el desarrollo del crecimiento, pero más que Jesús",
  "El médico de la bata negra se sienta en la silla inmediatamente posterior de la silla en la que se sienta el urólogo",
  "Fernando gana 72 mil € y hace 2 guardias más que María",
  "El pediatra se sienta en una de las sillas de los extremos y lleva bata gris",
  "María tiene 65 años y se sienta al lado del médico con la bata azul",
  "El médico que hace una guardia semanal trabaja en el Príncipe de Asturias",
  "El médico de bata azul se sienta entre el cardiólogo (ind. ant.) y el médico que gana 55 mil € (ind. post.)",
  "El médico que trabaja en el hospital el Niño Jesús hace 4 guardias semanales",
  "El psiquiatra se sienta entre el médico de bata verde (ind. anterior) y el médico que trabaja en el hospital Gómez Ulla (ind. posterior)",
  "Naira trata la arritmia y se sienta inmediatamente anterior del médico con salario de 70 mil €",
  "Quien se sienta en la primera silla trabaja en el hospital Quirón",
  "Teresa lleva bata blanca y tiene 5 años menos que el nefrólogo, que se sienta en una de las sillas anteriores",
  "El médico que hace 2 guardias semanales tiene un salario de 15 mil €",
  "El dermatólogo tiene 50 años",
  "El médico de 60 años se sienta inmediatamente después del médico con la bata blanca",
  "El médico del Gómez Ulla se sienta entre el médico con bata rosa (inmediatamente anterior) y el médico con salario de 60 mil € (inmediatamente posterior)",
  "El médico que trabaja en el 12 de Octubre se sienta inmediatamente antes del médico que lleva bata blanca",
  "Jesús hace 3 guardias y se sienta inmediatamente inmediatamente antes del médico que trata la paranoia",
  "Hay una única persona que gana el mismo número de miles de euros € (salario) que la edad que tiene",
  "Cada valor solo puede aparecer una vez en una única silla (x.e. solo una persona se puede llamar Naira)",
  "Todos los valores deben estar completos para que se soluciene el puzzle"
  ];
  
  // Función para renderizar la tabla
  function renderTabla() {
    const tbody = document.querySelector("#tabla-matrices tbody");
    tbody.innerHTML = ""; // Limpiar tabla
    sillas.forEach((silla, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${crearSelect("nombre", index)}</td>
        <td>${crearSelect("especialidad", index)}</td>
        <td>${crearSelect("edad", index)}</td>
        <td>${crearSelect("bata", index)}</td>
        <td>${crearSelect("enfermedad", index)}</td>
        <td>${crearSelect("guardias", index)}</td>
        <td>${crearSelect("salario", index)}</td>
        <td>${crearSelect("hospital", index)}</td>
      `;
      tbody.appendChild(fila);
    });
  }
  
  // Crear select dinámico
  function crearSelect(variable, index) {
    const opciones = obtenerOpciones(variable);
    const select = `<select onchange="actualizarSilla(${index}, '${variable}', this.value)">
      <option value=""> </option>
      ${opciones.map(op => `<option value="${op}">${op}</option>`).join("")}
    </select>`;
    return select;
  }
  

// Obtener opciones para cada variable (debe personalizarse según los datos disponibles)
function obtenerOpciones(variable) {
  const opciones = {
    nombre: ["Pepe", "Jesús", "Fernando", "María", "Naira", "Teresa"],
    bata: ["Gris", "Negra", "Azul", "Blanca", "Verde", "Rosa"],
    enfermedad: ["Crecimiento", "Próstata", "Arritmia", "Paranoia", "Nefritis", "Psoriasis"],
    especialidad: ["Urólogo", "Pediatra", "Psiquiatra", "Nefrólogo", "Dermatólogo", "Cardiólogo"],
    hospital: ["Príncipe de Asturias", "Quirón", "12 de Octubre", "Niño Jesús", "Gómez Ulla", "HM"],
    salario: ["15 mil €", "48 mil €", "55 mil €", "60 mil €", "70 mil €", "72 mil €"],
    edad: [35, 40, 50, 55, 60, 65],
    guardias: [1, 2, 3, 4, 5, 7]
  };
  return opciones[variable] || [];
}

// Actualizar datos de silla
function actualizarSilla(index, variable, valor) {
  if (sillas[index]) {
    //console.log(`Actualizando silla ${index + 1} con ${variable} = ${valor}`);
    // Actualiza la variable específica de la silla
    sillas[index][variable] = isNaN(valor) ? valor : parseInt(valor, 10); // Convertir a número si aplica
    mostrarConsultas(); // Refresca las consultas después de actualizar

    console.log(`¿Está completa?: ${verificarCompleta()}`);
    if(verificarCompleta())
    {
      console.log(`sí`);
      mostrarSolucion();
    }
  }
}

  //Mostrar pistas
  function mostrarConsultas()
  {
    const listaIzquierda = document.getElementById('lista-consultas-izquierda');
    const listaDerecha = document.getElementById('lista-consultas-derecha');
    const listaCentro = document.getElementById('lista-consultas-centro');


    listaDerecha.innerHTML = ""; //Limpiar lista de consultas
    listaIzquierda.innerHTML = "";
    listaCentro.innerHTML = "";

    pistas.forEach((pista, index) => {
        const li = document.createElement("li");
        li.className = "consulta";

        //Evaluar consulta
        const resultado = evaluarPista(index);
        //console.log(`Evaluando pista ${index} con resultado ${resultado}`); // Debug
        if(resultado === null){
          li.classList.add("normal");
          li.innerHTML = `${pista}`;
        }
        else if(resultado)
        {
            li.classList.add("correcto");
            li.innerHTML = `<span>✅</span> ${pista}`;
        } else {
        li.classList.add("incorrecto");
        li.innerHTML = `<span>❌</span> ${pista}`;
        }

        //Distribuir en 3 columnas
        if(index % 3 === 0)
        {
          listaIzquierda.appendChild(li);
        }
        else if(index % 3 === 1)
        {
          listaCentro.appendChild(li);
        }
        else
        {
          listaDerecha.appendChild(li);
        }
    })
  }
  
  // Validar pistas
  function mostrarSolucion() {
    console.log(`Todas correctas: ${todasLasPistasCumplen()}`);
    if (todasLasPistasCumplen() === true) {
      //document.getElementById("mensaje").textContent = "¡Solución correcta! Serás redirigida al mapa en 10 segundos";
      alert('Solución Correcta!!!');

    } else {
      alert('Error. Vuelve a intentar');

    }
  }

  function verificarCompleta()
  {
    return sillas.every(silla => 
      Object.values(silla).every(valor => valor !== "" && valor !== null)
    );
  }
  
  // Validar si todas las pistas se cumplen
  function todasLasPistasCumplen() {
    let resultado = null;
    if(validarPista1() === true && validarPista2() === true && validarPista3() === true &&
      validarPista4() === true && validarPista5() === true && validarPista6() === true &&
      validarPista7() === true && validarPista8() === true && validarPista9() === true &&
      validarPista10() === true && validarPista11() === true && validarPista12() === true &&
      validarPista13() === true && validarPista14() === true && validarPista15() === true &&
      validarPista16() === true && validarPista17() === true && validarPista18() === true &&
      validarPista19() === true && validarPista20() === true && validarPista21() === true &&
      validarPista22() === true && validarPista0() === true && validarPista23() === true)
    {
      resultado = true;
    }
    else
    {
      resultado = false;
    }

    return resultado;
        
  }
  
  //Evaluar cada pista (simplificado)
  function evaluarPista(pista) {
    try{
      let resultado = null;
      switch (pista){
        case 0: resultado = validarPista1();
        break;
        case 1: resultado = validarPista2();
        break;
        case 2: resultado = validarPista3();
        break;
        case 3: resultado = validarPista4();
        break;
        case 4: resultado = validarPista5();
        break;
        case 5: resultado = validarPista6();
        break;
        case 6: resultado = validarPista7();
        break;
        case 7: resultado = validarPista8();
        break;
        case 8: resultado = validarPista9();
        break;
        case 9: resultado = validarPista10();
        break;        
        case 10: resultado = validarPista11();
        break;
        case 11: resultado = validarPista12();
        break;
        case 12: resultado = validarPista13();
        break;
        case 13: resultado = validarPista14();
        break;
        case 14: resultado = validarPista15();
        break;
        case 15: resultado = validarPista16();
        break;
        case 16: resultado = validarPista17();
        break;
        case 17: resultado = validarPista18();
        break;
        case 18: resultado = validarPista19();
        break;
        case 19: resultado = validarPista20();
        break;
        case 20: resultado = validarPista21();
        break;
        case 21: resultado = validarPista22();
        break;
        case 22: resultado = validarPista0();
        break;
        case 23: resultado = validarPista23();
        break;
        default: resultado = false;
      }
      
      return resultado;
    } catch(e){
      console.error(`Error al evaluar pista ${pista + 1}: `, e);
      return null;
    }
  }



  // Inicializar
  document.addEventListener("DOMContentLoaded", () =>{
    renderTabla();
    mostrarConsultas();

    const goToRulesButton = document.getElementById('reglas-button');
    if (goToRulesButton) {
      goToRulesButton.addEventListener('click', function () {
        window.location.href = 'reglas.html';
      });
    }

    const vaciar = document.getElementById('repeat-button');
    if (vaciar) {
      vaciar.addEventListener('click', function () {
        window.location.href = 'index.html';
      });
    } 
  })

  /*
  if(X >= 0 && y >= 0 && z >= 0)
    {

    }
    else
    {
        if(x>=0)
        {
            if(y>=0)
            {
                //x y 
            }
            else
            {
                if(z>=0)
                {
                    //x z
                }
                else
                {
                    //x
                }
            }
        }
        else
        {
            if(y>=0)
            {
                if(z>=0)
                {
                    //y z
                }
                else
                {
                    //y
                }
            }
            else
            {
                if(z>=0)
                {
                    //z
                }
            }
        }
    }
  */




  /*
  //Evaluación de todas las pistas
  // Validar pista 1
function validarPista1() {
  let resultado = null;
  const silla3 = sillas[2]; // Tercera silla (índice 2)
  //console.log(`Silla 3 nombre ${silla3.nombre}, especialidad ${silla3.especialidad}`);
  if(silla3)
  {
    if(silla3.especialidad)
    {
      if(silla3.especialidad === "Cardiólogo")
      {
        resultado = false;
      }
      else if(silla3.nombre)
      {
        if(silla3.nombre === "Teresa")
        {
          resultado = true;
        }
        else{
          resultado = false;
        }
      }
    }
    if(silla3.nombre)
    {
      if(silla3.nombre !== "Teresa")
      {
        resultado = false;
      }
    }
  }

  if(isTeresa() >= 0)
  {
    if(isTeresa() !== 2)
    {
      resultado = false;
    }
  }
  return resultado;
}

// Validar pista 2
function validarPista2() {
  let resultado = null;
  for (let i = 0; i < 6; i++) {
      const silla1 = sillas[i];
      const silla2 = sillas[i + 1];
      
      if (silla1 && silla2 && silla1.edad >0 && silla2.edad >0) {
          const diferencia = silla1.edad - silla2.edad;
          if (Math.abs(diferencia) > 25) {
              resultado = false;
              i = 6;
          } else {
              resultado = true;
          }
      } else if (!silla1 || !silla2 || silla1.edad == null || silla2.edad == null) {
          resultado = null;
      }
  }
  return resultado;
}

function isPepe()
{
  let res = -1;
  for(let i = 0; i<6; i++)
  {
    if(sillas[i].nombre === "Pepe")
    {
      res = i;
    }
  }
  return res;
}

function isGris()
{
  let res = -1;
  for(let i = 0; i<6; i++)
  {
    if(sillas[i].bata === "Gris")
    {
      res = i;
    }
  }
  return res;
}

// Validar pista 3
function validarPista3() {
  let resultado = null;
  
  for (let i = 0; i < 6; i++) {
    //console.log(`Silla ${i + 1} es de ${sillas[i].nombre} con bata ${sillas[i].bata}`);
      if(sillas[i] && sillas[i+1])
      {
        if(sillas[i].nombre && sillas[i+1].bata)
        {
          if(sillas[i].nombre === "Pepe" && sillas[i+1].bata === "Gris")
          {
            resultado = true;
          }
        }
        else if(sillas[i].bata && sillas[i+1].nombre)
        {
          if(sillas[i+1].nombre === "Pepe" && sillas[i].bata === "Gris")
            {
              resultado = false;
            }
        }
        else if(sillas[i].nombre && sillas[i].bata)
        {
          if(sillas[i].nombre === "Pepe" && sillas[i].bata === "Gris")
             {
              resultado = false;
            }
          }
      }
  }
  if(sillas[5].nombre)
  {
    if(sillas[5].nombre === "Pepe")
      {
        resultado = false;
      }
  }

  if(sillas[0].bata)
  {
    if(sillas[0].bata === "Gris")
    {
      resultado = false;
    }
  }

  if(isGris() >= 0 && isPepe() >= 0)
  {
    if(isGris() - isPepe() !== 1)
    {
      resultado = false;
    }
  }

  return resultado;
}

function isProstata()
{
  let res = -1;
  for(let i = 0; i < 6; i++)
  {
    if(sillas[i].enfermedad === "Próstata")
    {
      res = i;
    }
  }
  return res;
}

function isCrecimiento()
{
  let res = -1;
  for(let i = 0; i < 6; i++)
  {
    if(sillas[i].enfermedad === "Crecimiento")
    {
      res = i;
    }
  }
  return res;
}

// Validar pista 4
function validarPista4() {
  let resultado = null;
  s4 = sillas[3];

  if(s4.enfermedad === "Próstata" || s4.enfermedad === "Crecimiento" || s4.nombre === "Jesús" || s4.guardias === 1 || s4.guardias === 7)
  {
    console.log(`1`);
    resultado = false;
  }
  else
  {
    if(s4.guardias)
    {
      if(isCrecimiento() >= 0 && isJesus() >= 0)
        {
          let sCrec = sillas[isCrecimiento()];
          let sJes = sillas[isJesus()];

          if(sCrec.guardias && sJes.guardias)
          {
            if(sCrec.guardias > s4. guardias
              && sJes.guardias < s4.guardias)
            {
              if(s4.enfermedad)
              {
                if(s4.enfermedad !== "Próstata")
                {
                  resultado = true;
                }
              }
            }
            else
            {
              resultado = false;
            }
          }
          else if(sCrec.guardias)
          {
            if(sCrec.guardias < s4.guardias)
            {
              resultado = false;
            }
          }
          else if(sJes.guardias)
          {
            if(sJes.guardias > s4.guardias)
              {
                resultado = false;
              }
          }
        }
        else if (isCrecimiento() >= 0)
        {
          let sCrec = sillas[isCrecimiento()];
          
          if(sCrec.guardias)
            {
              if(sCrec.guardias < s4.guardias)
              {
                resultado = false;
              }
            }
        }
        else if(isJesus() >= 0)
        {
          let sJes = sillas[isJesus()];
          if(sJes.guardias)
            {
              if(sJes.guardias > s4.guardias)
                {
                  resultado = false;
                }
            }
        }
    }
  }

  return resultado;
}

function isNegra()
{
  let res = -1;
  for (let i = 0; i < 6; i++)
  {
    if(sillas[i].bata === "Negra")
    {
      res = i;
    }
  }
  return res;
}

function isUrologo()
{
  let res = -1;
  for (let i = 0; i < 6; i++)
  {
    if(sillas[i].especialidad === "Urólogo")
    {
      res = i;
    }
  }
  return res;
}

// Validar pista 5
function validarPista5() {
  let resultado = null;
  
  if(isUrologo() >= 0 && isNegra() >= 0)
  {
    console.log(`Negra: ${isNegra()}, urólogo: ${isUrologo()}`);
    if(isUrologo() < 5 && isNegra() > 0)
    {
      if(isNegra() - isUrologo() !== 1)
      {
        resultado = false;
      }
      else
      {
        resultado = true;
      }
    }
    else{
      resultado = false;
    }
  }
  else if(isUrologo() >= 0)
  {
    if(isUrologo() === 5)
    {
      resultado = false;
    }
  }
  else if(isNegra() >= 0)
  {
    if(isNegra() === 0)
    {
      resultado = false;
    }
  }

  return resultado;
}

function isFernando()
{
  let res = -1;
  for(let i = 0; i<6; i++)
  {
    if(sillas[i].nombre === "Fernando")
    {
      res = i;
    }
  }
  return res;
}

function issalario72()
{
  let res = -1;
  for(let i = 0; i<6; i++)
  {
    if(sillas[i].salario === "72 mil €")
    {
      res = i;
    }
  }
  return res;
}

function isMaria()
{
  let r = -1;
  for(let i = 0; i < 6; i++)
  {
    if(sillas[i].nombre === "María")
    {
      r= i;
    }
  }
  return r;
}

// Validar Pista 6
function validarPista6() {
  let resultado = null;
  
  if(isFernando() >= 0 && issalario72() >= 0 && isMaria() >= 0)
  {
    let fer = sillas[isFernando()];
    let mar = sillas[isMaria()];
    let sal72 = sillas[issalario72()];

    if((fer.guardias || sal72.guardias) && mar.guardias)
    {
      if(sal72 === fer && sal72 !== mar)
      {
        if(fer.guardias)
        {
          if(fer.guardias - mar.guardias !== 2)
          {
            //console.log(`1`);
            resultado = false;
          }
          else
          {
            //console.log(`2`);
            resultado = true;
          }
        }
        else if(sal72.guardias)
        {
          if(sal72.guardias - mar.guardias === 2)
            {
              //console.log(`3`);
              resultado = true;
            }
            else
            {
              //console.log(`4`);
              resultado = false;
            }
        }
      }
      else
      {
        //console.log(`5`);
        resultado = false;
      }
      
    }
    if(fer.guardias)
    {
      if(fer.guardias < 3)
      {
        //console.log(`6`);
        resultado = false;
      }
    }
    if(sal72.guardias)
    {
      if(sal72.guardias < 3)
      {
        //console.log(`7`);
        resultado = false;
      }
    }
    if(mar.guardias)
    {
      if(mar.guardias > 5)
      {
        //console.log(`8`);
        resultado = false;
      }
    }

  }
  else if(isFernando() >= 0 && issalario72() >= 0)
  {
    let fer = sillas[isFernando()];
    let sal72 = sillas[issalario72()];

    if(sal72 !== fer)
    {
      //console.log(`9`);
      resultado = false;
    }
    
    if(fer.guardias)
    {
      if(fer.guardias < 3)
      {
        //console.log(`10`);
        resultado = false;
      }
    }
    if(sal72.guardias)
    {
      if(sal72.guardias < 3)
      {
        //console.log(`11`);
        resultado = false;
      }
    }
    
  }
  else if(isFernando() >= 0 && isMaria() >= 0)
  {
    let fer = sillas[isFernando()];
    let mar = sillas[isMaria()];

    if(fer.salario)
    {
      if(fer.salario !== "72 mil €")
      {
        //console.log(`12`);
        resultado = false;
      }
    }

    if(fer.guardias && mar.guardias)
    {
      //console.log(`fer guardias: ${fer.guardias}, mar guardias: ${mar.guardias}`);
      if(fer !== mar)
      {
        if(fer.guardias)
        {
          if(fer.guardias - mar.guardias !== 2)
          {
            //console.log(`13`);
            resultado = false;
          }
        }
        
      }
      else
      {
        //console.log(`14`);
        resultado = false;
      }
      
    }
    if(fer.guardias)
    {
      if(fer.guardias < 3)
      {
        //console.log(`15`);
        resultado = false;
      }
    }
    
    if(mar.guardias)
    {
      if(mar.guardias > 5)
      {
        //console.log(`16`);
        resultado = false;
      }
    }
  }
  else if (issalario72() >= 0 && isMaria() >= 0)
  {
    let mar = sillas[isMaria()];
    let sal72 = sillas[issalario72()];

    if(sal72.guardias && mar.guardias)
    {
      if(sal72 !== mar)
      {
        if(sal72.guardias)
        {
          if(sal72.guardias - mar.guardias !== 2)
            {
              //console.log(`17`);
              resultado = false;
            }
        }
      }
      else
      {
        //console.log(`18`);
        resultado = false;
      }
      
    }
    if(sal72.nombre)
      {
        if(sal72.nombre !== "Fernando")
        {
          //console.log(`19`);
          resultado = false;
        }
      }

    if(sal72.guardias)
    {
      if(sal72.guardias < 3)
      {
        //console.log(`20`);
        resultado = false;
      }
    }
    if(mar.guardias)
    {
      if(mar.guardias > 5)
      {
        //console.log(`21`);
        resultado = false;
      }
    }
  }
  else if(isFernando() >= 0)
  {
    let fer = sillas[isFernando()];
    
    if(fer.salario)
      {
        if(fer.salario !== "72 mil €")
        {
          //console.log(`22`);
          resultado = false;
        }
      }

    if(fer.guardias)
    {
      if(fer.guardias < 3)
      {
        //console.log(`23`);
        resultado = false;
      }
    }
  }
  else if(issalario72() >= 0)
  {
    let sal72 = sillas[issalario72()];

    if(sal72.guardias)
    {
      if(sal72.guardias < 3)
      {
        //console.log(`24`);
        resultado = false;
      }
    }
    if(sal72.nombre)
      {
        if(sal72.nombre !== "Fernando")
        {
          //console.log(`25`);
          resultado = false;
        }
      }
  }
  else if(isMaria() >= 0)
  {
    let mar = sillas[isMaria()];
    if(mar.guardias)
    {
      if(mar.guardias > 5)
      {
        //console.log(`26`);
        resultado = false;
      }
    }
  }

  return resultado;
}

function isPediatra()
{
  let res = -1;
  for(let i = 0; i < 6; i++)
  {
    if(sillas[i].especialidad === "Pediatra")
    {
      res = i;
    }
  }
  return res;
}

// Validar Pista 7
function validarPista7() {
  let resultado = null;

  s1 = sillas[0];
  s6 = sillas[5];

  if(s1.especialidad && s6.especialidad)
  {
    if(s1.especialidad !== "Pediatra" && s6.especialidad !== "Pediatra")
    {
      resultado = false;
    }
  }

  if(s1.bata && s6.bata)
    {
      if(s1.bata !== "Gris" && s6.bata !== "Gris")
      {
        resultado = false;
      }
    }

  if(isPediatra() >= 0 && isGris() >= 0)
  {
    if(isPediatra() === isGris()
      && (isPediatra() === 0 || isPediatra() === 5))
    {
      resultado = true;
    }
    else
    {
      resultado = false;
    }

  }
  else if(isPediatra() >= 0)
  {
    if(sillas[isPediatra()].bata)
      {
        if(sillas[isPediatra()].bata !== "Gris")
        {
          resultado = false;
        }
      }
    if(isPediatra() !== 0 && isPediatra() !== 5)
    {
      resultado = false;
    }
  }
  else if(isGris() >= 0)
  {
    if(sillas[isGris()].especialidad)
    {
      if(sillas[isGris()].especialidad !== "Pediatra")
      {
        resultado = false;
      }
    }
    if(isGris() !== 0 && isGris() !== 5)
      {
        resultado = false;
      }
  }
  

  return resultado;
}

function is65()
{
  let r = -1;
  for(let i = 0; i < 6; i++)
  {
    if(sillas[i].edad === 65)
    {
      r= i;
    }
  }
  return r;
}

function isAzul()
{
  let r = -1;
  for(let i = 0; i < 6; i++)
  {
    if(sillas[i].bata === "Azul")
    {
      r= i;
    }
  }
  return r;
}

// Validar Pista 8
function validarPista8() {
  let resultado = null;
  
  if(isMaria() >= 0 && is65() >= 0 && isAzul() >= 0)
  {
    if(isMaria() === is65() && isMaria() !== isAzul())
    {
      if(Math.abs(isAzul() - isMaria() === 1))
      {
        resultado = true;
      }
      else{
        resultado = false;
      }
    }
    else{
      resultado = false;
    }
  }
  else if(isMaria() >= 0 && is65() >= 0)
  {
    if(isMaria() !== is65())
    {
      resultado = false;
    }
  }
  else if(isMaria() && isAzul() >= 0)
  {
    if(isMaria() !== isAzul())
      {
        if(Math.abs(isAzul() - isMaria() !== 1))
        {
          resultado = false;
        }
      }
      else{
        resultado = false;
      }
  }
  else if(is65() >= 0 && isAzul() >= 0)
  {
    if(is65() !== isAzul())
      {
        if(Math.abs(isAzul() - is65() !== 1))
        {
          resultado = false;
        }
      }
      else{
        resultado = false;
      }
  }
  else if(isMaria() >= 0)
  {
    let sm = sillas[isMaria()];

    if(sm.edad)
    {
      if(sm.edad !== 65)
      {
        resultado = false;
      }
    }

    if(isMaria() === 0 )
    {
      if(sillas[isMaria() + 1].bata)
      {
        if(sillas[isMaria() + 1].bata !== "Azul")
        {
          resultado = false;
        }
      }
    }
    else if(isMaria() === 5)
    {
      if(sillas[isMaria() - 1].bata)
      {
        if(sillas[isMaria() - 1].bata !== "Azul")
        {
          resultado = false;
        }
      }
    }
    else
    {
      if(sillas[isMaria() + 1].bata
    && sillas[isMaria() -1].bata)
    {
      if(sillas[isMaria() + 1].bata !== "Azul" &&
      sillas[isMaria() - 1].bata !== "Azul")
      {
        resultado = false;
      }
    }
    }
  }
  else if(is65()>= 0)
  {
    let sm = sillas[is65()];

    if(sm.nombre)
    {
      if(sm.nombre !== "María")
      {
        resultado = false;
      }
    }

    if(is65() === 0 )
      {
        if(sillas[is65() + 1].bata)
        {
          if(sillas[is65() + 1].bata !== "Azul")
          {
            resultado = false;
          }
        }
      }
      else if(is65() === 5)
      {
        if(sillas[is65() - 1].bata)
        {
          if(sillas[is65() - 1].bata !== "Azul")
          {
            resultado = false;
          }
        }
      }
      else
      {
        if(sillas[is65() + 1].bata
      && sillas[is65() -1].bata)
        {
          if(sillas[is65() + 1].bata !== "Azul" &&
          sillas[is65() - 1].bata !== "Azul")
          {
            resultado = false;
          }
        }
      }
  }

  return resultado;
}

// Validar Pista 9
function validarPista9() {
  let resultado = null;

  for(let i = 0; i < 6; i++)
  {
    //console.log(`Hospital ${sillas[i].hospital}`);
    if(sillas[i].guardias && sillas[i].hospital)
    {
      //console.log(`Hospital ${sillas[i].hospital}`);
      if(sillas[i].hospital === "Príncipe de Asturias")
      {
        if(sillas[i].guardias === 1)
        {
          resultado = true;
        }
        else{
          resultado = false;
        }
      }
      if(sillas[i].guardias === 1)
      {
        if(sillas[i].hospital !== "Príncipe de Asturias")
        {
          resultado = false;
        }
      }
    }
  }

  return resultado;
}

function isSalario55()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.salario === "55 mil €")
    {
      resultado = i;
    }
  }

  return resultado;
}

function isCardiologo()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.especialidad === "Cardiólogo")
    {
      resultado = i;
    }
  }

  return resultado;
}

// Validar Pista 10
function validarPista10() {
  let resultado = null;

  if(isAzul() >= 0 && isCardiologo() >= 0 && isSalario55() >= 0)
  {
    if(isSalario55() - isAzul() === 1
  && isAzul()-isCardiologo() === 1)
    {
      resultado = true;
    }
    else
    {
      resultado = false;
    }
  }
  else if(isAzul() >= 0 && isCardiologo()>= 0)
  {
    if(isAzul() === 5)
    {
      resultado = false;
    }
    else
    {
      if(isAzul() - isCardiologo() !== 1)
      {
        resultado = false;

      if(sillas[isAzul()+1].salario)
      {
        if(sillas[isAzul()+1].salario !== "55 mil €")
        {
          resultado = false;
        }
      }
    }
    }
  }
  else if(isAzul() >= 0 && isSalario55() >= 0)
  {
    if(isAzul() === 0)
    {
      resultado = false;
    }
    else
    {
      if(isSalario55() - isAzul() !== 1)
      {
        resultado = false;
      }

      if(sillas[isAzul()-1].bata)
      {
        if(sillas[isAzul()-1].bata !== "Azul")
        {
          resultado = false;
        }
      }
    }
  }
  else if(isCardiologo() >= 0 && isSalario55() >= 0)
  {
    if(isSalario55() - isCardiologo() !== 2)
    {
      resultado = false;
    }

    if(sillas[isCardiologo() + 1].bata)
    {
      if(sillas[isCardiologo() + 1].bata !== "Azul")
      {
        resultado = false;
      }
    }
  }
  else if(isAzul()>=0)
  {
    if(isAzul() === 0)
    {
      resultado = false;
    }
    else if(isAzul() === 5)
    {
      resultado = false;
    }
    else
    {
      if(sillas[isAzul()-1].especialidad)
      {
        if(sillas[isAzul()-1].especialidad !== "Cardiólogo")
        {
          resultado = false;
        }
      }
      if(sillas[isAzul() + 1].salario)
      {
        if(sillas[isAzul() + 1].salario !== "55 mil €")
        {
          resultado = false;
        }
      }
    }
  }
  else if(isCardiologo() >= 0)
  {
    if(isCardiologo() >= 4)
    {
      resultado = false;
    }
    else
    {
      if(sillas[isCardiologo() + 1].bata)
      {
        if(sillas[isCardiologo() + 1].bata !== "Azul")
        {
          resultado = false;
        }
      }
    }
  }
  else if(isSalario55() >= 0)
  {
    if(isSalario55() <= 1)
    {
      resultado = false;
    }
    else
    {
      if(sillas[isSalario55() - 1].bata)
      {
        if(sillas[isSalario55() - 1].bata !== "Azul")
        {
          resultado = false;
        }
      }
    }
  }

  return resultado;
}

// Validar Pista 11
function validarPista11() {
  let resultado = null;

  for(let i = 0; i < 6; i++)
    {
      //console.log(`Hospital ${sillas[i].hospital}`);
      if(sillas[i].guardias && sillas[i].hospital)
      {
        //console.log(`Hospital ${sillas[i].hospital}`);
        if(sillas[i].hospital === "Niño Jesús")
        {
          if(sillas[i].guardias === 4)
          {
            resultado = true;
          }
          else{
            resultado = false;
          }
        }
        if(sillas[i].guardias === 4)
        {
          if(sillas[i].hospital !== "Niño Jesús")
          {
            resultado = false;
          }
        }
      }
    }

  return resultado;
}

function isVerde()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.bata === "Verde")
    {
      resultado = i;
    }
  }

  return resultado;
}

function isGomez()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.hospital === "Gómez Ulla")
    {
      resultado = i;
    }
  }

  return resultado;
}

// Validar Pista 12
function validarPista12() {
  let resultado = null;

  for(let i = 0; i<6; i++)
  {
    if(sillas[i].especialidad)
    {
      if(sillas[i].especialidad === "Psiquiatra")
      {
        if(i !== 0 && i !== 5)
        {
          if(sillas[i].bata)
            {
              if(sillas[i].bata === "Verde")
              {
                resultado = false;
              }
            }
            if(sillas[i].hospital)
            {
              if(sillas[i].hospital === "Gómez Ulla")
                {
                  resultado = false;
                }
            }
            if(sillas[i-1].bata)
            {
              if(sillas[i-1].bata !== "Verde")
              {
                resultado = false;
              }
            }
            if(isVerde() >= 0)
            {
              if((i - isVerde()) !== 1)
              {
                resultado = false;
              }
            }

            if(isGomez() >= 0)
            {
              if((isGomez() - i) !== 1)
              {
                resultado = false;
              }
            }
            if(sillas[i+1].hospital)
            {
              if(sillas[i+1].hospital !== "Gómez Ulla")
              {
                resultado = false;
              }
            }
        }
      }
    }

    if(sillas[i].bata)
    {
      if(sillas[i].bata === "Verde")
      {
        if(sillas[i].hospital)
        {
          sa55 = isGomez();
          if(sa55 >= 0)
          {
            if((sa55 - i) !== 2)
            {
              resultado = false;
            }
          }
        }
      }
    }

    if(sillas[i].hospital)
      {
        if(sillas[i].hospital === "Gómez Ulla")
        {
          if(sillas[i].bata)
          {
            es = isVerde();
            if(es >= 0)
            {
              if((i - es) !== 2)
              {
                resultado = false;
              }
            }
          }
        }
      }
    if(i !== 0 && i !== 5)
    {
      if(sillas[i-1] && sillas[i] && sillas[i+1])
        {
          if(sillas[i-1].bata && sillas[i].especialidad && sillas[i+1].hospital)
            {
              if(sillas[i-1].bata === "Verde" && sillas[i].especialidad === "Psiquiatra" && sillas[i+1].hospital === "Gómez Ulla")
              {
                resultado = true;
              }
              else
              {
                resultado = false;
              }
            }
        }
    }
    else if((i === 0 || i === 5) && sillas[i].especialidad === "Psiquiatra")
    {
      resultado = false;
    }
  }
  return resultado;
}

function issalario70()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.salario === "70 mil €")
    {
      resultado = i;
    }
  }

  return resultado;
}

function isArritmia()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.enfermedad === "Arritmia")
    {
      resultado = i;
    }
  }

  return resultado;
}

function isLucia()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.nombre === "Lucía")
    {
      resultado = i;
    }
  }

  return resultado;
}

// Validar Pista 13
function validarPista13() {
  let resultado = null;

  if(issalario70() >= 0 && isLucia() >= 0 && isArritmia() >= 0)
  {
    if(issalario70() - isLucia() !== 1 || issalario70()-isArritmia() !== 1)
      {
        
        resultado = false;
      }
  }

  for(let i = 0; i<6; i++)
  {
      //Check if Lucia is last
      if(sillas[i].nombre)
      {
        if(sillas[i].nombre === "Lucía")
        {
          if(i === 5)
          {
            resultado = false;
            
          }
          else
          {
            if(issalario70() >= 0)
            {
              if(issalario70()-i !== 1)
              {
                resultado = false;
                
              }
            }
            if(sillas[i+1].salario)
            {
              if(sillas[i+1].salario !== "70 mil €")
              {
                resultado = false;
                //console.log('Salario contiguo a Lucia no 70');
              }
            }
          } 
        }
      }

      //Check if arritmia is last
      if(sillas[i].enfermedad)
        {
          if(sillas[i].enfermedad === "Arritmia")
          {
            if(i === 5)
            {
              //console.log('Arritmia última');
              resultado = false;
            }
            else
            {
              if(issalario70() >= 0)
                {
                  if(issalario70()-i !== 1)
                  {
                    //console.log('Salario 70 lejos de arritmia');
                    resultado = false;
                  }
                }
  
              if(sillas[i+1].salario)
              {
                if(sillas[i+1].salario !== "70 mil €")
                {
                  //console.log('Salario contiguo a arritmia no 70');
                  resultado = false;
                }
              }
            }
          }
        }

      //Check if 70 mil € is first
      if(sillas[i].salario)
      {
        if(sillas[i].salario === "70 mil €")
        {
          if(i === 0)
          {
            //console.log('Salario 70 primero');
            resultado = false;
          }
          else{
            if(isLucia() >= 0)
              {
                if(i - isLucia() !== 1)
                {
                  //console.log('Salario lejos de lucia');
                  resultado = false;
                }
              }
    
              if(isArritmia() >= 0)
                {
                  if(i - isArritmia() !== 1)
                  {
                    //console.log('Salario lejos de arritmia');
                    resultado = false;
                  }
                }
    
              if(sillas[i-1].nombre)
              {
                if(sillas[i-1].nombre !== "Lucía")
                {
                  //console.log('Nombre anterior a salario no Lucia');
                  resultado = false;
                }
              }
    
              if(sillas[i-1].enfermedad)
              {
                if(sillas[i-1].enfermedad !== "Arritmia")
                {
                  //console.log('Enf anterior a salario no arritmia');
                  resultado = false;
                }            
              }
    
                //Check nombre no Lucia
              if(sillas[i].nombre)
              {
                if(sillas[i].nombre === "Lucía")
                {
                  //console.log('salario 70 es Lucía');
                  resultado = false;
                }
              }
    
              //Check enfermedad no Arritmia
              if(sillas[i].enfermedad)
              {  
                if(sillas[i].enfermedad === "Arritmia")
                {
                  //console.log('Salario 70 es Arritmia');
                  resultado = false;              
                }
              }
          }
        }
      }

      //Check if Lucia treats nothing but arritmia
      if(sillas[i].nombre)
      {
        if(sillas[i].nombre === "Lucía")
        {
          if(sillas[i].enfermedad)
          {
            if(sillas[i].enfermedad !== "Arritmia")
            {
              //console.log('Enf de Lucia no arritmia');
              resultado = false;
            }
          }

          //Check salario is not 70 mil
          if(sillas[i].salario)
          {
            if(sillas[i].salario === "70 mil €")
            {
              //console.log('salario lucia 70');
              resultado = false;
            }
          }
        }
        if(sillas[i].enfermedad === "Arritmia")
          {
            if(sillas[i].nombre)
            {
              if(sillas[i].nombre !== "Lucía")
              {
                //console.log('nombre arritmia no Lucia');
                resultado = false;
              }
            }
  
            //Check salario is not 70 mil
            if(sillas[i].salario)
            {
              if(sillas[i].salario === "70 mil €")
              {
                //console.log('salario arritmia es 70');
                resultado = false;
              }
            }
          }
      }

    //Only true option
    if(i<5)
    {
      if(sillas[i].nombre && sillas[i].enfermedad && sillas[i+1].salario)
        {
          if(sillas[i].nombre === "Lucía" &&
            sillas[i].enfermedad === "Arritmia" &&
            sillas[i+1].salario === "70 mil €")
          {
            resultado = true;
          }
          else{
            //console.log('no true');
            resultado = false;
          }
        }
    }
  }
  return resultado;
}

// Validar Pista 14
function validarPista14() {
  let resultado = null;

  s1 = sillas[0];

  if(s1.hospital)
  {
    if(s1.hospital === "Quirón")
    {
      resultado = true;
    }
    else{
      resultado = false;
    }
  }

  for(let i = 1; i<6; i++)
  {
    if(sillas[i].hospital === "Quirón")
    {
      resultado = false;
    }
  }

  return resultado;
}

function isNefrologo()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.especialidad === "Nefrólogo")
    {
      resultado = i;
    }
  }

  return resultado;
}

function isTeresa(){
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.nombre === "Teresa")
    {
      resultado = i;
    }
  }

  return resultado;
}

function isBlanca(){
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.bata === "Blanca")
    {
      resultado = i;
    }
  }

  return resultado;
}

// Validar Pista 15
function validarPista15() {
  let resultado = null;

  for(let i = 0; i<6; i++)
  {
    if(sillas[i].especialidad === "Nefrólogo")
    {
      if(i === 5)
      {
        console.log(`1`);
        resultado = false;
      }
      else{
        if(isTeresa() >= 0) //teresa is in the grid
        {
          if(isTeresa() - i <= 0)
          {
            console.log(`2`);
            resultado = false;
          }
        }

        if(isBlanca() >= 0) //blanca is in the grid
        {
          if(isBlanca() - i <= 0)
          {
            console.log(`3`);
            resultado = false;
          }
        }

        if(sillas[i].edad)
        {
          if(sillas[i].edad === 35)
          {
            console.log(`4`);
            resultado = false;
          }
          else{
            if(isTeresa() >= 0 || isBlanca() >= 0)
            {
              if(sillas[isTeresa()].edad)
              {
                if(sillas[i].edad - sillas[isTeresa()].edad !== 5
                || sillas[i].edad - sillas[isBlanca()].edad !== 5)
                {
                  console.log(`5`);
                  resultado = false;
                }
              }
            }
            if(sillas[i+1].edad)
            {
              if(sillas[i].edad - sillas[i+1].edad !== 5)
              {
                console.log(`6`);
                resultado = false;
              }
            }
          }
        }
      }
    }

    if(sillas[i].nombre === "Teresa")
    {
      if(i === 0)
      {
        console.log(`7`);
        resultado = false;
      }
      else{
        if(isBlanca() >= 0) //blanca is in the grid
        {
          if(isBlanca() - i !== 0)
          {
            console.log(`8`);
            resultado = false;
          }
        }

        if(isNefrologo() >= 0) //nefrologo is in the grid
        {
          if(i - isNefrologo() <= 0)
          {
            console.log(`9`);
            resultado = false;
          }
        }

        if(sillas[i].edad)
          {
            if(sillas[i].edad === 65)
            {
              console.log(`10`);
              resultado = false;
            }
            else{
              if(sillas[i-1].edad)
              {
                if(sillas[i-1].edad - sillas[i].edad !== 5)
                {
                  console.log(`11`);
                  resultado = false;
                }
              }
              if(isNefrologo() >= 0)
              {
                if(sillas[isNefrologo()].edad)
                {
                  if(sillas[isNefrologo()].edad - sillas[i].edad !== 5)
                    {
                      console.log(`12`);
                      resultado = false;
                    }
                }
              }
            }
          }
      }
    }

    if(sillas[i].bata === "Blanca")
      {
        if(i === 0)
        {
          console.log(`13`);
          resultado = false;
        }
        else{
          if(isTeresa() >= 0) //teresa is in the grid
          {
            if(isTeresa() - i !== 0)
            {
              console.log(`14`);
              resultado = false;
            }
          }
  
          if(isNefrologo() >= 0) //nefrologo is in the grid
          {
            if(i - isNefrologo() <= 0)
            {
              console.log(`15`);
              resultado = false;
            }
          }

          if(sillas[i].edad)
          {
            if(sillas[i].edad === 65)
            {
              console.log(`16`);
              resultado = false;
            }
            else{
              if(sillas[i-1].edad)
              {
                if(sillas[i-1].edad - sillas[i].edad !== 5)
                {
                  console.log(`17`);
                  resultado = false;
                }
              }
              if(isNefrologo() >= 0)
                {
                  if(sillas[isNefrologo()].edad)
                  {
                    if(sillas[isNefrologo()].edad - sillas[i].edad !== 5)
                      {
                        console.log(`18`);
                        resultado = false;
                      }
                  }
                }
            }
          }
        }
      }

    if(i !== 0)
    {
      if(sillas[i].nombre === "Teresa"
        && sillas[i].bata === "Blanca" 
        && sillas[i-1].especialidad === "Nefrólogo"
        && sillas[i].edad - sillas[i-1].edad === -5
      )
      {
        resultado = true;
      }
    }
  }
  return resultado;
}

// Validar Pista 16
function validarPista16() {
  let resultado = null;

  for(let i = 0; i < 6; i++)
    {
      //console.log(`Hospital ${sillas[i].hospital}`);
      if(sillas[i].guardias && sillas[i].salario)
      {
        if(sillas[i].salario === "15 mil €")
        {
          if(sillas[i].guardias === 2)
          {
            resultado = true;
          }
          else{
            resultado = false;
          }
        }
        else if(sillas[i].guardias === 2)
        {
          if(sillas[i].salario !== "15 mil €");
          {
            resultado = false;
          }
        }
      }
    }

  return resultado;
}

// Validar Pista 17
function validarPista17() {
  let resultado = null;

  for(let i = 0; i < 6; i++)
    {
      //console.log(`Hospital ${sillas[i].hospital}`);
      if(sillas[i].especialidad && sillas[i].edad)
      {
        if(sillas[i].edad === 50)
        {
          if(sillas[i].especialidad === "Dermatólogo")
          {
            resultado = true;
          }
          else{
            resultado = false;
          }
        }
        else if(sillas[i].especialidad === "Dermatólogo")
        {
          if(sillas[i].edad !== 50);
          {
            resultado = false;
          }
        }
      }
    }

  return resultado;
}

function is60()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.edad === 60)
    {
      resultado = i;
    }
  }

  return resultado;
}

// Validar Pista 18
function validarPista18() {
  let resultado = null;

  for(let i = 0; i<6; i++)
  {
    if(sillas[i].edad === 60)
    {
      if(i === 0)
      {
        resultado = false;
      }
      else
      {
        if(isBlanca() >= 0)
        {
          if(i - isBlanca() !== 1)
          {
            resultado = false;
          }
          else{
            resultado = true;
          }
        }

        if(sillas[i-1].bata)
        {
          if(sillas[i-1].bata !== "Blanca")
          {
            resultado = false;
          }
        }
      }
    }

    if(sillas[i].bata === "Blanca")
    {
      if(i === 5)
      {
        resultado = false;
      }
      else
      {
        if(is60() >= 0)
        {
          if(is60() - i !== 1)
          {
            resultado = false;
          }
        }

        if(sillas[i+1].edad)
        {
          if(sillas[i+1].edad !== 60)
          {
            resultado = false;
          }
        }
      }
    }
  }

  return resultado;
}

function isRosa()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.bata === "Rosa")
    {
      resultado = i;
    }
  }

  return resultado;
}

function issalario60()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.salario === "60 mil €")
    {
      resultado = i;
    }
  }

  return resultado;
}

// Validar Pista 19
function validarPista19() {
  let resultado = null;

  for(let i = 0; i<6; i++)
  {
    if(sillas[i].hospital)
    {
      if(sillas[i].hospital === "Gómez Ulla")
      {
        if(i !== 0 && i !== 5)
        {
          if(sillas[i].bata)
            {
              if(sillas[i].bata === "Rosa")
              {
                resultado = false;
              }
            }
            if(sillas[i].salario)
            {
              if(sillas[i].salario === "60 mil €")
                {
                  resultado = false;
                }
            }
            if(sillas[i-1].bata)
            {
              if(sillas[i-1].bata !== "Rosa")
              {
                resultado = false;
              }
            }
            if(isRosa() >= 0)
            {
              if((i - isRosa()) !== 1)
              {
                resultado = false;
              }
            }

            if(issalario60() >= 0)
            {
              if((issalario60() - i) !== 1)
              {
                resultado = false;
              }
            }
            if(sillas[i+1].salario)
            {
              if(sillas[i+1].salario !== "60 mil €")
              {
                resultado = false;
              }
            }
        }
      }
    }

    if(sillas[i].bata)
    {
      if(sillas[i].bata === "Rosa")
      {
        if(i <4)
        {
          if(sillas[i].salario)
            {
              sa55 = issalario60();
              if(sa55 >= 0)
              {
                if((sa55 - i) !== 2)
                {
                  resultado = false;
                }
              }
            }
        }
        else
        {
          resultado = false;
        }
      }
    }

    if(sillas[i].salario)
      {
        if(sillas[i].salario === "60 mil €")
        {
          if(i > 1)
          {
            if(sillas[i].bata)
              {
                es = isRosa();
                if(es >= 0)
                {
                  if((i - es) !== 2)
                  {
                    resultado = false;
                  }
                }
              }
          }
          else{
            resultado = false;
          }
        }
      }
    if(i !== 0 && i !== 5)
    {
      if(sillas[i-1] && sillas[i] && sillas[i+1])
        {
          if(sillas[i-1].bata && sillas[i].hospital && sillas[i+1].salario)
            {
              if(sillas[i-1].bata === "Rosa" && sillas[i].hospital === "Gómez Ulla" && sillas[i+1].salario === "60 mil €")
              {
                resultado = true;
              }
              else
              {
                resultado = false;
              }
            }
        }
    }
    else if((i === 0 || i === 5) && sillas[i].hospital === "Gómez Ulla")
    {
      resultado = false;
    }
  }
  return resultado;
}

function is12Octubre()
{
  let resultado = -1;
  for(let i = 0; i < 6; i++)
  {
    si = sillas[i];
    if(si.hospital === "12 de Octubre")
    {
      resultado = i;
    }
  }

  return resultado;
}

// Validar Pista 20
function validarPista20() {
  let resultado = null;

  for(let i = 0; i<6; i++)
  {
    if(sillas[i].bata === "Blanca")
    {
      if(i === 0)
      {
        resultado = false;
      }
      else
      {
        if(is12Octubre() >= 0)
        {
          if(i - is12Octubre() !== 1)
          {
            resultado = false;
          }
          else{
            resultado = true;
          }
        }

        if(sillas[i-1].hospital)
        {
          if(sillas[i-1].hospital !== "12 de Octubre")
          {
            resultado = false;
          }
        }
      }
    }

    if(sillas[i].hospital === "12 de Octubre")
    {
      if(i === 5)
      {
        resultado = false;
      }
      else
      {
        if(isBlanca() >= 0)
        {
          if(isBlanca() - i !== 1)
          {
            resultado = false;
          }
        }

        if(sillas[i+1].bata)
        {
          if(sillas[i+1].bata !== "Blanca")
          {
            resultado = false;
          }
        }
      }
    }
  }

  return resultado;
}

function isJesus()
{
  let resultado = -1;
  for(let i = 0; i<6; i++)
  {
    if(sillas[i].nombre === "Jesús")
    {
      resultado = i;
    }
  }
  return resultado;
}

function isParanoia()
{
  let resultado = -1;
  for(let i = 0; i<6; i++)
  {
    if(sillas[i].enfermedad === "Paranoia")
    {
      resultado = i;
    }
  }
  return resultado;
}

function is3guardias()
{
  let resultado = -1;
  for(let i = 0; i<6; i++)
  {
    if(sillas[i].guardias === 3)
    {
      resultado = i;
    }
  }
  return resultado;
}

// Validar Pista 21
function validarPista21() {
  let resultado = null;

  if(isParanoia() >= 0 && isJesus() >= 0 && is3guardias() >= 0)
  {
    if(isParanoia() - isJesus() !== 1 || isParanoia()-is3guardias() !== 1)
      {
        resultado = false;
      }
  }

  for(let i = 0; i<6; i++)
  {
      //Check if Jesús is last
      if(sillas[i].nombre)
      {
        if(sillas[i].nombre === "Jesús")
        {
          if(i === 5)
          {
            resultado = false;
            
          }
          else
          {
            if(isParanoia() >= 0)
            {
              if(isParanoia()-i !== 1)
              {
                resultado = false;
                
              }
            }
            if(sillas[i+1].enfermedad)
            {
              if(sillas[i+1].enfermedad !== "Paranoia")
              {
                resultado = false;
              }
            }
          } 
        }
      }

      if(sillas[i].guardias)
        {
          if(sillas[i].guardias === 3)
          {
            if(i === 5)
            {
              resultado = false;
            }
            else
            {
              if(isParanoia() >= 0)
                {
                  if(isParanoia()-i !== 1)
                  {
                    resultado = false;
                  }
                }
  
              if(sillas[i+1].enfermedad)
              {
                if(sillas[i+1].enfermedad !== "Paranoia")
                {
                  resultado = false;
                }
              }
            }
          }
        }

      if(sillas[i].enfermedad)
      {
        if(sillas[i].enfermedad === "Paranoia")
        {
          if(i === 0)
          {
            resultado = false;
          }
          else{
            if(isJesus() >= 0)
              {
                if(i - isJesus() !== 1)
                {
                  resultado = false;
                }
              }
    
              if(is3guardias() >= 0)
                {
                  if(i - is3guardias() !== 1)
                  {
                    resultado = false;
                  }
                }
    
              if(sillas[i-1].nombre)
              {
                if(sillas[i-1].nombre !== "Jesús")
                {
                  resultado = false;
                }
              }
    
              if(sillas[i-1].guardias)
              {
                if(sillas[i-1].guardias !== 3)
                {
                  resultado = false;
                }            
              }
    
              if(sillas[i].nombre)
              {
                if(sillas[i].nombre === "Jesús")
                {
                  resultado = false;
                }
              }
    
              if(sillas[i].guardias)
              {  
                if(sillas[i].guardias === 3)
                {
                  resultado = false;              
                }
              }
          }
        }
      }

      if(sillas[i].nombre)
      {
        if(sillas[i].nombre === "Jesús")
        {
          if(sillas[i].guardias)
          {
            if(sillas[i].guardias !== 3)
            {
              resultado = false;
            }
          }

          if(sillas[i].enfermedad)
          {
            if(sillas[i].enfermedad === "Paranoia")
            {
              resultado = false;
            }
          }
        }
        if(sillas[i].guardias === 3)
          {
            if(sillas[i].nombre)
            {
              if(sillas[i].nombre !== "Jesús")
              {
                resultado = false;
              }
            }
  
            if(sillas[i].enfermedad)
            {
              if(sillas[i].enfermedad === "Paranoia")
              {
                resultado = false;
              }
            }
          }
      }

    //Only true option
    if(i<5)
    {
      if(sillas[i].nombre && sillas[i].guardias && sillas[i+1].enfermedad)
        {
          if(sillas[i].nombre === "Jesús" &&
            sillas[i].guardias === 3 &&
            sillas[i+1].enfermedad === "Paranoia")
          {
            resultado = true;
          }
          else{
            resultado = false;
          }
        }
    }
  }
  return resultado;
}

function todasEdadesySalarios()
{
  let resultado = null;
  let cont = 0;
  for(let i=0; i<6; i++)
  {
    if(sillas[i].edad && sillas[i].salario)
    {
      //console.log(`Salario: ${sillas[i].salario} Edad: ${sillas[i].edad}`);
      cont++;
    }
  }

  if(cont === 6){
    resultado = true;
  }
  else{
    resultado = false;
  }

  return resultado;
}

// Validar Pista 22
function validarPista22() {
  let resultado = null;

  if(todasEdadesySalarios())
  {
    let founded = false;
    for(let i=0; i<6; i++)
      {
        if((sillas[i].edad === 60 && sillas[i].salario === "60 mil €") || (sillas[i].edad===55 && sillas[i].salario === "55 mil €"))
        {
          founded = true;
        }
      }

      resultado = founded;
  }

  for(let i=0; i<6; i++)
  {
    if((sillas[i].edad === 60 && sillas[i].salario === "60 mil €") || (sillas[i].edad===55 && sillas[i].salario === "55 mil €"))
      {
        resultado = true;
      }
  }
  return resultado;
}

  
  // Obtener opciones por variable
  function obtenerOpciones(variable) {
    const opciones = {
      nombre: ["Jesús", "Fernando", "Teresa", "Lucía", "Pepe", "María"],
      especialidad: ["Nefrólogo", "Psiquiatra", "Urólogo", "Cardiólogo", "Dermatólogo", "Pediatra"],
      edad: [35, 40, 50, 55, 60, 65],
      bata: ["Verde", "Rosa", "Blanca", "Negra", "Azul", "Gris"],
      enfermedad: ["Nefritis", "Paranoia", "Próstata", "Arritmia", "Psoriasis", "Crecimiento"],
      guardias: [1, 2, 3, 4, 5, 7],
      salario: ["15 mil €", "48 mil €", "55 mil €", "60 mil €", "70 mil €", "72 mil €"],
      hospital: ["Quirón", "12 de Octubre", "Gómez Ulla", "Niño Jesús", "Príncipe de Asturias", "HM"]
    };
    return opciones[variable] || [];
  }
  
  // Inicializar
  document.addEventListener("DOMContentLoaded", () =>{
    renderTabla();
    mostrarConsultas();
  })


  //TEST=======================================================================================================
  // Función para escer los datos de las sillas para los casos de prueba
function configurarDatosPrueba(datos) {
    for (let i = 0; i < datos.length; i++) {
      sillas[i] = { ...sillas[i], ...datos[i] };
    }
  }
  
  // Función para ejecutar y comprobar los casos de prueba
  function ejecutarCasosDePrueba() {
    const casos = [
      {
        descripcion: "Pista 4: El médico de la cuarta silla no trata próstata, hace menos guardias que el médico que trata crecimiento, pero más que Jesús.",
        datos: [
          { nombre: "Jesús", guardias: 3, enfermedad: "Nefritis" },
          { enfermedad: "Paranoia" },
          { enfermedad: "Próstata" },
          { enfermedad: "Arritmia", guardias: 4 },
          { enfermedad: "Crecimiento", guardias: 5 },
          { guardias: 0 }
        ],
        funcion: validarPista4,
        esperado: true,
      },
      {
        descripcion: "Pista 5: El médico de bata negra está a la derecha del urólogo.",
        datos: [
          { bata: "verde", especialidad: "Nefrólogo" },
          { bata: "rosa", especialidad: "Psiquiatra" },
          { bata: "blanca", especialidad: "Urólogo" },
          { bata: "negra" },
          { bata: "" },
          { bata: "" }
        ],
        funcion: validarPista5,
        esperado: true,
      },
      {
        descripcion: "Pista 6: Fernando gana 72 mil € y hace 2 guardias más que María.",
        datos: [
          { nombre: "Fernando", salario: 72000, guardias: 4 },
          { nombre: "María", guardias: 2 },
          { guardias: 0 },
          { guardias: 0 },
          { guardias: 0 },
          { guardias: 0 }
        ],
        funcion: validarPista6,
        esperado: true,
      },
      {
        descripcion: "Pista 7: El pediatra está en los extremos y lleva bata gris.",
        datos: [
          { especialidad: "Pediatra", bata: "gris" },
          { bata: "" },
          { bata: "" },
          { bata: "" },
          { bata: "" },
          { especialidad: "Pediatra", bata: "gris" }
        ],
        funcion: validarPista7,
        esperado: true,
      },
      {
        descripcion: "Pista 8: María (65 años) está al lado del médico con bata azul.",
        datos: [
          { nombre: "María", edad: 65 },
          { bata: "azul" },
          { bata: "" },
          { bata: "" },
          { bata: "" },
          { bata: "" }
        ],
        funcion: validarPista8,
        esperado: true,
      },
      {
        descripcion: "Pista 9: El médico con 1 guardia trabaja en Príncipe de Asturias.",
        datos: [
          { guardias: 1, hospital: "Príncipe de Asturias" },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" }
        ],
        funcion: validarPista9,
        esperado: true,
      },
      {
        descripcion: "Pista 10: El médico de bata azul está entre el cardiólogo y el médico de 55 mil €.",
        datos: [
          { especialidad: "Cardiólogo" },
          { bata: "azul" },
          { salario: 55000 },
          { bata: "" },
          { bata: "" },
          { bata: "" }
        ],
        funcion: validarPista10,
        esperado: true,
      },
      {
        descripcion: "Pista 11: El médico que trabaja en Niño Jesús hace 4 guardias.",
        datos: [
          { hospital: "Niño Jesús", guardias: 4 },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" }
        ],
        funcion: validarPista11,
        esperado: true,
      },
      {
        descripcion: "Pista 12: El psiquiatra está entre el médico de bata verde y el médico de Gómez Ulla.",
        datos: [
          { bata: "verde" },
          { especialidad: "Psiquiatra" },
          { hospital: "Gómez Ulla" },
          { bata: "" },
          { bata: "" },
          { bata: "" }
        ],
        funcion: validarPista12,
        esperado: true,
      },
      {
        descripcion: "Pista 13: Lucía trata arritmia y está a la izquierda del médico de 70 mil €.",
        datos: [
          { nombre: "Lucía", enfermedad: "Arritmia" },
          { salario: 70000 },
          { salario: 0 },
          { salario: 0 },
          { salario: 0 },
          { salario: 0 }
        ],
        funcion: validarPista13,
        esperado: true,
      },
      {
        descripcion: "Pista 14: La primera silla pertenece a Quirón.",
        datos: [
          { hospital: "Quirón" },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" },
          { hospital: "" }
        ],
        funcion: validarPista14,
        esperado: true,
      },
      {
        descripcion: "Pista 22: Una persona gana los mismos miles de € que su edad.",
        datos: [
          { edad: 48, salario: 48000 },
          { edad: 0, salario: 0 },
          { edad: 0, salario: 0 },
          { edad: 0, salario: 0 },
          { edad: 0, salario: 0 },
          { edad: 0, salario: 0 }
        ],
        funcion: validarPista22,
        esperado: true,
      },
    ];
  
    casos.forEach((caso, index) => {
      configurarDatosPrueba(caso.datos);
      const resultado = caso.funcion();
      console.log(`Caso ${index + 1}: ${caso.descripcion}`);
      console.log(`Resultado esperado: ${caso.esperado}, Resultado obtenido: ${resultado}`);
      console.log(resultado === caso.esperado ? "✅ Correcto" : "❌ Incorrecto");
      console.log("---------------------------------------------------");
    });
  }
  
  // Ejecutar los casos de prueba
  ejecutarCasosDePrueba();
  */