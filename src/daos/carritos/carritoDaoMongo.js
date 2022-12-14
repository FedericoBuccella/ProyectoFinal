import ContenedorMongo from '../../contenedores/contenedorMongo.js'
import mongoose from 'mongoose';

export default class CarritoDaoMongo extends ContenedorMongo{
    constructor(){
        super('carritos', new mongoose.Schema({
            user: { type: String, require: true, max: 200, unique:true},
            timestamp: {type: String, required: true},
            productos: {type: Array, required: true}
        }))
    }

    async newCart(user){
        console.log("USER: ",user)
        if(! await this.collection.findOne({ username: user})){
            const doc = new this.collection({ username: user ,timestamp: Date.now(), products: ''})
            console.log("dentro del if", doc)
            await doc.save();
            return doc
        }else{
            console.log("carrito ya creado")
        }
        

        
    }

    async cartByUsername(user){
        const doc = await this.collection.findOne({ username: user});
        return doc;
    }

    async update(id,productos){
        await this.collection.updateOne({_id:id}, {productos})   
        const elemento = await this.getById(id)  
        return elemento
    }

}