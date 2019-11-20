//slider to display the number of markers 
var slider = document.getElementById("sliderPoi");
var output = document.getElementById("nbOfPoint");
output.innerHTML = slider.value;

//display the value of the current number
slider.oninput = function(){
    output.innerHTML = this.value;
}

//get the slider id and display the selected value 
function myFunction() {
    document.getElementById("nbOfPoint").innerHTML = document.getElementById("sliderPoi").value;
}