/*
	Challenge name: Heightmap of boxes
    Level: Intermediate
	Objective: Given an ASCII drawing of nested boxes, create a program that fills each box with a character pattern based on their relative height.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3pnd3t/20151021_challenge_237_intermediate_heighmap_of/
*/

$.get('input.txt', function(data) {
    var grid = {};
    var fillChar = ['#','=','-','.'];
    var rows = data.split('\n');
    var size = rows.shift().split(' ');
    rows.forEach(function(l,i){
        grid[i] = l.split('');
    });

    var floodFill = function(y,x,chr,n){
        if( (x < size[1]) && (y < size[0]) ){
            if(grid[y][x] === '+')
                if(grid[y][x+1] === '-')
                    if(grid[y+1][x] === '|')
                        floodFill(y+1,x+1,' ', n+1);

            if(grid[y][x] !== chr) return;
            if (n < 4) grid[y][x] = fillChar[n];
            else grid[y][x] = '!';
            floodFill(y,x-1,chr,n);
            floodFill(y,x+1,chr,n);
            floodFill(y-1,x,chr,n);
            floodFill(y+1,x,chr,n);
        } else return;
    }

    floodFill(1,1,' ',0);

    var x, y, output;
    for(y = 0; y < size[0]; y++){
        output = '';
        for(x = 0; x < size[1]; x++) output += grid[y][x].replace('!',' ');
        console.log(output);
    }
});