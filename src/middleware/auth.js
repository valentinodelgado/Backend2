export function onlyAdmin(req,res,next){
    if(req.user.role === "admin"){
        return next()
    }else{
        return res.status(403).send("Acceso denegado, se permiten solo administradores")
    }
}

export function onlyUser(req,res,next){
    if(req.user.role === "user"){
        return next()
    }else{
        return res.status(403).send("Acceso denegado, se permiten solo usuarios")
    }
}