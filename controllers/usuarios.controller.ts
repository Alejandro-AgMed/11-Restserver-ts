import { Request, Response } from "express";
import Usuario from "../models/usuario.model";

export const getUsuarios = async(req:Request, res:Response) =>{

    const usuarios = await Usuario.findAll()

    //Codigo inicial para hacer las pruebas de los endpoints
    // res.json({
    //     msg:"getUsuarios"
    // })
    res.json({data: usuarios})
}

export const getUsuario = async(req:Request, res:Response) =>{

    const {id} = req.params

    const usuario = await Usuario.findByPk(id)

    if(!usuario) {
        res.status(404).json({msg:"No existe el usuario"})
        return
    }

    //Codigo inicial para hacer las pruebas de los endpoints
    // res.json({
    //     msg:"getUsuario",
    //     id
    // })
    res.json({data: usuario})
}

export const postUsuario = async(req:Request, res:Response) =>{

    const {body} = req

    try {
        // Validando que no exista otro email igual
        const existeEmail = await Usuario.findOne({
            where:{
                email:body.email
            }
        })

        if(existeEmail){
            res.status(400).json({msg: "Ya existe el email"})
            return
        }
        
        const usuario = Usuario.build(body)
        await usuario.save()

        res.json(usuario)
        // res.json({
    //     msg:"postUsuario",
    //     body
    // }

    } catch (error) {
        console.log("🚀 ~ postUsuario ~ error:", error)
        res.status(500).json({msg:"Hable con el administrador"})
    }
    
}

export const putUsuario = async(req:Request, res:Response) =>{

    const {id} = req.params
    const {body} = req
    try {
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            res.status(404).json({
                msg: "No existe un usuario con el id" + id
            })
        }

        await usuario?.update(body)

        res.json({usuario})


    } catch (error) {
        console.log("🚀 ~ postUsuario ~ error:", error)
        res.status(500).json({msg:"Hable con el administrador"})
    }
}

export const deleteUsuario = async(req:Request, res:Response) =>{

    const {id} = req.params

    try {
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            res.status(404).json({
                msg: "No existe un usuario con el id" + id
            })
        }

        //Elimiar fisica
        await usuario?.destroy()

        //Eliminacion logica
        await usuario?.update({estado: false})

    } catch (error) {
        
    }

    res.json({
        msg:"deleteUsuario",
        id
    })
}