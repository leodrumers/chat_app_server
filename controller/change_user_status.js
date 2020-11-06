const User = require("../model/user")

const changeUserStatus = async (uid = '', isOnline = false) => {
    const user = await User.findById(uid);
    user.online = isOnline;
    await user.save();
    return user;
}

module.exports = {
    changeUserStatus
}