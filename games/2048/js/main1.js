var nums = new Array();
var score=0;
var hasConflicted=new Array();//表示是否已叠加，用来解决重复问题

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function(){
	newgame();
});

//开始新游戏
function newgame(){
	if(documentWidth>500){
		containerWidth=500;
		cellWidth=100;
		cellSpace=20;
	}else{
	//设置移动端尺寸
		settingForMobile();
	}

	init();

	//在随机的两个单元格生成数字
	generateOneNumber();
	generateOneNumber();

}

function settingForMobile(){
	$('#header .wrapper').css('width',containerWidth);
	
	$('#grid-container').css('width',containerWidth-cellSpace*2);
	$('#grid-container').css('height',containerWidth-cellSpace*2);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',containerWidth*0.02);

	$('.grid-cell').css('width',cellWidth);
	$('.grid-cell').css('height',cellWidth);
	$('.grid-cell').css('border-radius',cellWidth*0.06);
}

//初始化页面
function init(){
	//初始化单元格位置
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}

	//初始化数组  使所有数组都默认为0
	for(var i=0;i<4;i++){
		nums[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			nums[i][j]=0;
			hasConflicted[i][j]=false;//false表示未曾叠加过，true表示已经叠加过
		}
	}

	//动态创建上层单元格初始化
	updateView();

	score=0;
	updateScore(score);
}

//更新上层单元格视图
function updateView(){
	//将上层所有单元格清空，然后重新初始化创建
	$('.number-cell').remove();

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
	
			var numberCell=$('#number-cell-'+i+'-'+j);
			if (nums[i][j]==0) {
				numberCell.css('width','0px');
				numberCell.css('height','0px');
				numberCell.css('top',getPosTop(i,j)+cellWidth*0.5);
				numberCell.css('left',getPosLeft(i,j)+cellWidth*0.5);
			}else{
				numberCell.css('width',cellWidth);
				numberCell.css('height',cellWidth);
				numberCell.css('top',getPosTop(i,j));
				numberCell.css('left',getPosLeft(i,j));
				numberCell.css('background-color',getNumberBackgroundColor(nums[i][j]));
				numberCell.css('color',getNumberColor(nums[i][j]));
				numberCell.text(nums[i][j]);
			}
			hasConflicted[i][j]=false; //初始化默认该值未曾叠加过
			//移动端尺寸
			$('.number-cell').css('border-radius',cellWidth*0.06);
			$('.number-cell').css('font-size',cellWidth*0.5);
			$('.number-cell').css('line-height',cellWidth+'px');
		}
	}
}
/*
	在随机的单元格中生成一个随机数：
	1.在空余的单元格当中随机找一个（先判断单元格是否为空）
	2.随机产生一个2或者4
*/
function generateOneNumber(){
	//判断是否还有空间，如果没有空间则直接返回
	if (nospace(nums)) {
		return;
	}

	//随机一个位置
	var count=0;
	var temp=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				temp[count]=i*4+j;//方便获取 i和j的坐标位置
				count++;
			}
		}
	}
	var pos=Math.floor(Math.random()*count); //[0,1)*6=[0,5]

	var randx=Math.floor(temp[pos]/4);
	var randy=Math.floor(temp[pos]%4);

	//随机一个数字
	var randNum=Math.random()<0.5?2:4;

	//在随机位置上显示随机数字
	nums[randx][randy]=randNum;
	showNumberWihthAnimation(randx,randy,randNum);
}

//实现键盘的响应
$(document).keydown(function(event){
	//阻止事件的默认行为
	event.preventDefault();

	switch(event.keyCode){
		case 37://left
			//判断是否可以向左移动
			if(canMoveLeft(nums)){
				moveLeft();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
			break;
		case 38://up
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
			break;
		case 39://right
			if(canMoveRight(nums)){
				moveRight();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
			break;
		case 40://down
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
			break;
		default:
			break;

	}
});

//实现触摸滑动响应
document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});
document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	//判断滑动的方向
	var deltax=endx-startx;
	var deltay=endy-starty;

	//判断当滑动距离小于一定的阈值时不做任何操作
	if(Math.abs(deltax)<documentWidth*0.08 && Math.abs(deltay)<documentWidth*0.08){
		return;
	}

	if(Math.abs(deltax)>=Math.abs(deltay)){ //水平方向移动
		if(deltax>0){//向右移动
			if(canMoveRight(nums)){
				moveRight();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
		}else{//向左移动
			if(canMoveLeft(nums)){
				moveLeft();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
		}
	}else{//垂直方向移动

		if(deltay>0){//向下移动
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
		}else{//向上移动
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
		}
	}

});
/*
	向左移动
	需要对每一个数字的左边进行判断，选择合适的落脚点，落脚点有两种情况：
		1.落脚点没有数字，且移动的路径中没有阻碍物
		2.落脚点的数字和自己相同，且移动路径中没有障碍物
*/
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){ //j已经在最左边 所以从1开始
			if(nums[i][j]!=0){
				for(var k=0;k<j;k++){
					if(nums[i][k]==0 && noBlockHorizontal(i,k,j,nums) ){//第I行的地k-j列是否有障碍物
						//移动操作
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,k,j,nums) && !hasConflicted[i][k]){//进行叠加
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;//表示已经叠加
						break;

					}

					}
				}
			}
		}
	
	//更新页面上的数字单元格，此处才是真正的更新显示移动后的效果
	setTimeout(updateView,200);//等待500ms，为了让单元格移动效果能够显示完
}

function moveUp(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!=0){
				for(var k=0;k<i;k++){
					if(nums[k][j]==0 && noBlockVertical(j,k,i,nums)){ //第j列的第k-i行之间是否有障碍物
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j] && noBlockVertical(j,k,i,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);	
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
						break;
					}
				}
			}
		}
	}
	
	//更新页面上的数字单元格，此处才是真正的更新显示移动后的效果
	setTimeout(updateView,200);//等待500ms，为了让单元格移动效果能够显示完
}

function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){ //j已经在最右边 所以没有3的挤压
			if(nums[i][j]!=0){
				for(var k=3;k>j;k--){
					if(nums[i][k]==0 && noBlockHorizontal(i,j,k,nums) ){//第i行的地j-k列是否有障碍物
						//移动操作
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,j,k,nums) && !hasConflicted[i][k]){//进行叠加
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;//表示已经叠加
						break;

					}

					}
				}
			}
		}
	
	//更新页面上的数字单元格，此处才是真正的更新显示移动后的效果
	setTimeout(updateView,200);//等待500ms，为了让单元格移动效果能够显示完
}

function moveDown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){
					if(nums[k][j]==0 && noBlockVertical(j,i,k,nums)){ //第j列的第i-k行之间是否有障碍物
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j]  && noBlockVertical(j,i,k,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
						break;
					}
				}	
			}
		}
	}
	//更新页面上的数字单元格，此处才是真正的更新显示移动后的效果
	setTimeout(updateView,200);//等待500ms，为了让单元格移动效果能够显示完
}
