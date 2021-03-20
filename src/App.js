import React, {Fragment, useState, useEffect} from 'react';
import './App.css';

import Formulario from './componentes/Formulario';
import Cita from './componentes/Cita';

function App() {

  //citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas')); //Como localStorage solo almacena string le pasamos el arreglo Json.parse xa q nos lo transforme en json
  if(!citasIniciales){
    citasIniciales = [];
  }

  //crear state citas
  const[citas, guardarCitas] = useState(citasIniciales);

  //crear useEffect para ciertas operaciones cuando el state cambia
  useEffect(() => {//siempre useEffect es un arrow function
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas, citasIniciales])// este arreglo hace que useeffect se ejecute cuando hay un cambio en citas


  //Función que coja las citas actuales y agregue la nueva
  const crearCita = cita => {
    //console.log(cita);
    guardarCitas([...citas, cita]);
  }

  //Funcion que elimina una cita
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter( cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // enseñar un mensaje condicional utilizando ternarios
  const titulo = citas.length === 0 ? "No hay citas pendientes"  : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
             <Formulario
                crearCita={crearCita}
             />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita //cuando se insta o itera en react siempre hay que pasar un key
              key= {cita.id}
              cita ={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          
          </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
