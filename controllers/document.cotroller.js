const crypto = require('crypto');
const Jimp = require('jimp');
const fs =require('fs-extra');
const db = require("../models");
const path = require('path');
const Document = db.documents;


const filesave= async(modelName,base64)=>{
    var name = crypto.createHash('md5').update(''+Date.now()).digest('hex');
    var ext=base64.split(';')[0].split('/')[1];
    var dirname=path.join( 'public')+'/uploads/'+modelName;
    var filename=name+'.'+ext
    var type=base64.substring("data:".length, base64.indexOf("/"))
    let base64Image = base64.split(';base64,').pop();
    var realFile=Buffer.from(base64Image,'base64');
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
    }
    fs.writeFileSync(dirname+'/'+filename, realFile);
    // await jimp(bigPath,smallPath,256,70)
    return {
        path:'/'+modelName+'/'+filename,
        type
    }
}

const saveDocument = async(modelName,modelId, base64,order) => {
    let obj = await filesave(modelName,base64)
    let data = await Document.create({
        modelName,
        modelId,
        path:obj.path,
        type:obj.type,
        order
    })
    if (data) {
        return true
    }
    return false
}

const getImage=async (path,width,height)=>{

    let dirname=path.join( 'public')+'/uploads/cache/'+path;
    if (!fs.existsSync(dirname)) {
        console.log('Found file');
        await imageResize(
            path.join( 'public')+'/uploads/'+path,
            imgWPath,
            width,
            70,
            height,)
    }
}

const cacheName=(path)=>{

}

const saveDocuments = async(modelName,modelId, base64array) => {
    let i=0
    base64array.forEach(async (base64) => {
        i++
        await saveDocument(modelName,modelId, base64, i)
    });
}


const imageResize = async (imgRPath, imgWPath, width,  quality,height = Jimp.AUTO,) => {
	const image = await Jimp.read(imgRPath);
	image.resize(width, height);
	image.quality(quality);
	await image.writeAsync(imgWPath);
}
const filedownload = async (req, res, next)=>{
    var filename= req.params.filename;
    var dirname=path.join( 'public')+'/uploads/'+filename.split('.')[1];
    res.download(dirname+'/'+filename);
    res.status(200);
}
module.exports = {
	saveDocument,
	saveDocuments,
	getImage,
};