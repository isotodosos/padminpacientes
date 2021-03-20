import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    
    //crear state de citas
    const[cita, ActualizarCita] = useState({
        mascota:"",
        propietario:"",
        fecha:"",
        hora:"",
        sintomas:""
    });

    //crear state para error
    const [error, actualizarError] = useState(false);

    //funcion que se ejecuta cada vez que se escribe en un imput
    const actualizarState = (e)=>{ // SEGUN LA DOCUMENTACION... handleChange  //el evento (e) es lo que lo ejecuta que en este caso es el onChange
        //console.log(e.target);

        ActualizarCita({
            ...cita,
            [e.target.name] : e.target.value  //usamos destructuring
        })
    }

    //extraemos los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //cuando el usuario presiona agregar cita
    const submitCita = (e) => {
        e.preventDefault();

        //Validar
        if(mascota.trim() ==="" || propietario.trim() ==="" || fecha.trim() ==="" ||
        hora.trim() ==="" || sintomas.trim() ==="" ){ //trim coge los espacios vacios
            console.log('Hay un error');
            actualizarError(true);
            return;  //el return impide que continue el codigo
        }

        actualizarError(false);//para pos si esta el mensaje que desaparezca aztualizando su state

        //Asignar un id
        cita.id = uuidv4();//generamos un id de forma aleatoria
        //console.log(cita.id);

        //Crear la cita en el state
        crearCita(cita);
        //Reiniciar el form
        ActualizarCita({
            mascota:"",
            propietario:"",
            fecha:"",
            hora:"",
            sintomas:""
        })
    }


    return(
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>  : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                   type="text"
                   name="mascota"
                   className="u-full-width"
                   placeholder="nombre mascota"
                   onChange={actualizarState}
                   value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                   type="text"
                   name="propietario"
                   className="u-full-width"
                   placeholder="nombre propietario"
                   onChange={actualizarState}
                   value={propietario}
                />
                <label>Fecha</label>
                <input
                   type="date"
                   name="fecha"
                   className="u-full-width"
                   onChange={actualizarState}
                   value={fecha}
                />
                <label>Hora</label>
                <input
                   type="time"
                   name="hora"
                   className="u-full-width"
                   onChange={actualizarState}
                   value={hora}
                />
                <label>Síntomas</label>
                <textarea
                   name="sintomas"
                   className="u-full-width"
                   onChange={actualizarState}
                   value={sintomas}
                ></textarea>
                <button
                   type="submit"
                   className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired

}
export default Formulario;