function getMainPage(req, res){
    const authCheck = req.isAuthenticated();
    console.log(req.user);
    res.render("home", { user: req.user, authenticatedUser: authCheck })
}

export { getMainPage };
