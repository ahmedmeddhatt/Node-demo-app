
module.exports=(schema)=>{
    return (req,res,next)=>{
        const valid=[]

        const validationResult= schema.body.validate(req.body);
        if(validationResult.error){
            console.log("error1")
            valid.push(validationResult.error.details[0].message)
        }
        if(valid.length){
              console.log("error2")

            res.status(400).send(valid.join())
        }
        next();
        return;
    }
}