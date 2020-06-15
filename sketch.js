let dim = 20;
let color = false;

const container = document.querySelector('.container');

container.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;

for (let i = 0; i < dim*dim; i++) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  container.appendChild(pixel);
}

let pixels = document.querySelectorAll('.pixel');

pixels.forEach((pixel) => {
  pixel.addEventListener("mouseover", function(event) {
    if (!color) {
      event.target.style.backgroundColor = 'black';
    }
    else {
      event.target.style.backgroundColor = randomColor();
    }
  })
})

const clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('click', function(event) {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  })
})
const colorBtn = document.querySelector('#color');

colorBtn.addEventListener('click', function(event) {
  color = !color;
  if (color) {
    event.target.style.backgroundImage = 
        'linear-gradient(62deg, rgb(255, 0, 0) 0%, rgb(0, 255, 0) 50%, rgb(0, 0, 255) 100%)';
  }
  else if (!color) {
    event.target.style.backgroundImage = 
        'linear-gradient(62deg, #3A3d40 0%, #181719 100%)';
  }
})

let slider = document.getElementById("myRange");
slider.value = dim;
let output = document.getElementById("demo");
output.innerHTML = "Dimensions: " + dim + "x" + dim; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = "Dimensions: " + this.value + "x" + this.value;
}

const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener('click', function (event) {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  })
  dim = slider.value;
})