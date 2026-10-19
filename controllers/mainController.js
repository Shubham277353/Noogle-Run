function getMainPage(req, res){
    const authCheck = req.isAuthenticated();
    console.log(authCheck);
    res.render("home", { authenticatedUser: req.user })
}

export { getMainPage };
