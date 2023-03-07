const {Task}=require('../models');
const {User}=require('../models');

const read=async(req,res)=>{
    try{
        let query=await Task.findAll({include:[{model: User, as:'user'}]});
        if(query){
            res.json(query);
        }
        else{
            res.status(404).send('Error e la consulta');
        }
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
}

const readOne=async(req,res)=>{
    try{
        let id=req.params.id;
        let query=await Task.findOne({where:{id:id}, include:[{model: User, as:'user'}]});
        if(query){
            res.json(query);
        }
        else{
            res.status(404).send(`No se encontró una tarea con el id ${id}`);
        }
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
}

const add=async(req,res)=>{
    try{
        let taskObj=req.body;
        Task.create(taskObj);
        res.status(201).send('ok');
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
}

const update=async(req,res)=>{
    try{
        let id=Number(req.params.id);
        let taskObj=req.body;
        if(isNaN(id)){
            return res.status(400).send('El id proporcionado no es válido');
        }
        let query=await Task.findByPk(id);
        if(!query){
            return res.status(404).send(`No se encontró una tarea con el id ${id}`);
        }
        await query.update(taskObj);
        res.status(200).send('Tarea actualizada');
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
}

const remove=async(req,res)=>{
    try{
        let id=Number(req.params.id);
        if(isNaN(id)){
            return res.status(400).send('No se proporcionó un id válido');
        }
        let query=await Task.findByPk(id);
        if(!query){
            return res.status(404).send(`La tarea con el id ${id} no se puede borrar porque no existe`)
        }
        await query.destroy({where: {id:id}});
        res.status(200).send('Tarea eliminada');
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
}


module.exports={read,readOne,add,update,remove}