const fs = require('fs-extra');

function deleteFiles(files, callback){
    var i = files.length;
    files.forEach(function(filepath){
        fs.unlink(filepath.path, function(err) {
        i--;
        if (err) {
            callback(err);
            return;
        } else if (i <= 0) {
            callback(null);
        }
        });
    });
}

module.exports = {
    deleteFiles
}