const {User}=require('../models');
const {Task}=require('../models');

const read=async(req,res)=>{
    try{
        let query=await User.findAll({include:[{model: Task, as:'tasks'}]});
        if(query){
            res.json(query);
        }
        else{
            res.status(404).send('Error en la consulta');
        }
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
};

const readOne=async(req,res)=>{
    try{
        let id=req.params.id;
        let query=await User.findOne({where:{id:id}, include: [{model: Task,as:'tasks'}]});
        if(query){
            res.json(query);
        }
        else{
            res.status(404).send(`No se encontró el usuario con el id ${id}`);
        }
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
}

const add=async(req,res)=>{
    try{

        let userObj=req.body;
        await User.create(userObj);
        res.status(201).send('Ok');
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
}

const update=async(req,res)=>{
    try{
        let id=Number(req.params.id);
        let userObj=req.body;
        if(isNaN(id)){
            res.status(400).send('El id proporcionado no es válido');
        }
        let query=await User.findByPk(id);
        if(!query){
            res.status(404).send(`No se encontró un usuario con el id ${id}`);
        }
        await query.update(userObj);
        res.status(200).send('Usuario actualizado');
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
        let query=await User.findByPk(id);
        if(!query){
            return res.status(404).send(`El usuario con el id ${id} no se puede borrar porque no existe`)
        }
        await query.destroy({where:{id: id}});
        res.status(200).send('Usuario eliminado');
    }
    catch(error){
        res.status(500).send(`Error en el servidor: ${error}`);
    }
}


module.exports={read,readOne,add,update,remove};