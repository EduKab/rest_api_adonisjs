'use strict'

const Proyecto = use('App/Models/Proyecto');
const AuthorizationService = use('App/Services/AuthorizationService');
const Tarea = use('App/Models/Tarea');

class TareaController {
    async index({auth, request, params}){
        const user = await auth.getUser();
        const{ id } = params;
        const proyecto = await Proyecto.find(id);
        AuthorizationService.verificarPermiso(proyecto,user);
        return await proyecto.tareas().fetch();
    }

    async create({auth, request, params}){
        const user = await auth.getUser();
        const {descripcion}=request.all();
        const{id}=params;
        const proyecto = await Proyecto.find(id);
        AuthorizationService.verificarPermiso(proyecto,user);
        const tarea = new Tarea();
        tarea.fill({
            descripcion
        });
        await proyecto.tareas().save(tarea);
        return tarea;
    }

    async destroy({auth, params}){
        const user = await auth.getUser();
        const{ id } = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AuthorizationService.verificarPermiso(proyecto, user);
        await tarea.delete();
        return tarea;
    }

    async update({auth, params, request}){
        const user = await auth.getUser();
        const{ id } = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AuthorizationService.verificarPermiso(proyecto, user);
        tarea.merge(request.only([
            'descripcion',
            'completada'
        ]));
        await tarea.save();
        return tarea;
    }
}

module.exports = TareaController
