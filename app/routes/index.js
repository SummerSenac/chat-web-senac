module.exports = function (application) {

    application.get('/', function (req, res) {
        // application.app.controllers.index.home( application, req, res);
        var dadosForm = req.body;
        console.log('dados recebidos', dadosForm);

        // req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
        // req.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 caracteres').len(3, 15);

        // var erros = req.getValidationResult()

        res.render('index', {validacao : {errors : []}});
        // if (erros) {
        //     return;
        // }

        // res.render('chat');
    });

}