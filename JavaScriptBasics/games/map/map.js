function initGame() {
    "use strict";
	/* const does not work in strict mode with chrome (const not in ECMAScript) */
	var 	ROWNUM = 3,
			COLNUM = 6,
			TILENUM = 8,
			TILEWIDTH = 150,
			TILEHEIGHT = 150;
			
    var divs,
		map = document.getElementById('map'),
		mapStyle = map.style,
		viewport = document.getElementById('viewport'),
		scrollDir = 1,
		scrollVel = 2; //velocity: 0,1,2, etc for bit shifting

	function getRand(a,b) {
		return Math.floor(Math.random()*(b-a+1)+a);
	}

    function setOnClickXY(coord) {

        var i = toPos(coord);
		divs[i].onclick = getSwapTileWithEmpty(i);

    }

	function toPos(coord) {
		return (coord.y * N + coord.x)
	}

	function toXY(num) {
        var x = num % N;
        var y = Math.floor(num / N);

		return { 'x': x, 'y': y }
	}
	
	function initDoc() {
		mapStyle.width = (COLNUM*TILEWIDTH)+"px";
		mapStyle.height = (ROWNUM*TILEHEIGHT)+"px";
		map.xPos = 0;
		mapStyle.left = map.xPos + "px";
		viewport.style.width = ((COLNUM-1)*TILEWIDTH)+"px";
		viewport.style.height = ((ROWNUM-1)*TILEHEIGHT)+"px";
		//viewport.style.top = Math.floor(TILEHEIGHT/2) + "px";
		//viewport.style.left = Math.floor(TILEWIDTH/2) + "px";
	}

 	function init() {
		var c, r, i, t, e, div, row, style;

		initDoc();

		for (r = 0; r < ROWNUM; r += 1) {
            for (c = 0; c < COLNUM; c += 1) {
                div = document.createElement('div');
                style = div.style;
                style.backgroundImage = "url(tiles.png)";
                t = getRand(0,TILENUM-1);
                style.backgroundPosition = (t*TILEWIDTH)+"px 0px";
                div.tilenum = t;
                style.top = (r*TILEHEIGHT)+"px";
                style.left = (c*TILEWIDTH)+"px";
				style.position = "absolute";
				style.height = (TILEHEIGHT)+"px";
                style.width = (TILEWIDTH)+"px";
				//div.setAttribute("class", "tile");
		
                map.appendChild(div);
            }
		}
	}
	
	function scroll(){
		if (map.xPos >= TILEWIDTH) scrollDir = -1;
		if (map.xPos <=0 ) scrollDir = 1;
		map.xPos += scrollDir << scrollVel;
		mapStyle.left = map.xPos + "px";
		
		setTimeout(scroll,10);
	}
    
    init();
	scroll();

}
