/* importar as configurações do servidor */
var app = require('./config/server');

var express = require('express')
var app = express()
var server = require('http').createServer(app).listen(4555)
var io = require('socket.io').listen(server)
var bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var port = process.env.PORT || 8080;
  var router = express.Router();
  /* Socket irá aqui depois */
	var emitir = function(req, res, next){
		var notificar = req.query.notificacao || '';
			if(notificar != '')	 {
			io.emit('notificacao', notificar);
			next();
		} else {
				next();
			}
		}
	app.use(emitir);
  app.use('/api', router);
  router.route('/notificar')
    .get(function(req, res){
    //aqui vamos receber a mensagem
    res.json({message: "testando essa rota"})
    })
  app.listen(port);
  console.log('conectado a porta ' + port);


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
		console.log('msg serv: ', data)
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
					{ apelido: data.apelido, mensagem: data.mensagem, hora: data.hora }
				);
		
				socket.broadcast.emit(
					'msgParaCliente',
					{ apelido: data.apelido, mensagem: data.mensagem, hora: data.hora }
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