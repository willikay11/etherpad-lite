var _ = require('ep_etherpad-lite/static/js/underscore');

var tags = ['h1', 'h2'];

exports.collectContentPre = function(hook, context){
    var tname = context.tname;
    var state = context.state;
    var lineAttributes = state.lineAttributes
    var tagIndex = _.indexOf(tags, tname);
    if(tname === "div" || tname === "p"){
        delete lineAttributes['block'];
    }
};

// I don't even know when this is run..
exports.collectContentPost = function(hook, context){
    var tname = context.tname;
    var state = context.state;
    var lineAttributes = state.lineAttributes
};