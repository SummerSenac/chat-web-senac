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