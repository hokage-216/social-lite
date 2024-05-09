const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            },
        },
        thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

// virtual that retrieves the length of users friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;