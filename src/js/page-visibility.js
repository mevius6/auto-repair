// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

let hidden, visibilityChange;
if (typeof document.hidden !== 'undefined') {
  // Opera 12.1, Firefox 18
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

let videoElement = document.getElementById('Promo');

function handleVisibilityChange() {
  if (document[hidden]) {
    videoElement.pause();
  } else {
    videoElement.play();
  }
}

export function setPageVisibility() {
  if (
    typeof document.addEventListener === 'undefined' ||
    hidden === undefined
  ) {
    console.log(
      'Требуется браузер, например Google Chrome или Firefox, который поддерживает API видимости страницы.'
    );
  } else {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    videoElement.addEventListener(
      'pause',
      function () {
        // document.title = 'Приостановлено';
      },
      false
    );

    videoElement.addEventListener(
      'play',
      function () {
        // document.title = 'Воспроизведение';
      },
      false
    );
  }
}
