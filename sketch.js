let dim = 16;

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
    event.target.style.backgroundColor = randomColor();/*function () {
      console.log('here');
      let color = randomColor();
      console.log(color);
      return color;
    } */
  })
})

