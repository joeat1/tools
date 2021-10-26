function isMatch(str1,str2){ 
    var index = str1.indexOf(str2);
    if(index==-1) return false;
    return true;
}

function check(){
    console.log('location.hostname: '+window.location.hostname);
    if (isMatch(window.location.hostname,'joeat1.github.io') == false)
		{
			if(window.location.hostname!='')
			{
				window.location.href= "https://joeat1.github.io" + window.location.pathname;
			}
		}
}

function changebackground(){
	var imgs =[
		"https://cdn.jsdelivr.net/gh/joeat1/tools@master/res/img/background.jpg",
	   "https://cdn.jsdelivr.net/gh/joeat1/tools@master/res/img/background-bird.jpg",
	];
	console.log("change background")
	var index=Math.floor(Math.random()*2);
	var img = imgs[index];
	document.body.style.backgroundImage="url("+img+")";
	setTimeout("changebackground()", 5000);
}