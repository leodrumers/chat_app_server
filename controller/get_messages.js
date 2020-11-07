const Message = require('../model/message');

const getMessages = async (req, res) => {

    const myUid = req.uid;
    const messagesFrom = req.params.from;

    const messages = await Message.find({
        $or: [{ from: myUid, to: messagesFrom }, { from: messagesFrom, to: myUid }]
    })
        .sort({ createdAt: 'desc' })
        .limit(30);

    res.json({
        ok: true,
        messages
    });

}

module.exports = {
    getMessages
}