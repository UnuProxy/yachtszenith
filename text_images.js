document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch('text_images.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const textImageDetails = data.find(y => y.id === parseInt(id, 10));
      if (textImageDetails) {
        const container = document.getElementById('text-image-container');

        const titleElement = document.createElement('h3');
        titleElement.textContent = textImageDetails.title;
        const textElement = document.createElement('p');
        textElement.textContent = textImageDetails.text;
        const imageElement = document.createElement('img');
        imageElement.src = textImageDetails.image;

        const textDiv = document.createElement('div');
        textDiv.className = 'text';
        textDiv.appendChild(titleElement);
        textDiv.appendChild(textElement);

        const imageDiv = document.createElement('div');
        imageDiv.className = 'image';
        imageDiv.appendChild(imageElement);

        container.appendChild(textDiv);
        container.appendChild(imageDiv);
      }
    });
});

let timer;

window.addEventListener('scroll', function() {
  const textDiv = document.querySelector('.text');
  const titleElement = textDiv.querySelector('h3');

  clearTimeout(timer);  // Clear any existing timer

  if (isInViewport(textDiv)) {
    titleElement.classList.add('underline');  // Ensure the underline class is added
    timer = setTimeout(function() {
      titleElement.classList.add('active');  // Add the 'active' class to trigger the animation
    }, 100);  // slight delay before starting the animation
  } else {
    titleElement.classList.remove('underline', 'active');  // Remove both classes when out of view
  }
});


window.addEventListener('scroll', function() {
  const extrasTitle = document.querySelector('#extras-section h2');

  if (isInViewport(extrasTitle)) {
    extrasTitle.classList.add('active');
  } else {
    extrasTitle.classList.remove('active');
  }
});

