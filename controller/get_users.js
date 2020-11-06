const { response } = require('express');
const User = require('../model/user');



const getUsers = async (req, res = response) => {

    const startFrom = Number(req.query.startFrom) || 0;
    const show = Number(req.query.show) || 20;

    const users = await User
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .sort('name')
        .skip(startFrom)
        .limit(show)
        ;

    res.json({
        ok: true,
        users
    });
}

module.exports = {
    getUsers
}