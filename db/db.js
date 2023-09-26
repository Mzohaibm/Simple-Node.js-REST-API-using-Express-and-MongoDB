require("dotenv").config()
const { username, password } = process.env;
const connectionStr = "mongodb+srv://" + username + ":" + password + "@cluster0.mwurla7.mongodb.net/user?retryWrites=true&w=majority";

module.exports = connectionStr;