const path = require('path');//une directorios
const express = require('express');
const app = express();

//configuracion
app.set('port',process.env.PORT || 3000);//toma el puerto del sistema operativo si hay un configurado si no hay, utiliza el puerto 3000

//envia los archivos estaticos al navegador
app.use(express.static(path.join(__dirname, 'public')));//dirname manda la direccion en la que se encuentra y con el path une public

//iniciar servidor
const server = app.listen(app.get('port'), () =>{//se pone en constante para que al momento de mandarlo al skectIO ya este iniciado el servidor
    console.log('server on port', app.get('port'));//obtener el numero del puerto
});

//websockets
const SocketIO = require('socket.io');//nesesita un servidor ya creado socketIO asi que le asignamos app
const io = SocketIO(server);//la constante io mantiene la conexion de sockets

io.on('connection',(socket)=>{//recivimos el socket del cliente(app.js)
    console.log('Nueva Conexion', socket.id);

    socket.on('actividad:tarea',(data)=>{//este socket en el cual estoy conectado voy a escuchar su evento que es actividad:tarea los cuales contiene el tarea: tarea.value y descripcion: descripcion.value
        //console.log(data); como ya tenemos los datos y el servidor tambien puede renviarlos a los usuarios, tenemos 2 opciones envia todos los datos o envia todos los datos exepto nosotros
        io.sockets.emit('actividad:tarea', data)//io la conexion con todos los clientes les emitiremos un evento con datos, recibimos los datos y lo emitimos a todos los navegadores para que lo impriman en pantalla
    });

    socket.on('mensaje:tarea',(data) =>{
        socket.broadcast.emit('mensaje:tarea', data);
        console.log(data);
    }); 

});//socketIO cuando alguien se conecte se ejecuta codigo 





