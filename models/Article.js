var mongoose= require("mongoose")

//reference to schema constructor
var Schema= mongoose.Schema;

var ArticleSchema= new Schema({
    title: {
        type: String,
        unique:true
      },
      // `link` is required and of type String
      link: {
        type: String,
      },
      summary:{
        type: String,
        trim: true
      },
      saved:{
          type: Boolean,
          default: false
      }
})

var Article= mongoose.model("Article", ArticleSchema)

module.exports= Article