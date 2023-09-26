const mongoose = require("mongoose")


const users = new mongoose.Schema({
  fees: Array,
  books: Array,
  name: String,
  age: String,
  salary: String,
  // name: {
  //   type: String,
  //   required: true,
  //   // default: "i am"
  // },
  // age: {
  //   type: String,
  //   required: true,
  //   // default: "my age"
  // },
  // salary: {
  //   type: String,
  //   required: true
  // },
  // fees: {
  //   type: String,
  //   required: true
  // },
  // books: {
  //   type: Array,
  //   required: true,
  //   // default: ["hello defualt"]
  // },
})
// this model allow us to ineract with database using this Schema
module.exports = mongoose.model("users", users)




