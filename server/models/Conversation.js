const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema({
    members: [
      {
        sender: String,
        receiver: String,
      },
    ],
  },
  { timestamps: true }
);
const Conversation = model('Conversation', ConversationSchema);


module.exports = Conversation;
