let sound0 = new Howl({
  src: ['buttonpress1.mp4']
})
let sound1 = new Howl({
  src: ['buttonpress.mp4']
})

function alert(mess){
  let alert = document.querySelector('#alert');
  alert.style.display = 'block';
  let m = document.querySelector('#message');
  m.innerText = mess;
  let ok = document.querySelector('#okay');
  ok.onclick = function(){
    alert.style.display = 'none';
    let val = document.getElementById("value");
    val.focus();
  }
}
document.getElementById("wrap").addEventListener("animationend", function(){
  let top = document.getElementById("showtitle").getBoundingClientRect().height;
  let height = document.getElementById("wrap").getBoundingClientRect().height-document.getElementById("showtitle").getBoundingClientRect().height;
  // console.log(top,height);
  document.getElementById("body").style.top = top+"px";
  document.getElementById("body").style.height =  height+"px";
  document.getElementById("ts").style.marginTop = "-"+document.getElementById("ts").getBoundingClientRect().height/2 +"px";
  document.getElementById("ts").style.marginLeft = "-"+document.getElementById("ts").getBoundingClientRect().width/2 +"px";
});

let arr = [];
let note = document.getElementById("notes");

  if(localStorage.getItem("note")){
    arr = JSON.parse(localStorage.getItem("note"));
    for(let i=arr.length-1; i>=0; i--){
      note.innerHTML += "<li class="+ "li" +" id=" + i + ">" + arr[i].title + '<img class="menu-dot" src="menu-dots.svg"><button class="speak">';
    }
  }
let not;
let title = document.getElementById("showtitle");
let writet = document.getElementById("title");
let body = document.getElementById("body");
let sho = document.getElementById("show");
let hide = document.getElementById("cancel");
let val = document.getElementById("value");
let create_note = document.getElementById("createnote");
let dele = document.getElementById("del");
let write = document.getElementById("create");
let exp = document.getElementById("expand");
writet.onkeyup = function(){
  if(writet.value.length>20){
    writet.disabled = true;
  }
}
// let spks = document.querySelectorAll(".speak");
write.onclick = function(){
  sho.style.display = "block";
  writet.focus();

}
hide.onclick = function(){
  sho.style.display = "none";
  write.disabled = false;
  writet.disabled = false;
  writet.value = "";
  val.value = "";
}
create_note.onclick = function(){
  if(val.value.length>1){
    let t;
    if(writet.value.length>0){
      t = writet.value;
    }else if(val.value.length>20){
      t= val.value[0];
      for(let i=1; i<20; i++){
        t += val.value[i];
      }
    }else{
        t=val.value;
      }

    console.log(t);
    arr.push({"title": t, "body": val.value});
    localStorage.setItem("note", JSON.stringify(arr));
    val.value = "";
    sho.style.display= 'none';
    writet.value = "";
    writet.disabled = false;
    note.innerHTML="";
    note.placeholder="Write new note";
    title.placeholder="Write title for this note"
    write.disabled = false;
    window.scrollTo(0, 0);
    // spk = document.querySelectorAll(".speak");
    for(let i=arr.length-1; i>=0; i--){
      note.innerHTML += "<li class="+ "li" +" id=" + i + ">" + arr[i].title + '<img class="menu-dot" src="menu-dots.svg"><button class="speak">';
    }

  }else{
    console.log("empty write something");
    let p = sound0.play()
    sound0.rate(1.8, p)
    alert("You can't leave body as empty, write something")
  }

}
let deleteall = document.getElementById("delete");
deleteall.onclick = function(){
  note.innerHTML = "";
  arr = [];
  localStorage.setItem("note", JSON.stringify(arr));
  if(note.innerText==""){
    note.innerHTML = '<div id="none"><center><img src="zero-state.svg"><br><br>A fresh start</center></div>';
  }
  not = document.getElementById("none");
  not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
  not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
  window.onresize = function(){
    not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
    not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
  }

}

