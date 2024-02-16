const mongoose = require('mongoose');

function changeObjectId(id){
    return new mongoose.Types.ObjectId(id);
}

module.exports = changeObjectId;