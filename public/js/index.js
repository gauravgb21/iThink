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
    p.style.marginTop="20px";

    div.className+=" w3-container";
    div.className+=" w3-card";
    div.className+=" w3-white";
    div.className+=" w3-round";
    div.className+=" w3-margin";
    div.className+=" w3-hover-shadow";
    div.className+=" w3-theme-d5";
    div.style.width=" 500px";
    
    button1.className+=" w3-button";
    button1.className+=" w3-theme-d1";
    button1.className+=" w3-margin-bottom";
    
    button2.className+=" w3-button";
    button2.className+=" w3-theme-d2";
    button2.className+=" w3-margin-bottom";

    i1.className+=" fa fa-thumbs-up";
    i2.className+=" fa fa-comment";

    div.appendChild(p);
    div.appendChild(br);
    div.appendChild(br);
    div.appendChild(hr);

    button1.style.marginRight="4px";
    button1.appendChild(i1);


    button2.appendChild(i2);

    div.appendChild(button1);
    div.appendChild(button2);
     var list = document.getElementById("postsdiv");
    list.insertBefore(div, list.childNodes[2]);
    document.getElementById('textid').value=" ";
  }

