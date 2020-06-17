var eejs = require('ep_etherpad-lite/node/eejs');
var settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_editorContainerBox = function (hook_name, args, cb) {
    args.content = args.content + eejs.require('ep_signature_drag_n_drop/templates/index.ejs');
    return cb();
}

function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    const draggableElement = document.getElementById(event.target.id);
    event.currentTarget.style.backgroundColor = 'yellow';
};