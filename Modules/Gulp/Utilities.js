var gulp = require("gulp");


module.exports = {
    getExecutingTask:function(){
        return (process.argv.length > 2 && process.argv[2] != "-")?process.argv[2] : "default";
    }
}