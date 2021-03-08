module.exports = function (application) {
    application.post('/chat',
        body('apelido').notEmpty().withMessage('Não pode ser vazio'),
        body('apelido').isLength({ min: 5 }).withMessage('Tem que ser maior que 5'),
        function (req, res) {
            var dadosForm = req.body;
            console.log('dados', dadosForm);

            const erros = validationResult(req);

            if (erros.errors.toString() !== '') {
                res.render("index", { validacao: erros })
                return;
            }

            function pegaHora() {
                var d = new Date();
                var h = d.getHours();
                var m = d.getMinutes();
                return h + ":" + m
            }
            

            application.get('io').emit(
                'msgParaCliente',
                { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat', hora: pegaHora(), imagem: dadosForm.imagem }

            )

        // req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
        // req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

        // var erros = req.validationErrors();

<<<<<<< HEAD
        application.get('io').emit(
            'msgParaCliente',
            { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat', hora: pegaHora() }
        )

=======
        // if (erros) {
        //     res.render("index", { validacao: erros })
        //     return;
        // }

        application.get('io').emit(
            'msgParaCliente',
            { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat' }
        )
>>>>>>> 85dcc860e77c5a583bc4f6e2bc75fd0a44efcac5
        res.render("chat", { dadosForm: dadosForm });
    });
}