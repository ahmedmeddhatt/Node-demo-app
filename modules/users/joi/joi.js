const joi = require('@hapi/joi')


module.exports= {
    registerJoi: {
        body: joi.object().required().keys({
            name: joi.string().required().min(6) ,
            email: joi.string().required().min(6).email(),
            password:joi.string().required().min(6),
            date: joi.date(),
            role:joi.string()
            .valid('admin' , 'editor', 'viewer')
            .default('viewer')

        })
    },
    loginJoi:{
        body: joi.object().required().keys({
            email: joi.string().required().min(6).email()
             ,
            password:joi.string().required().min(6)
           ,
        })
    }
}