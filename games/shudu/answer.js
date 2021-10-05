//clear all the input
function clc(){
    for(var i=0; i<81; i++){
        document.getElementsByTagName("input")[i].value = "";
        document.getElementsByTagName("input")[i].style.color = 'blue';
    }
    document.body.style.backgroundImage = "url(mountain.jpg)";
}

//press "show answer" button and show answer then
function get_answer(){
    var bool = check_input();
    if(bool){
        var grid = readAPuzzle();
        if(!isValidGrid(grid)){
            alert("Invalid input, please try again!");
        }
        else{
            if(search(grid)){
                output_ans();
                document.body.style.backgroundImage = "url(sky.jpg)";
            }
            else{
                alert("Found no solution!");
            }
        }
    }
}

//check if the input are valid
function check_input(){
    var arr = new Array();
    
    for(var i=0; i<81; i++){
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
        if(isNaN(arr[i])){
            alert('Input should be any number between 1 and 9 !');
            return false
        }
    }
    
    if(arr.every(function isZero(x){return x== 0})){
        alert('There is no input!');
        return false
    }
    
    return true
}

//read a puzzle from the web page
function readAPuzzle(){
    var arr = new Array();
    
    for(var i=0; i<81; i++){
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
    }
    
    var grid = new Array();
    for(var i=0; i<9; i++){
        grid[i] = new Array();
        for(var j=0; j<9; j++){
            grid[i][j] = 0;
        }    
    }
    
    
    for(var i=0; i<81; i++){
        grid[Math.floor(i/9)][i%9] = arr[i];
    }
    
    return grid
}

//Obtain a list of free cells from the puzzle
function getFreeCellList(grid){
    var freeCellList = new Array();
    index = 0
    
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(grid[i][j] == 0){
                freeCellList[index] = new Array(i,j);
                index++;
            }
        }
    }
                
    return freeCellList
}

//Check whether grid[i][j] is valid in the grid
function isValid(i,j,grid){
    //Check whether grid[i][j] is valid at the i's row
    for(var column=0; column<9; column++){
        if((column != j) && (grid[i][column] == grid[i][j])){
            return false
        }
    }
         
    //Check whether grid[i][j] is valid at the j's column
    for(var row=0; row<9; row++){
        if((row != i) && (grid[row][j] == grid[i][j])){
            return false
        }
    }
 
    //Check whether grid[i][j] is valid at the 3-by-3 box
    for(var row=Math.floor(i/3)*3; row < Math.floor(i/3)*3+3; row++){
        for(var col=Math.floor(j/3)*3; col < Math.floor(j/3)*3+3; col++){
            if((row != i) && (col != j) && (grid[row][col] == grid[i][j])){
                return false
            }
        }
    }
             
    return true //The current value at grid[i][j] is valid
}

//Check whether the fixed cells are valid in the grid
function isValidGrid(grid){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if((grid[i][j] < 0) || (grid[i][j] > 9) || ((grid[i][j] != 0) && (! isValid(i,j,grid)))){
                return false
            }
        }
    }
    return true
}


//Search for a solution
function search(grid){
    var freeCellList = getFreeCellList(grid);
    var numberOfFreeCells = freeCellList.length;
    if(numberOfFreeCells == 0){
        return true
    }
    
    var k = 0;  //Start from the first free cell
 
    while(true){
        var i = freeCellList[k][0];
        var j = freeCellList[k][1];
        if(grid[i][j] == 0){
            grid[i][j] = 1;
        }
 
        if(isValid(i,j,grid)){
            if(k+1 == numberOfFreeCells){
                //no more free cells
                return true  //A solution is found
            }
            else{
                //Move to the next free cell
                k++;
            }
        }
        else{
            if(grid[i][j] < 9){
                //Fill the free cell with the next possible value
                grid[i][j]++;
            }
        
            else{
                //grid[i][j] is 9,backtrack
                while(grid[i][j] == 9){
                    if(k == 0){
                        return false  //No possible value
                    }
                    grid[i][j] = 0;  //Reset to free cell
                    k--;  //Backtrack to the preceding free cell
                    i = freeCellList[k][0];
                    j = freeCellList[k][1];
 
                } 
                //Fill the free cell with the next possible value
                //search continues from this free cell at k
                grid[i][j]++;
            }
        }
    }
 
    return true  //A solution is found
}


//output the answer on the web page
function output_ans(){
    var grid = readAPuzzle();
    var grid_original = readAPuzzle();
    
    if(search(grid)){
        for(var i=0; i<81; i++){
            if(grid[Math.floor(i/9)][i%9] != grid_original[Math.floor(i/9)][i%9]){
                document.getElementsByTagName("input")[i].value = grid[Math.floor(i/9)][i%9];
                document.getElementsByTagName("input")[i].style.color = 'black';
            }
        }
    }
    
}



