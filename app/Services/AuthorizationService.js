const AccesoProhibidoException = use('App/Exceptions/AccesoProhibidoException')
const RecursoNoEncontradoException = use('App/Exceptions/RecursoNoEncontradoException')

class AuthorizationService{
    verificarPermiso(recurso, user){
        if(!recurso || recurso==null){
            throw new RecursoNoEncontradoException();
        }

        if(recurso.user_id !== user.id){
            throw new AccesoProhibidoException();
        };
    }
}

module.exports = new AuthorizationService