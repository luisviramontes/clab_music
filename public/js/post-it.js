var postNumber = 0

var Board = function( selector ) {

  var $elem = $( selector );



  function initialize() {
    $elem.on("click", newPostIt);
  };

  initialize();
};

var PostIt = function() {

  function initialize() {
    if(postNumber != 0){
      $("#bod").append('<div class="post-it" id="'+postNumber+'"><div class="header"><a href="#">X</a></div><div id="editor_'+postNumber+'" onchange="agrega_text();" contenteditable="true" class="content"></div></div>');
      $("#"+postNumber).css({'top': event.pageY, 'left': event.pageX});
      $(".post-it").draggable({handle: ".header"});
      //$(".content").on("click", stopPostItCreation);
      $("a").on("click", deletePostIt);
  
      document.getElementById('editor_'+postNumber).addEventListener("blur", function() {
        agrega_text(postNumber);
    }, false);
  
    }
  };

  function stopPostItCreation(e){
    e.stopPropagation();
  };

  function deletePostIt(e){
    e.stopPropagation();
    var $parent = $(this.parentElement.parentElement);
    $parent.remove();
  };

  initialize();
};

$(function() {
  new Board('#board');
});

function newPostIt() {
  new PostIt;
  postNumber += 1;
};

function eliminar_obs(value){    
  $.ajax({
      url: "/eliminar_obs/" + value,
      type: 'get',
      method: 'get',
      success: function (date) {
      }
  });
  $('#post_id_'+value).remove();
}

function agrega_text(id){
  id=id-1;
  id='editor_'+id;
  id_exp=document.getElementById('aux_exp').value;

  var e = document.getElementById(id);
  var textNode = e.childNodes[0]; //text node is the first child node of a span
  
  var r = document.createRange();
  var startIndex = 0;
  var endIndex = textNode.textContent.length;
  r.setStart(textNode, startIndex);
  r.setEnd(textNode, endIndex);
  
  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(r);
  text=textNode.data
  document.getElementById('aux_obs').value=text
  dataString = $('#aux_obs').serialize(); // carga todos 
  $.ajax({
    url: "/agregar_obs/" +id_exp+"/"+ text,
    type: 'get',
    method: 'get',
    data: dataString,
    success: function (date) {
      location.reload();
    }
});
location.reload();
//  document.getElementById(id).innerHTML;
}

function edita_text(id){
  id_aux='post_edit_'+id;
  var e = document.getElementById(id_aux);
  var textNode = e.childNodes[0]; //text node is the first child node of a span
  text=textNode.textContent
  document.getElementById('aux_obs').value=text
  dataString = $('#aux_obs').serialize(); // carga todos 
  $.ajax({
    url: "/actualizar_obs/" +id,
    type: 'get',
    method: 'get',
    data: dataString,
    success: function (date) {  
      location.reload();
    }
});
//  document.getElementById(id).innerHTML;
}


function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function holamundo(){
  alert('cambio');
}