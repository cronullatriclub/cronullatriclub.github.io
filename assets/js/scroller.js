async function loadScroller() {

  const dropdownToggles = document.querySelectorAll('.header-header-nav-dropdown-toggle');
  
  if (window.innerWidth <= 768) {
      dropdownToggles.forEach(toggle => {
          toggle.addEventListener('click', function(e) {
              e.preventDefault();
              this.closest('.header-nav-dropdown').classList.toggle('active');
          });
      });
  }

  const response = await fetch('/assets/components/scroller.html');
  const html = await response.text();
  const placeholder = document.getElementById('scroller-placeholder');
  placeholder.innerHTML = html;


  let mybutton = document.getElementById("scroller-button");
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (mybutton)
    {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.addEventListener('DOMContentLoaded', loadScroller);
