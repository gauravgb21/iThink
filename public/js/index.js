$('.btn').on('click', function () {
    $('.form').addClass('form--no');
});


function loadDoc()
  {
    var string=document.getElementById('textid').value.replace(/\r?\n/g, '<br />');
    $.ajax({
      url: '/users/blog_post',
      type: 'POST',
      data: {value:string},
      success: function(result){
        console.log("request sent to server");
      }
    });

    var div=document.createElement("div");
    var br=document.createElement("br");
    var p=document.createElement("p");
    var hr=document.createElement("hr");
    var button1=document.createElement("button");
    var button2=document.createElement("button");
    var i1=document.createElement("i");
    var i2=document.createElement("i");

    p.innerHTML=string;
    p.style.marginTop="40px";

    div.className+=" w3-container";
    div.className+=" w3-card";
    div.className+=" w3-white";
    div.className+=" w3-round";
    div.className+=" w3-margin";
    div.className+=" w3-hover-shadow";
    div.className+=" w3-theme-l5";
    div.className+=" wrap";
    div.style.width=" 480px";
    
    var div1=document.createElement("div");
    var headerdiv=document.createElement("div");
    headerdiv.className+=" header";
    headerdiv.style.marginTop="20px";
    headerdiv.appendChild(hr);
    var footerdiv=document.createElement("div");
    footerdiv.className+=" footer";

    button1.className+=" w3-button";
    button1.className+=" w3-margin-bottom";
    button1.innerHTML="Like";
    
    button2.className+=" w3-button";
    button2.className+=" w3-margin-bottom";
    button2.innerHTML="Comment";

    i1.className+=" fa fa-thumbs-up";
    i2.className+=" fa fa-comment";

    div.appendChild(br);
    div.appendChild(br);
    footerdiv.appendChild(hr);

    button1.style.marginRight="4px";
    button1.appendChild(i1);


    button2.appendChild(i2);

    footerdiv.appendChild(button1);
    footerdiv.appendChild(button2);

     div.appendChild(headerdiv);
     div.appendChild(p);
     div.appendChild(footerdiv);
     var list = document.getElementById("postsdiv");
    list.insertBefore(div, list.childNodes[2]);
    document.getElementById('textid').value=" ";
  }


$(document).ready(function(){
    $("#profilepc").mouseover(function(){
        $(".btn1").css("display", "block");
    });
    $("#profilepc").mouseout(function(){
        $(".btn1").css("display", "none");
    });
});
