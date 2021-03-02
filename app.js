const firebaseConfig = {
	// ...
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
var firebaseConfig = {
    apiKey: "AIzaSyDbYUqR8qs8gdAwQQsjmC3y4L8jUIZ6uP4",
    authDomain: "chat-web-senac.firebaseapp.com",
    databaseURL: "https://chat-web-senac-default-rtdb.firebaseio.com",
    projectId: "chat-web-senac",
    storageBucket: "chat-web-senac.appspot.com",
    messagingSenderId: "822450398039",
    appId: "1:822450398039:web:4459519fadccfb76c7d412",
    measurementId: "G-P52QG5FXCF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
/* importar as configurações do servidor */
var app = require('./config/server');


/* parametrizar a porta de escuta */
var server = app.listen(process.env.PORT || 5000, function () {
	console.log('Servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/* criar a conexão por websocket */
io.on('connection', function (socket) {
	console.log('Usuário conectou');

	socket.on('disconnect', function () {
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function (data) {

		var avaliar = data.mensagem
		switch (avaliar) {
			case 'HTML':
				console.log('bot: ', avaliar);
				socket.emit(
					'msgParaCliente',
					{ apelido: 'Bot Web', mensagem: 'É uma linguagem de estururar documentos' }
				);
				break;

			default:
				/* dialogo */
				socket.emit(
					'msgParaCliente',
					{ apelido: data.apelido, mensagem: data.mensagem }
				);
		
				socket.broadcast.emit(
					'msgParaCliente',
					{ apelido: data.apelido, mensagem: data.mensagem }
				);
		
				/* participantes */
				if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
					socket.emit(
						'participantesParaCliente',
						{ apelido: data.apelido }
					);
		
					socket.broadcast.emit(
						'participantesParaCliente',
						{ apelido: data.apelido }
					);
				}

				break;
		}

	});

});