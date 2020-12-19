(async () => {
  const doc = document.documentElement;

  let prevScroll = window.scrollY || window.scrollTop;
  let curScroll;
  let direction = 0;
  let prevDirection = 0;

  const header = document.querySelector('.page__header');

  const checkScroll = () => {
    curScroll = window.scrollY || doc.scrollTop;

    if (curScroll > prevScroll) direction = 2;
    else if (curScroll < prevScroll) direction = 1;

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  const toggleHeader = (direction, curScroll) => {
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

// eslint-disable-next-line no-unused-vars
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
function handleButtonClick() {
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

// attach focusout listener to the parent of both
// the disclosure button and the menu
let subNavContainers = Array.prototype.slice.call(document.querySelectorAll('#Nav > ul > li'));
subNavContainers.forEach(function(navContainer) {
  navContainer.addEventListener('focusout', handleNavFocusOut);
});
