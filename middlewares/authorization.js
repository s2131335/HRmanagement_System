module.exports = function authorization(permission){
    return (req, res, next) => {
        
        if (req.session.user == undefined || (req.session.user.role !== permission && req.session.user.role !== "ADMIN")) {
            console.log("Not permitted, redirect");
            res.status(400).redirect('/');
        }
        else{
            next();
        }
    };
};