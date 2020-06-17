exports.onDragStart = function (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    const draggableElement = document.getElementById(event.target.id);
    event.currentTarget.style.backgroundColor = 'yellow';
};

exports.test = function () {
    console.log("Test");
}