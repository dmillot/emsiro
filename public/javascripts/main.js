//slider to display the number of markers 
var slider = document.getElementById("sliderPoi");
var output = document.getElementById("nbOfPoint");
output.innerHTML = slider.value;
//display the value of the current number
slider.oninput = function(){
    output.innerHTML = this.value;
}

