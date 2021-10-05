//通过动画显示数字
function showNumberWihthAnimation(i,j,randNumber){
	//console.log(i,j,randNumber);
	var numberCell=$('#number-cell-'+i+'-'+j);  //#符号很容易被忽视 ID
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width:cellWidth,
		height:cellWidth,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},500);

}

//通过动画显示移动的效果
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);

}