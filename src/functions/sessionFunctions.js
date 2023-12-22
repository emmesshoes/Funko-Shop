import express from 'express';

const chekSessionUser = (req, res) => {
    let result = false;
    if (!req.session.user || req.session.user.email === '') {
        req.session.user = {
            loggedIn: false,
            isAdmin: false,
            email: '',
            token: '',
        };
        
        //return res.render('ingresar', { loggedIn: req.session.user.loggedIn, email: req.session.user.email, isAdmin: req.session.user.isAdmin });
        
    }  else{
        result = true;
    }
        
}

const iniSessionUser = (req,res) => {
    if(!req.session.user){
        req.session.user = {};
        req.session.user.loggedIn = false;
        req.session.user.isAdmin = false;
        req.session.user.email = '';
        req.session.user.token = '';
        req.session.carrito = {};
        console.log('..................HOLAA SOY iniSessionUser................')
    }
    
}
export { chekSessionUser, iniSessionUser };