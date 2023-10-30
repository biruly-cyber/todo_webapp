import mongoose  from "mongoose";

const itemSchema =  mongoose.Schema({
    itemName:{
        type:String,
        required: true,
        trim:true
    },
    itemQty:{
        type:Number,
        required:true
    },
    itemPrice:{
        type:Number,
        required: true
    },
    itemUnit:{
        type:String,
        required:true
    },
    itemTotalAmt:{
        type:Number,
        required:true
    },
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"buyerdetails",
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
})

export const ProductDetails = mongoose.model("product_details", itemSchema);