val.onfocus = function(){
  this.placeholder="";
}
val.onblur = function(){
  if(val.value.length<1){
    this.placeholder = "Write new note";
  }else{
    this.placeholder="";
  }
}
title.onfocus = function(){
  this.placeholder="";
}
title.onblur = function(){
  if(title.value.length<1){
    this.placeholder = "Write new note";
  }else{
    this.placeholder="";
  }
}
window.onresize = function(){
  let top = document.getElementById("showtitle").getBoundingClientRect().height;
  let height = document.getElementById("wrap").getBoundingClientRect().height-document.getElementById("showtitle").getBoundingClientRect().height;
  // console.log(top,height);
  document.getElementById("body").style.top = top+"px";
  document.getElementById("body").style.height =  height+"px";
  document.getElementById("ts").style.marginTop = "-"+document.getElementById("ts").getBoundingClientRect().height/2 +"px";
  document.getElementById("ts").style.marginLeft = "-"+document.getElementById("ts").getBoundingClientRect().width/2 +"px";
  if(window.innerWidth<800){
    document.querySelector('#alert_box').style.marginLeft = '-'+window.innerWidth/2+'px'
  }
}

document.onclick = function(e){
  // console.log(e);
  if(e.target.classList[0]=="speak"){
    let text = e.path[1].innerText;
    let s = new SpeechSynthesisUtterance();
    s.text = text;
    speechSynthesis.speak(s);
    // console.log(e);
  }else if(e.target.tagName == "LI"){
    sound1.play()
    exp.style.display = "block"
    let top = document.getElementById("showtitle").getBoundingClientRect().height;
    let height = document.getElementById("wrap").getBoundingClientRect().height-document.getElementById("showtitle").getBoundingClientRect().height;
    // console.log(top,height);
    document.getElementById("body").style.top = top+"px";
    document.getElementById("body").style.height =  height+"px";
    let i = e.target.id;
    let tp = document.querySelector("#ts");
    tp.innerText = arr[i].title;
    tp.style.marginTop = "-"+tp.getBoundingClientRect().height/2 +"px";
    tp.style.marginLeft = "-"+tp.getBoundingClientRect().width/2 +"px";

    let bp = document.querySelector("#bs");
    bp.innerText = arr[i].body;
  }


}


