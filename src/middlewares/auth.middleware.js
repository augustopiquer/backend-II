export function onlyAdmin(req, res, next){
    if (req.user.role === 'admin'){
        next()
    } else {
        res.status(403).send('<h2>Access denied</h2>')
    }   
}

export function onlyUser(req,res,next){
    if (req.user.role === 'user'){
        next()
    } else {
        res.status(403).send('<h2>Access denied</h2>')
    }   
}