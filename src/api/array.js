
'use strict';


Array.prototype.noEmpty = function(){ //数组去除空数据的方法
    for(var i = 0; i < this.length; i ++){
        if(!this[i]) {
            this.splice(i, 1);
            i --;
        }
    }
    return this;
}

String.prototype.contains = function(str){
    return this.indexOf(str) != -1;
};


CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) {r = w / 2;}
    if (h < 2 * r){ r = h / 2;}
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.closePath();
    return this;
}

CanvasRenderingContext2D.prototype.drawDashLine = function(x1, y1, x2, y2, dashLength){
    var ctx = this;
    var dashLen = dashLength === undefined ? 5 : dashLength,
    xpos = x2 - x1, //得到横向的宽度;
    ypos = y2 - y1, //得到纵向的高度;
    numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
    //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
    this.beginPath();
    for(var i=0; i<numDashes; i++){
     if(i % 2 === 0){
         ctx.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
         //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
      }else{
          ctx.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
      }
    }
    this.closePath();
    ctx.stroke();
}

