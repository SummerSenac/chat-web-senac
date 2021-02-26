module.exports.home = function(application, req, res){
    console.log('chat aqui');
    res.render('index', { validacao : {} });
}