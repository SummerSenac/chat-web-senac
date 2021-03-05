
const { log } = require('console');
const { body, validationResult } = require('express-validator')

var fs = require('fs');

//create a file named mynewfile1.txt:

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

            var usuarios = ''

            application.get('io').emit(
                'msgParaCliente',
                { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat', hora: pegaHora() },
               fs.readFile('usuarios.txt', function (err, file) {
                    if (err) throw err;
                    usuarios = file.toString('utf-8')
                    console.log('aqui',file.toString('utf-8'))
                }),
                fs.writeFile('usuarios.txt', dadosForm.apelido + usuarios, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                })
            )

            res.render("chat", { dadosForm: dadosForm });
        });

    application.get('/chat', function (req, res) {

        application.get('io').emit(
            'msgParaCliente',
            { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat', hora: pegaHora() }
        )

        res.render("chat", { dadosForm: dadosForm });
    });
}