/* importar as configurações do servidor */
var app = require('./config/server');
var DataService = require('./services/DataService');
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
		console.log(data)
		var {apelido, mensagem, imagem} = data
		var data2 = {
			apelido, 
			mensagem,
			imagem
		}

		DataService.create(data2)
			.then(() => {
				console.log("Created new item successfully!");
				this.submitted = true;
			})
			.catch(e => {
				console.log(e);
			});

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
					{ apelido: data.apelido, mensagem: data.mensagem, imagem: data.imagem }
				);

				socket.broadcast.emit(
					'msgParaCliente',
					{ apelido: data.apelido, mensagem: data.mensagem, apelido: data.apelido, imagem: data.imagem }
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
