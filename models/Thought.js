const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now, 
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get( function() {
        if (this.reactions === undefined) {
            return 0;
        } else {
        return this.reactions.length; }
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;