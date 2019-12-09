let clickArea = document.querySelector('.map');
console.log("hi" + clickArea);

let rtname = document.querySelector('.rt');

clickArea.addEventListener("click", getClickPosition, false);

function getClickPosition(e) {
    var xpos= e.clientX;
    var ypos = e.clientY;
    console.log(xpos + " " + ypos);

    var restaurants = [["chicken", [500, 600]]];

    for (var i = 0; i < restaurants.length; i++) {
        if (abs(xpos - restaurants[i][1][0]) < 5 && abs(ypos - restaurants[i][1][0] < 5)) {
            rtname.innerHTML = restaurants[i][0];
        }
    }
}

