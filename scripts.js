var css = document.querySelector("h3");
var color1 = document.getElementById("color1");
var color2 = document.getElementById("color2");
var body = document.getElementById("lonen");


function changeColor(){
	body.style.background="linear-gradient(to right, " + color1.value + "," +  color2.value + ")";
}
color1.addEventListener("input", changeColor);

color2.addEventListener("input", changeColor);
