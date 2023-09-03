const Models = require('./models/index')

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');


    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.on('addFrind', async (data) => {
      let chat = await Models.Friend.findOne({
        $or: [
          { user1: data.user1, user2: data.user2 },
          { user1: data.user2, user2: data.user1 },
        ],
      })
      console.log(chat,'==========')
      if (chat) {
        return io.emit('addFrind', "this users already fried");
      }
      chat = await Models.Friend.create(data)
      io.emit('addFrind', chat);
    });


    socket.on('chat_message', async (data) => {
      await Models.Messages.create(data)
      const chat = await Models.Messages.findOne({
        $or: [
          { sender: data.sender, receiver: data.receiver },
          { sender: data.receiver, receiver: data.sender },
        ],
      })
        .populate("sender receiver")
        .sort({ timestamp: -1 });
      io.emit('chat_message', chat);
    });


    socket.on('get_message', async (data) => {
      const chat = await Models.Messages.find({
        $or: [
          { sender: data.sender, receiver: data.receiver },
          { sender: data.receiver, receiver: data.sender },
        ],
      }).populate("sender receiver").sort({ timestamp: -1 });
      io.emit('get_message', chat);
    });


    socket.on('chat_list', async(data) => {
      let chat = await Models.Friend.find({
        $or: [
          { user1: data.userid },
          {  user2: data.userid },
        ],
      }).populate("user1 user2").sort({ timestamp: -1 });
      io.emit('chat_list', chat);
    });
  });
};