'use strict';

var CardView = function(color, x, y){
    this.initialize(color, x, y);
};

CardView.prototype = new createjs.Shape();
CardView.prototype.initialize = function(color, x, y) {
    var cardColor = color;
    var isFlipped = false;
    var vm = this;
    createjs.Shape.apply(vm);
    setColor('black');

    vm.flip = function() {
        if (!isFlipped) {
            setColor(cardColor);
        } else {
            setColor('black');
        }
        isFlipped = !isFlipped;
    };

    vm.getColor = function() {
        return cardColor;
    };

    function setColor(color) {
        vm.graphics.beginFill(color).drawRect(x, y, 50, 40);
    }
};