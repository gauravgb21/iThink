var selectedFile;
$('.btn').on('click', function () {
    $('.form').addClass('form--no');
});

$(document).ready(function(){
  document.getElementById('textid').value = "";
  document.getElementById('headid').value = ""; 
});

function loadDoc()
  {
    var string = document.getElementById('textid').value.replace(/\r?\n/g, '<br />');
    var head   = document.getElementById('headid').value.replace(/\r?\n/g, '<br />');
    $.ajax({
      url: '/blog_post',
      type: 'POST',
      data: {value:string,
             title:head  
             },
      success: function(result){
        console.log("request sent to server");
      }
    });

    var div      = document.createElement("div");
    var br       = document.createElement("br");
    var p        = document.createElement("p");
    var hr       = document.createElement("hr");
    var button1  = document.createElement("button");
    var button2  = document.createElement("button");
    var button3  = document.createElement("button");
    var i1       = document.createElement("i");
    var i2       = document.createElement("i");
    var i3       = document.createElement("i");

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
    div.style.width=" 550px";
    
    var img = document.createElement("img");
    img.className+=" w3-circle";
    
    $.get("/blog_img", function(data) {
      //console.log("haan yhi h neeche wala!");
      //console.log(data);
         img.src=data;     
     });

    img.style.height="40px";

    img.style.width="40px";

    var span=document.createElement("span");
    var a=document.createElement("a");
    span.style.marginLeft="7px";
    span.style.fontWeight="bold";

    a.href="/dashboard";
    a.style.textDecoration="none";
    a.style.color="#365899";

    $.get("/blog_name",function(data){
       a.innerHTML=data;
    });
    
    span.appendChild(a);

    var div1=document.createElement("div");
    var headerdiv=document.createElement("div");
    headerdiv.className+=" header";
    headerdiv.style.marginTop="10px";
    var p1=document.createElement("p");
    p1.appendChild(img);
    p1.appendChild(span);
    headerdiv.appendChild(p1);
    var hr1=document.createElement("hr");
    headerdiv.appendChild(hr1);
    var footerdiv=document.createElement("div");
    footerdiv.className+=" footer";


    button1.className+=" w3-button";
    button1.className+=" w3-margin-bottom";
    button1.innerHTML="Like";
    
    button2.className+=" w3-button";
    button2.className+=" w3-margin-bottom";
    button2.innerHTML="Comment";
    
    button3.className+=" w3-button";
    button3.className+=" w3-margin-bottom";
    button3.innerHTML="Share";

    i1.className+=" fa fa-heart-o";
    i2.className+=" fa fa-comments-o";
    i3.className+=" fa fa-share-square-o"; 
    div.appendChild(br);
    div.appendChild(br);
    footerdiv.appendChild(hr);

    
    button1.style.width="200px";
    button2.style.width="200px";
    // i1.style.paddingRight="8px";
    // i2.style.paddingRight="8px";

    footerdiv.appendChild(button1);
    footerdiv.appendChild(button2);
    footerdiv.appendChild(button3);
     div.appendChild(headerdiv);
     div.appendChild(p);
     div.appendChild(footerdiv);
     var list = document.getElementById("postsdiv");
    list.insertBefore(div, list.childNodes[2]);
    document.getElementById('textid').value=" ";
  }


$(document).ready(function(){
    $("#file").on("change",function(event){
        selectedFile=event.target.files[0];
        $("#changebtn").css("display","block");
    });
});


function uploadFile(){
//create root reference
var filename= selectedFile.name;
var storageRef=firebase.storage().ref('/profileImages/'+ filename);
console.log("storage ref is");
console.log(storageRef);
var uploadTask= storageRef.put(selectedFile);
 
 // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
  console.log("there is an error!");
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL = uploadTask.snapshot.downloadURL;
   
   //change dp

    $.ajax({
      url: '/profileupdate',
      type: 'POST',
      data: {value:downloadURL},
      success: function(result){
        console.log("request sent to server");
      }
    });
   
   document.getElementById("dp").src=downloadURL;
  //console.log(downloadURL);
  $("#changebtn").css("display","none");
});

}



