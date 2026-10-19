export default function authCheck(req, res, next){
    const isAuthenticated = req.isAuthenticated();
    if(isAuthenticated){
        return next();
    }
    res.render("login", {authenticatedUser: isAuthenticated});
}