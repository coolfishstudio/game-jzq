var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.254 * documentWidth;
var cellSpace = 0.04 * documentWidth;

var redColor = '#d55336';
var blueColor = '#30a7c2';

var board = [];
var playerstarts = false;
var step = 0;

function getPosTop(i, j){
    return cellSpace + i * (cellSideLength + cellSpace);
}

function getPosLeft(i, j){
    return cellSpace + j * (cellSideLength + cellSpace);
}

function clicked(x, y){
    if(!playerstarts){
        return;
    }

    if(board[x][y] == 0){
        // usersTurn=false;  
        board[x][y] = -1;  
        step++;  
        downChess(x, y);  
          
        if(isWin(x, y)){  
            var str = '帅呆了，你赢啦!';  
            succeed++;
            setTimeout(function(){
                gameover(str);
            },300);
        }else if(isEnd()){  
            var str = '平局啦~~';  
            setTimeout(function(){
                gameover(str);
            },300);
        }else{
            setTimeout(function(){
                computerThink();  
            }, 500 + Math.round(Math.random() * 200));
            
        }  
    }else{
        twinkle(x, y);
    }
}


//判断是否赢了
function isWin(x, y){  
    if(Math.abs(board[x][0] + board[x][1] + board[x][2]) == 3){  
        return true;  
    }  
    if(Math.abs(board[0][y] + board[1][y] + board[2][y]) == 3){  
        return true;  
    }  
    if(Math.abs(board[0][0] + board[1][1] + board[2][2]) == 3){  
        return true;  
    }  
    if(Math.abs(board[2][0] + board[1][1] + board[0][2]) == 3){  
        return true;  
    }  
    return false;  
}
//判断是否和棋
function isEnd(){  
    return step >= 9;  
} 
//电脑
function computerThink(){  
    var ai = best();
    var x = ai.x;  
    var y = ai.y;  
    board[x][y] = 1;  
    step++;  
    downChess(x, y);  
      
    if(isWin(x,y)){
        var str = '哈哈你输了!'; 
        setTimeout(function(){
            gameover(str);
        },300);
    }else if(isEnd()){  
        var str = '平局啦~~';  
        setTimeout(function(){
            gameover(str);
        },300);
    }
}  

function best(){//假设电脑有好位置
    var bestX = null;
    var bestY = null;
    var bestWeight = 0;

    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(board[i][j] == 0){
                board[i][j] = 1;
                step++;
                if(isWin(i, j)){
                    step--;
                    board[i][j] = 0;
                    return {x : i, y : j, weight : 1000};
                }else if(isEnd()){
                    step--;
                    board[i][j] = 0;
                    return {x: i, y : j, weight : Math.round(Math.random() * 100 - 50)};
                }else{
                    var weight = worst().weight + Math.round(Math.random() * 800 - 400);  
                    step--;  
                    board[i][j] = 0;  
                    if(bestX == null || weight >= bestWeight){  
                        bestX = i;  
                        bestY = j;  
                        bestWeight = weight;  
                    }  
                }
            }
        }
    }
    return {x : bestX, y : bestY, weight : bestWeight}; 
}

function worst(){//假设电脑没有好位置
    var worstX = null;
    var worstY = null;
    var worstWeight = 0;

    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(board[i][j] == 0){
                board[i][j] = -1;
                step++;
                if(isWin(i, j)){
                    step--;
                    board[i][j] = 0;
                    return {x : i, y : j, weight : -1000};
                }else if(isEnd()){
                    step--;
                    board[i][j] = 0;
                    return {x: i, y : j, weight : Math.round(Math.random() * 100 - 50)};
                }else{
                    var weight = best().weight + Math.round(Math.random() * 500 - 250);  
                    step--;  
                    board[i][j] = 0;  
                    if(worstX == null || weight <= worstWeight){  
                        worstX = i;  
                        worstY = j;  
                        worstWeight = weight;  
                    }  
                }
            }
        }
    }
    return {x : worstX, y : worstY, weight : worstWeight};  
}


function twinkle(x, y){
    $('#number-cell-' + x + '-' + y).animate({'opacity' : 0},120)
        .animate({'opacity' : 100},120)
        .animate({'opacity' : 0},120)
        .animate({'opacity' : 100},120);
}

function downChess(x, y){  
    var v = board[x][y];  
    if(v > 0){  
        $('#number-cell-' + x + '-' + y).css({'background-color' : blueColor}).addClass('clickCell').text('X');
        playerstarts = true;
    }else if(v < 0){  
        $('#number-cell-' + x + '-' + y).css({'background-color' : redColor}).addClass('clickCell').text('O');
        playerstarts = false;
    }  
}  

function gameover(str){
    alert(str);
    sum++;
    setStorage(sum + '|' + succeed);
    newGame();
}

//获取本地存储
function getStorage(){
    return localStorage.getItem('coolfishstudio_jzq');
}
//添加本地存储 
function setStorage(str){
    localStorage.setItem('coolfishstudio_jzq', str);
}