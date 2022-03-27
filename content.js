"use strict"

// 拡張機能のID
var extensionId = chrome.runtime.id;

// パーツを追加する
var imgelem = document.getElementById("prevNextCtrl");
var addCode = "<img src='chrome-extension://"+extensionId+"/img/face.png' class='drag_img' style='z-index: 50; height: 20%; position: relative; cursor:pointer;' id='drag_img'></img><div class='img-buttons'><input class='img-button' type='button' value='←' id='kaitenLeft'><input class='img-button' type='button' value='→' id='kaitenRight'><input class='img-button' type='button' value='+' id='zoomIn'><input class='img-button' type='button' value='-' id='zoomOut'></div>";
imgelem.insertAdjacentHTML('beforeend', addCode);

console.log(addCode);

// 画像をドラッグ可能にする
var dragobject={
  z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,
  initialize:function(){
    document.onmousedown=this.drag
    document.onmouseup=function(){this.dragapproved=0}
  },
  drag:function(){
    var evtobj=window.event;
    this.targetobj=event.srcElement;
    if (this.targetobj.className=="drag_img"){
      this.dragapproved=1
      if (isNaN(parseInt(this.targetobj.style.left))){this.targetobj.style.left=0}
      if (isNaN(parseInt(this.targetobj.style.top))){this.targetobj.style.top=0}
      this.offsetx=parseInt(this.targetobj.style.left)
      this.offsety=parseInt(this.targetobj.style.top)
      this.x=evtobj.clientX
      this.y=evtobj.clientY
      if (evtobj.preventDefault)
        evtobj.preventDefault()
      document.onmousemove=dragobject.moveit
    }
  },
  moveit:function(){
    var evtobj=window.event;
    if (this.dragapproved==1){
      this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
      this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
      return false
    }
  }
}
dragobject.initialize();

var d = 0;

// 右に10度傾ける
const kaitenRight = document.getElementById("kaitenRight");
var e = document.getElementById("drag_img");

kaitenRight.addEventListener("click", function() {
  d = d + 10;
  e.style.transform = "scale("+width+") rotate(" + d + "deg)";
});

// 左に10度傾ける
const kaitenLeft = document.getElementById("kaitenLeft");

kaitenLeft.addEventListener("click", function() {
  d = d - 10;
  e.style.transform = "scale("+width+") rotate(" + d + "deg)";
});

// 画像をズームインする
const zoomIn = document.getElementById("zoomIn");

var width = 1;

zoomIn.addEventListener("click", function() {
  width = width + 0.2;
  e.style.transform = "scale("+width+") rotate(" + d + "deg)";
});

// 画像をズームアウトする
const zoomOut = document.getElementById("zoomOut");

zoomOut.addEventListener("click", function() {
  width = width - 0.2;
  e.style.transform = "scale("+width+") rotate(" + d + "deg)";
});
