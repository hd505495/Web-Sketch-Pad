let dim = 20;
let color = false;

const container = document.querySelector('.container');

container.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;

/* create 'pixels' on sketch pad based on dimensions */
for (let i = 0; i < dim*dim; i++) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  container.appendChild(pixel);
}

/* querySelectorAll returns Nodelist, lets turn it into an array */
let pixels = Array.from(document.querySelectorAll('.pixel'));

/* mouse-over listener for each 'pixel' */
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

/* clear button & click listener */
const clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('click', function(event) {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  })
})

/* color button & click listener */
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

/* get slider from DOM */
let slider = document.getElementById("myRange");
slider.value = dim;
let output = document.getElementById("demo");
output.innerHTML = "Dimensions: " + dim + "x" + dim; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = "Dimensions: " + this.value + "x" + this.value;
  dim = this.value;
}

/* reset button */
const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener('click', function (event) {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  })
  /* if user has changed dim with slider input */
  if (pixels.length != (dim*dim)) {
    /* if user increases dimensions */
    if (pixels.length < (dim*dim)) {
      /* define new number of columns equal to dim var */
      container.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;

      /*create additional pixels to meet user's request */
      for (let i = pixels.length; i < dim*dim; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        container.appendChild(pixel);
      }

      /* redefine pixels array with newly created pixels appended */
      pixels = Array.from(document.querySelectorAll('.pixel'));

      /* attach mouse listener to all pixels */
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
    }
    /* if user decreases dimensions */
    else if (pixels.length > (dim*dim)) {
      /* define new number of columns equal to dim var */
      container.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;

      /* loop from number of current pixels down to number of desired pixels */
      for (let i = pixels.length; i > dim*dim; i--) {
        container.lastChild.remove();  /* remove pixel from parent container in DOM */
        pixels.pop(); /* remove pixel element from pixel array */
      }
    }
  }
})