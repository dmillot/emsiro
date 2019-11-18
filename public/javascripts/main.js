var slider = document.getElementById("sliderPoi");
var output = document.getElementById("nbOfPoint");
output.innerHTML = slider.value;
slider.oninput = function(){
    output.innerHTML = this.value;
}


// var selectType = document.getElementById("selectType");
// selectType.addEventListener("change", function{
//     var elem = document.querySelectorAll('#opt');
// });

