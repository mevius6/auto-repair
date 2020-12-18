(function(){
  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.querySelector('.page__header');

  var checkScroll = function() {
    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      // up
      direction = 2;
    }
    else if (curScroll < prevScroll) {
      // down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  var toggleHeader = function(direction, curScroll) {
    if (direction === 2 && curScroll > 52) {
      header.classList.add('page__header--hidden');
      prevDirection = direction;
    }
    else if (direction === 1) {
      header.classList.remove('page__header--hidden');
      prevDirection = direction;
    }
  };

  window.addEventListener('scroll', checkScroll);
})();


// save some elements
// using Array slice to convert NodeLists to Arrays, for ease of use later
// with ES6, I'd just do [ ...buttons ] :)
const pNav = document.getElementById("Nav");
const buttons = Array.prototype.slice.call(document.querySelectorAll('button[aria-controls]'));
const subMenus = Array.prototype.slice.call(document.querySelectorAll('button[aria-controls] + ul, button[aria-controls] + div'));

function openSubNav(buttonEl) {
  let navId = buttonEl.getAttribute('aria-controls');
  let navEl = document.getElementById(navId);

  if (navEl) {
    buttonEl.setAttribute("aria-expanded", "true");
    buttonEl.setAttribute("aria-label", "Hide");
    navEl.style.display = "block";
  }
}

function closeSubNav(buttonEl) {
  let navId = buttonEl.getAttribute('aria-controls');
  let navEl = document.getElementById(navId);

  if (navEl) {
    buttonEl.setAttribute("aria-expanded", "false");
    buttonEl.setAttribute("aria-label", "Show");
    navEl.style.display = "none";
  }
}

function closeAllSubNavs() {
  buttons.forEach(function(button) {
    closeSubNav(button);
  });
}

// event handlers
function handleButtonClick(event) {
  let button = this;
  let isOpen = button.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeSubNav(button);
  } else {
    closeAllSubNavs();
    openSubNav(button);
  }
}

function handleButtonKeyDown(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeSubNav(this);
  }
}

function handleNavKeyDown(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    let button = document.querySelector('button[aria-controls=' + this.id + ']');
    closeSubNav(button);
    button.focus();
  }
}

function handleNavFocusOut(event) {
  let navContainsFocus = this.contains(event.relatedTarget);
  if (!navContainsFocus) {
    let button = this.querySelector('button[aria-controls]');
    button && closeSubNav(button);
  }
}

// attach event listeners
buttons.forEach(function(button) {
  button.addEventListener('click', handleButtonClick);
  button.addEventListener('keydown', handleButtonKeyDown);
});

subMenus.forEach(function(subMenu) {
  subMenu.addEventListener('keydown', handleNavKeyDown);
});

// attach focusout listener to the parent of both the disclosure button
// and the menu
let subNavContainers = Array.prototype.slice.call(document.querySelectorAll('#Nav > ul > li'));
subNavContainers.forEach(function(navContainer) {
  navContainer.addEventListener('focusout', handleNavFocusOut);
});
