import express from 'express';

const chekSessionUser = () => {
    let result = 0;
    if(!req.session.user){
        req.session = {};
        req.session.user.email = '';
    } else {
        let result = 1;
    }
    return result;

};

export { chekSessionUser };