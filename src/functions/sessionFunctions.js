import express from 'express';

const chekSessionUser = (req, res) => {
    let result = false;
    
    if (!req.session.user) {
        req.session.user = {
            loggedIn: false,
            isAdmin: false,
            email: '',
            token: ''
        };
    } else {
        result = true;
    }

    

    return result;
};

const iniSessionUser = (req,res) => {
    req.session.user = {};
    req.session.user.loggedIn = false;
    req.session.user.isAdmin = false;
    req.session.user.email = '';
    req.session.user.token = '';
}
export { chekSessionUser, iniSessionUser };