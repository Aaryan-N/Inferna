const {connectDBs} = require("../../hydra");
const { default : mongoose } = require("mongoose");

const guildSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true
    }, guildName: {
        type: String,
        required: true
    }, guildCreatedAt: {
        type: Date,
        required: true,
    }, guildCreatedAtTimestamp: {
        type: Number,
        required: true,
    }, guildClientJoinedAt: {
        type: Date,
        required: true,
    }, guildJoinedCurrently: {
        type: Boolean,
        required: true,
        default: false,
    }
})

const { usersDb } = connectDBs();

module.exports = usersDb.model('guilds', guildSchema)

