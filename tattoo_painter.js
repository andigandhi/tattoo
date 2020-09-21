var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var name_anzeigen = true;
var name_entered = false;
ctx.font = "14px Times New Roman";

//array for all the rectangles to draw
var rects = [];

//different color palettes
var colors = [['#fff','#fff','#fff','#fff','black','red','blue','yellow'],
			  ['#fff','#ff48c4','#2bd1fc','#fff','#f3ea5f','#c04df9','#fff','#ff3f3f'],
			  ['#fefefe','#fefefe','#fefefe','#fefefe','#fefefe','#fefefe','#fefefe','#fefefe'],
			  ['#fff','#000','#000','#fff','#000','#fff','#fff','#000'],
			  ['#7584ad','#7584ad','#314570','#aed1d6','#aed1d6','#e09873','#e09873','#a37f6f']];
var colorScheme = 0;

//Dicke der Linien
ctx.lineWidth = 8;

//deleting old drawing
function clearCanvas() {
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  //starting with a clean canvas
	clearCanvas();
	ctx.font = "12px sans-serif";
	//Jedes Rechteck einzeln behandeln
	for (var i = 0;i<rects.length;i++) {
		//Richtige Farbe wÃ¤hlen
		ctx.fillStyle = colors[colorScheme][rects[i][4]];
		//Richtige Deckkraft wÃ¤hlen
		if (colors[colorScheme][rects[i][4]] == '#fefefe') ctx.globalAlpha = 0;
		else ctx.globalAlpha = 1;
		//Rechteck Inhalt zeichnen
		ctx.fillRect(rects[i][0], rects[i][1], rects[i][2], rects[i][3]);
		//Deckkraft wieder aus 100% fÃ¼r Kanten
		ctx.globalAlpha = 1.0;
		//Kanten zeichnen
		drawEdge(rects[i]);
	}
  
  
	//DRAWING ALL THE DATA
	ctx.stroke();
	
	if (name_anzeigen) for (var i = 0;i<rects.length;i++) drawText(rects[i]);
	if (false && !name_entered) {
		ctx.globalAlpha = 0.7;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 800, 800);
		ctx.font = "38px sans-serif";
		ctx.fillStyle = 'black';
		ctx.strokeText("Name eingeben, um mitzumachen!",100,300);
		ctx.globalAlpha = 1;
		ctx.fillStyle = 'white';
		ctx.fillText("Name eingeben, um mitzumachen!",100,300);
		ctx.font = "12px sans-serif";
	}
}

//drawing the edges
function drawEdge(rect) {
	ctx.moveTo(rect[0], rect[1]);
	ctx.lineTo(rect[0]+rect[2], rect[1]);
	ctx.lineTo(rect[0]+rect[2], rect[1]+rect[3]);
	ctx.lineTo(rect[0], rect[1]+rect[3]);
	ctx.lineTo(rect[0], rect[1]);
}

//drawing the names
function drawText(rect) {
	ctx.fillStyle = 'grey';
	ctx.fillText(rect[5],rect[0]+0.1*rect[2],rect[1]+0.5*rect[3]);
}

str = "0,200,220,600,5,shintisizer;220,200,470,180,4,jonny_maier;0,0,380,200,2,strubblwutz;380,0,420,200,1,turbothesi;690,200,110,270,2,wiikrn;220,380,170,90,1,moritz_gallone;390,380,70,90,2,139hellno;220,470,280,330,2,nirschlbraeu;500,470,300,330,7,hannah.l.jng;460,380,230,90,5,maexnkexn"
	str = str.split(';');
	var str1 = [];
	for (var i=0;i<str.length;i++) {
		str1.push(str[i].split(','));
		for (var j=0;j<5;j++) str1[i][j] = parseInt(str1[i][j]);
	}
rects = str1;
draw();


//functions of the html buttons
function toggle_name() {
	name_anzeigen = !name_anzeigen;
	draw();
}

function changeColor() {
	colorScheme = (colorScheme+1)%colors.length;
	draw();
}