document.getElementById("back").onclick = function(){
  exp.style.display = "none";
  tp.innerHTML="";
  bp.innerHTML = "";
}
let id;
document.onmousedown = function(e){

  if(window.innerWidth<800){
    if(e.button == 2){
      if(e.target.localName == "li"){
        id=e.target.id;
        document.getElementById("all").style.display = "block";
        document.getElementById("menu").style.display = "block";
        document.getElementById("menu").classList.add("frombottomtotop");
        document.getElementById("menu").style.bottom = "0px";
        document.getElementById("menu").style.top = "auto";
        document.getElementById("menu").style.left = "0px";
        document.getElementById("menu").style.height = "300px";
        document.getElementById("menu").style.width = "100%";
      }else{
        document.getElementById("all").style.display = "none"
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu").classList.remove("frombottomtotop");
        document.getElementById("menu").style.height = "0px";
        document.getElementById("menu").style.width = "0px";
      }

    }else if(e.button==1){
      document.getElementById("all").style.display = "none";
      document.getElementById("menu").style.display = "none";
      document.getElementById("menu").classList.remove("frombottomtotop");
      document.getElementById("menu").style.height = "0px";
      document.getElementById("menu").style.width = "0px";
    }else if(e.button==0){
      document.getElementById("all").style.display = "none";
      document.getElementById("menu").style.display = "none";
      document.getElementById("menu").classList.remove("frombottomtotop");
      document.getElementById("menu").style.height = "0px";
      document.getElementById("menu").style.width = "0px";
    }
    if(e.target.id == "del"){
      let d = sound0.play()
      sound0.rate(1.6, d)
      document.getElementById("menu").style.display = "block";
      arr.splice(id, 1);
      localStorage.setItem("note", JSON.stringify(arr));

      note.innerHTML = "";
      for(let i=arr.length-1; i>=0; i--){
        note.innerHTML += '<li class="li" id=' + i + '>' + arr[i].title + '<img class="menu-dot" src="menu-dots.svg"><button class="speak">';
      }
      if(note.innerText==""){
        note.innerHTML = '<div id="none"><center><img src="zero-state.svg"><br><br>A fresh start</center></div>';
        not = document.getElementById("none");
        not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
        not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
        window.onresize = function(){
          not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
          not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
        }
      }
      document.getElementById("menu").style.display = "none";
    }

  }else{
    if(e.button==2){
      if(e.target.localName == "li"){
        id=e.target.id;
        document.getElementById("menu").style.display = "block";
        document.getElementById("menu").style.top = e.clientY+"px";
        document.getElementById("menu").style.left = e.clientX+"px";
        document.getElementById("menu").style.height = "300px";
        document.getElementById("menu").style.width = "200px";
      }else{
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu").style.height = "0px";
        document.getElementById("menu").style.width = "0px";
      }
    }else if(e.button==1){
      document.getElementById("menu").style.display = "none";
      document.getElementById("menu").style.height = "0px";
      document.getElementById("menu").style.width = "0px";
    }else if(e.button==0){
      document.getElementById("menu").style.display = "none";
      document.getElementById("menu").style.height = "0px";
      document.getElementById("menu").style.width = "0px";
    }

    if(e.target.id == "del"){
      document.getElementById("menu").style.display = "block";
      arr.splice(id, 1);
      localStorage.setItem("note", JSON.stringify(arr));
      console.log(id, arr);
      note.innerHTML = "";
      for(let i=arr.length-1; i>=0; i--){
        note.innerHTML += '<li class="li" id=' + i + '>' + arr[i].title + '<img class="menu-dot" src="menu-dots.svg"><button class="speak">';
      }
      if(note.innerText==""){
        note.innerHTML = '<div id="none"><center><img src="zero-state.svg"><br><br>A fresh start</center></div>';
        not = document.getElementById("none");
        not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
        not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
        window.onresize = function(){
          not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
          not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
        }
      }
      document.getElementById("menu").style.display = "none";
    }

  }
  if(e.target.classList[0] == 'menu-dot'){
    // menu
    document.getElementById("all").style.display = "block";
    document.getElementById("menu").style.display = "block";
    document.getElementById("menu").classList.add("frombottomtotop");
    document.getElementById("menu").style.bottom = "0px";
    document.getElementById("menu").style.top = "auto";
    document.getElementById("menu").style.left = "0px";
    document.getElementById("menu").style.height = "300px";
    document.getElementById("menu").style.width = "100%";
    id = e.path[1].id
    document.onmouseup = function(e){
      if(e.target.id == "del"){
        document.getElementById("menu").style.display = "block";
        arr.splice(id, 1);
        localStorage.setItem("note", JSON.stringify(arr));
        console.log(id, arr);
        note.innerHTML = "";
        for(let i=arr.length-1; i>=0; i--){
          note.innerHTML += '<li class="li" id=' + i + '>' + arr[i].title + '<img class="menu-dot" src="menu-dots.svg"><button class="speak">';
        }
        if(note.innerText==""){
          note.innerHTML = '<div id="none"><center><img src="zero-state.svg"><br><br>A fresh start</center></div>';
          not = document.getElementById("none");
          not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
          not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
          window.onresize = function(){
            not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
            not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
          }
        }
        document.getElementById("menu").style.display = "none";
      }
    }
  }

}

document.oncontextmenu = function(e){
  e.preventDefault();
}
if(note.innerText==""){
  note.innerHTML = '<div id="none"><center><img src="zero-state.svg"><br><br>A fresh start</center></div>';
  not = document.getElementById("none");
  not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
  not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
  window.onresize = function(){
    not.style.top = window.innerHeight/2 - not.getBoundingClientRect().height/2 +"px";
    not.style.left = window.innerWidth/2 - not.getBoundingClientRect().width/2 +"px";
  }
}
let n = document.querySelector('#circl')
n.onclick = function(){
  sho.style.display = "block";
  writet.focus();
}
if(window.innerWidth<800){
  document.querySelector('#alert_box').style.marginLeft = '-'+window.innerWidth/2+'px'
}

function scroll(func){
  let m
  let y = 0
  let arr = []
  let sum = 0
  window.onscroll = function(){
    let x = y
    y = window.scrollY
    if(x>y){
      arr.push(1)
      if(sum>9){
        m = "up"
      }
    }else{
      arr.push(0)
      if(sum<4){
        m = "down"
      }
    }
    sum = 0
    if(arr.length>11){
      for(let i=arr.length-11; i<arr.length; i++){
        sum+=arr[i]
      }
    }
    func(m)
  }

}

let t = document.querySelector('#bot')
let k = document.querySelector("#circl")
scroll(function(e){
  if(e=="down"){
    k.classList.add("ftoc")
    t.classList.add("ftoc")
  }else{

    t.classList.remove("ftoc")
    k.classList.remove("ftoc")
  }
})
