
const { body, validationResult } = require('express-validator')

module.exports = function (application) {
    application.post('/chat', 
    body('apelido').notEmpty().withMessage('Faça Login'), 
    // body('apelido').isLength({ min: 5 }).withMessage(''),
        function (req, res) {
            var dadosForm = req.body;
            console.log('dados', dadosForm);

            const erros = validationResult(req);

            if (erros.errors.toString() !== '') {
                res.render("index", { validacao: erros })
                return;
            }

            // emitindo mesagem para clientes
            application.get('io').emit(
                'msgParaCliente',
                { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat' }
            )

            res.render("chat", { dadosForm: dadosForm });
        });

    application.get('/chat', function (req, res) {

            application.get('io').emit(
                'msgParaCliente',
                { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat' }
            )

            res.render("chat", { dadosForm: dadosForm });
        });
}