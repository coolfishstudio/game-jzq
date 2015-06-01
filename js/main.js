var succeed = 0;
var sum = 0;

$(document).ready(function(){
	newGame();
});

function newGame(){
	prepareForMobile();
	//初始化棋盘
	init();
}

function prepareForMobile(){
	if(documentWidth > 500){
		gridContainerWidth = 500;
		cellSideLength = 140;
		cellSpace = 20;
	}
	$('#grid-container').css({
		'width' : gridContainerWidth - 2 * cellSpace,
		'height' : gridContainerWidth - 2 * cellSpace,
		'padding' : cellSpace,
		'border-radius' : 0.02 * gridContainerWidth
	});

    $('.grid-cell').css({
    	'width' : cellSideLength,
    	'height' : cellSideLength,
    	'border-radius' : 0.02 * cellSideLength
	});

}

function init(){
	step = 0;
	$('.number-cell').remove();
	for(var i = 0; i < 3; i++){
		board[i] = [];
		for(var j = 0; j < 3; j++){
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
			board[i][j] = 0;
		}
	}
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var theNumberCell = $('#number-cell-' + i + '-' + j);
			theNumberCell.css({
				'width' : cellSideLength,
				'height' : cellSideLength,
				'line-height' : cellSideLength + 'px',
				'top' : getPosTop(i, j),
				'left' : getPosLeft(i, j),
				'background-color' : 'transparent'
			});
		}
	}
	$('.number-cell').on('click',function(){
		var arr = $(this).attr('id').split('-');
		clicked(parseInt(arr[2]), parseInt(arr[3]));
	});
	if(Math.random() > 0.5){
		playerstarts = true;
	}
	if(!playerstarts){
		var _x = Math.round(Math.random() * 2);
		var _y = Math.round(Math.random() * 2);
		board[_x][_y] = 1;
		step++;
		downChess(_x, _y);
	}
	if(!!getStorage()){
		var _arr = getStorage().split('|');
		sum = _arr[0];
		succeed =_arr[1];
		$('#sum').text(sum);
		$('#succeed').text(succeed);
	}
}

