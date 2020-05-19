const mongoose = require('mongoose');
const aws      = require('aws-sdk');
const fs       = require('fs');
const path     = require('path');

const { promisify } = require('util');

const s3 = new aws.S3();

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: { 
        type: Number, 
        default: 0 
    },
    image: String,
    imageKey:  String,
    imageUrl: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

productSchema.pre('save', function() {
    if(!this.imageUrl){
        this.imageUrl = `${process.env.APP_URL}/files/${this.imageKey}`
    }
});

productSchema.pre('remove', function() {
    if(process.env.STORAGE_TYPE === "s3"){
        return s3.deleteObject({
            Bucket: 'uploadfafreiretech',
            Key: this.imageKey
        })
        .promise();
    } else{
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'upload', this.imageKey));
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;