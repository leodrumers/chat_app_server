const User = require("../model/user")
const Message = require("../model/message")

const saveMessage = async (payload) => {
    try {
        const message = new Message(payload);
        await message.save();

        return true;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveMessage
}