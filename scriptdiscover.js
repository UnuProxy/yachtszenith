(function() {
  var modal = document.getElementById("myModal");
  var img = document.getElementsByClassName("small-img");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  
  for (let i = 0; i < img.length; i++) {
    img[i].onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      
      // Get the data-beach attribute of the parent .beach element
      const beachData = this.closest('.beach').getAttribute('data-beach');
      
      // Find the corresponding .details element
      const details = document.querySelector(`.details[data-beach="${beachData}"]`);
      
      // Set the description in the modal
      captionText.innerHTML = details.querySelector('p').innerHTML;
    }
  }
  
  var span = document.getElementsByClassName("close")[0];
  
  span.onclick = function() { 
    modal.style.display = "none";
  }
})();

$(document).ready(function(){
  const contactUsButton = $('.contact-us-button');
  const slideInPanel = $('.slide-in-panel');
  const closeButton = $('#closeButton');

  contactUsButton.click(function(){
      slideInPanel.toggleClass('active');
  });

  closeButton.click(function(){
      slideInPanel.removeClass('active');
  });
});

// Function to check if an element is in or near the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
  
  return (
    rect.top <= windowHeight &&
    rect.left <= windowWidth &&
    rect.bottom >= 0 &&
    rect.right >= 0
  );
}

// Function to check which boxes should be made visible
function scrollHandler() {
  const beaches = document.querySelectorAll('.beach');
  beaches.forEach((beach) => {
    if (isInViewport(beach)) {
      beach.classList.add('visible');
    }
  });
}

// Attach the scroll handler function to the scroll event
window.addEventListener('scroll', scrollHandler);


