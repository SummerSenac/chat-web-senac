/* importar as configurações do servidor */
var app = require('./config/server');
var msgBot = require('./bot_msg.json');
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
		var { apelido, mensagem } = data
		var data2 = {
			apelido,
			mensagem
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

		function enviarMSG(msg) {
			socket.emit(
				'msgParaCliente',
				{ apelido: 'Bot Web', mensagem: msg }
			);
		}

		if (avaliar.search('@') >= 0) {
			var pergunta = avaliar.replace('@', '')
			// console.log('Sim é para o bot');
			for (msg of msgBot) {
				if (msg.qst === pergunta) {
					enviarMSG(msg.asw)
				}
			}

		} else {


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

		}

	});

});
