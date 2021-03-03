module.exports = function (application) {
    application.post('/chat', function (req, res) {
        var dadosForm = req.body;
        console.log('dados recebidos Post', dadosForm);

        // req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
        // req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

        // var erros = req.validationErrors();

        // if (erros) {
        //     res.render("index", { validacao: erros })
        //     return;
        // }
        function pegaHora() {
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			return h + ":" + m
		}

        application.get('io').emit(
            'msgParaCliente',
            { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat',hora: pegaHora() }
        )
        res.render("chat", { dadosForm: dadosForm });
    });

    application.get('/chat', function (req, res) {
        var dadosForm = req.body;
        console.log('dados recebidos get', dadosForm);

        // req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
        // req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

        // var erros = req.validationErrors();

        // if (erros) {
        //     res.render("index", { validacao: erros })
        //     return;
        // }

        application.get('io').emit(
            'msgParaCliente',
            { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat' }
        )
        res.render("chat", { dadosForm: dadosForm });
    });
}