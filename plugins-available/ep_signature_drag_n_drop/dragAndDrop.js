var eejs = require('ep_etherpad-lite/node/eejs');
var settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_editorContainerBox = function (hook_name, args, cb) {
    args.content = args.content + "<div style='height: 100%; width: 350px; background: #ffffff'>Feedback</div>";
    return cb();
}