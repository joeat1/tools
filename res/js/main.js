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