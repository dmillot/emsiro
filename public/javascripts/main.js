var slider = document.getElementById("sliderPoi");
var output = document.getElementById("nbOfPoint");
output.innerHTML = slider.value;
slider.oninput = function(){
    output.innerHTML = this.value;
}

