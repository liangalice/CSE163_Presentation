/*global window, console, d3 */
/* ----------------------------------------------------------------------------
File: BarGraphSample.js
Contructs the Bar Graph using D3
80 characters perline, avoid tabs. Indet at 4 spaces. See google style guide on
JavaScript if needed.
-----------------------------------------------------------------------------*/ 
/*eslint-env es6*/
/*eslint-env browser*/
/*eslint no-console: 0*/
/*global d3 */

// reference to Mike Bostock's Owls to the max
// https://observablehq.com/@mbostock/owls-to-the-max

var c = document.getElementById("myCanvas");
var c2 = document.getElementById("myCanvas2");

var ctx = drawCat();
var ctx2 = drawCat2(); // new one for reference
var area_power = 0.25;
function main(){
	
ctx.width = "100%";
	const quads = new TinyQueue([new Quad(0, 0, width, width)], (a, b) => b.score - a.score);
	// console.log(quads); 586 quads

	setInterval(
		// split circles
		function(){

		const q = quads.pop();
		// console.log(q);
		if(q == undefined || q.score < 50 )
		{
			return;
		}
		const qs = q.split();
		// [q,q,q,q] is an array of 4 quads
		// q is a single quad
		// qs is 4 quads [quad,quad,quad,quad]
		// console.log(qs);
		// console.log(q);
		const qsi = d3.interpolate([q,q,q,q],qs);
		qs.forEach(quads.push, quads);
		// console.log(Math.max(1,Math.floor(q.w/10)));
		var m = Math.max(1,Math.floor(q.w/10));
		// console.log(t);
		// or else it smudges
		// const t = 0.5;	
		// console.log(m);
		for(var j = 1; j <= m ; j++){
			const t = d3.easeCubicInOut(j/m); // without it looks 3/4
			ctx.clearRect(q.x,q.y,q.w,q.h); // without it smudges
			for(const s of qsi(t)){ // s is an indivual quad
				// for each circle move to x,y with circle and fill with color
				ctx.fillStyle = s.color;
				ctx.beginPath();
				ctx.moveTo(s.x+s.w,s.y+s.h/2);
				ctx.arc(s.x+s.w/2,s.y+s.h/2,s.w/2,0,2* Math.PI);
				ctx.fill();
			}
			// yield c;
		}
	} , 16);
}
var width = 1024;
var c = document.getElementById("myCanvas");

class Quad
{
	// defines what a quad is
	constructor(x,y,w,h)
	{
		const [r,g,b,error] = colorFromHistogram(computeHistogram(x,y,w,h));
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		// console.log(this.color); // retreieves rba anc converts to hex
    	this.color = `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).substring(1)}`;
    	// gives 4 interpolated colors at a time 
		this.score = error * Math.pow(w * h, area_power);

	}
	split()
	{
		// q.split returns takes in 1 circle and splits into 4
		// number of quads determines number of circles
		// sets in x,y positions with same size
		const dx = this.w /2;
		const dy = this.h /2;
		const x1 = this.x ;
		const x2 = this.x +dx;
		const y1 = this.y ;
		const y2 = this.y +dy;
		return [
		new Quad(x1,y1,dx,dy),
		new Quad(x2,y1,dx,dy),
		new Quad(x1,y2,dx,dy),
		new Quad(x2,y2,dx,dy),
		
		];
	}
}
	// gets reference for color
	// puts rgba respectively with the amount of 
	//times it occurs inside the cat's picture
	// returns a uint32arr size 1024
function computeHistogram(x,y,w,h)
{
	const {data} = ctx2.getImageData(x,y,w,h);
	const histogram = new Uint32Array(1024);
	// console.log(data); // data has array of rgba
	// skip by 4 bc rgba
	for (let i = 0, n = data.length; i < n; i += 4) 
	{
		histogram[0 * 256 + data[i + 0]]+=1;
		histogram[1 * 256 + data[i + 1]]+=1;
		histogram[2 * 256 + data[i + 2]]+=1;
		histogram[3 * 256 + data[i + 3]]+=1;
	}
	return histogram;
}

// gives a weighted average of the colors from histogram
// also gives a weighted avg of errors
function weightedAverage(histogram) 
{
  let total = 0;
  let value = 0;
  for (let i = 0; i < 256; ++i) total += histogram[i], value += histogram[i] * i;
  value /= total;
  let error = 0;
  for (let i = 0; i < 256; ++i) error += (value - i) ** 2 * histogram[i];
  return [value, Math.sqrt(error / total)];
}

// gets a weighted average from historgram
// on r g b
function colorFromHistogram(histogram)
{	
	// console.log(histogram); // size 1024

	const [r,re] = weightedAverage(histogram.subarray(0,256));
	const [g,ge] = weightedAverage(histogram.subarray(256,512));
	const [b,be] = weightedAverage(histogram.subarray(512,768));
	// console.log(r); // values have in floats
	return [

	Math.round(r),
	Math.round(g),
	Math.round(b),
	re * 0.2989 + ge * 0.5870 + be * 0.1140];
}
// draws cat
// get canvas,2d,cat, and call draw image @ image,x,y,width,height
function drawCat(){
	ctx = c.getContext("2d");
	var image = document.getElementById("cat");
	var imgWidth = image.width;
	var imgHeight = image.height;
	ctx.drawImage(image,0,0,imgWidth,imgHeight);
	return ctx;
}
 // this one is for reference
 // get canvas,2d,cat, and call draw image @ image,x,y,width,height
function drawCat2(){
	ctx2 = c2.getContext("2d");
	var image = document.getElementById("cat");
	var imgWidth = image.width;
	var imgHeight = image.height;
	ctx2.drawImage(image,0,0,imgWidth,imgHeight);
	return ctx2;
}