const socket = io();//socket provee todo el codigo de frontend que envia los eventos al servidor y vamos a poder escucharlo en el servidor cuando recibamos la nueva conexion

//Elementos del DOM
let tarea = document.getElementById('tarea');
let descripcion = document.getElementById('descripcion');
let btn = document.getElementById('send');
let tabla = document.getElementById('tabla');
let actions = document.getElementById('actions');

btn.addEventListener('click',function(){//muestra la tarea y descripcion para despues enviar los datos al servidor
    socket.emit('actividad:tarea',{// voy a enviarle al servidor ciertos datos a traves de un evento que e creado llamado actividad 
        tarea: tarea.value,
        descripcion: descripcion.value
    });
});

socket.on('actividad:tarea',function(data){
    
    tabla.innerHTML += `
    <td> <input type = "checkbox" onClick="completar()" /></td>
    <td  idstyle ="flex-grow: 2">${data.tarea}: </td>
    <td  style ="flex-grow: 2">${data.descripcion}</td>
    <td> <span onClick='borrar()'> X </span> </td>
    `
});


btn.addEventListener('click',function(){
    socket.emit('mensaje:tarea',"Se a Agregado Una Nueva Tarea");
});

socket.on('mensaje:tarea', function(data){
        actions.innerHTML = `<em  style="    
        background-color: green;
        color: white;
        height: 30px;
        font-size: 30px;
        line-height: 30px;
        border-radius: 10px;
        animation: slide-up 1s ease;">${data}</em>`;

        setTimeout(function(){
            actions.innerHTML='To Do APP';
        },3000)     
});

function borrar(event){
    this.event.target.parentElement.parentElement.remove();
}

function completar(event){
    if(this.event.target.checked){
        this.event.target.parentElement.parentElement.classList.add("completado");
    }
    else{
        this.event.target.parentElement.parentElement.classList.remove("completado");
    }
}

/*entonces cuando el app.js emite los datos el servidor escucha el evento, si el servidor emite otro evento con los mismos nombres entonces el
mensaje del cliente puede recibir a travez del socket en app.js entonces el app.js bueno primero yo envie un evento actividad:tarea de este 
cliente al servidor ahora el servidor me envia un evento actividad:tarea entonces lo voy a escuchar */