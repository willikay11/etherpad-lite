var underscore = require('ep_etherpad-lite/static/js/underscore');
var padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;
var padEditor;

var tags = ['h1', 'h2'];

exports.aceRegisterBlockElements = function (name, context) {
    return tags;
}

exports.aceDomLineProcessLineAttributes = function (name, context) {
    console.log('context', context)
    var cls = context.cls;
    var exp = /(?:^| )block:([^>]*)/;

    var block = exp.exec(cls);
    console.log(block);
    if (block) {
        const modifier = {
            preHtml: block[1]+'>Signature',
            postHtml: '</div>',
            processedMarker: true
        };
        return [modifier];
    }

    return [];
}

exports.aceAttribsToClasses = function(hook, context){
    if(context.key === 'block'){
        return ['block:' + context.value ];
    }
}

function insertDroppedItem(rep, element){
    var documentAttributeManager = this.documentAttributeManager;
    var lineNumber = rep.selStart[0];

    console.log('element: '+element);

    documentAttributeManager.setAttributeOnLine(lineNumber, 'block', element);
}

exports.aceInitialized = function(hook, context){
    var editorInfo = context.editorInfo;
    editorInfo.ace_doInsertDroppedItem = underscore(insertDroppedItem).bind(context);
}

exports.postAceInit = function (hook, context) {
    context.ace.callWithAce(function (ace) {
        const doc = ace.ace_getDocument();

        const innerBody = $(doc).find('#innerdocbody')
        innerBody.on('drop', function (e) {
            e = e.originalEvent;
            const storage = window.localStorage;
            const id = storage.getItem('currentItemDragged');
            const clientX = e.clientX + 'px';
            const clientY = e.clientY + 'px';
            console.log('dropped', e);
            const randomId =  Math.floor((Math.random() * 100000) + 1);

            // get the class name of the item dropped
            let element = '';
            switch (id) {
                case 'date':
                    element = '<div id="date-'+randomId+'" class="pad-signature">Date</div>'
                    break;
                case 'signature':
                    element = '<div id="signature-'+randomId+'" class="pad-signature" style="left: '+clientX+'; top: '+clientY+';">Signature</div>'
                    break;
                case 'check-box':
                    element = '<div>Check Box</div>'
                    break;
                case 'text-field':
                    element = '<div>Text Field</div>'
                    break;
                default:
                    element = '<div>Default</div>'
            }

            // reconstruct the item and pass it to doInsertDroppedItem method
            context.ace.callWithAce(function (ace) {
                var rep = ace.ace_getRep();
                ace.ace_doInsertDroppedItem(rep, element);
            }, 'div', true);
        });

        innerBody.on('dragend', function (e) {
            console.log('dragend', e);
        }, 'div', true)
        // console.log(doc, innerBody);
    });
}

exports.aceEditorCSS = function(hook_name, cb){return ["/ep_signature_drag_n_drop/static/css/ace.css"];} // inner pad CSS