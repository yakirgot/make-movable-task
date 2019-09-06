'use strict';

(() => {
  function makeMoveable(element) {
    element.addEventListener('mousedown', (mouseDownEvent) => {
      if (mouseDownEvent.buttons !== 1) {
        return;
      }

      const elementBoundingClientRect = element.getBoundingClientRect();

      const mousePositionInElement = {
        left: mouseDownEvent.clientX - elementBoundingClientRect.left,
        top: mouseDownEvent.clientY - elementBoundingClientRect.top,
      };

      const mouseMoveListener = (mouseMoveEvent) => {
        requestAnimationFrame(() => {
          const elementNewPosition = {
            x:
              mouseMoveEvent.clientX -
              elementBoundingClientRect.left -
              mousePositionInElement.left,
            y:
              mouseMoveEvent.clientY -
              elementBoundingClientRect.top -
              mousePositionInElement.top,
          };

          element.style.transform = `translate(${elementNewPosition.x}px, ${elementNewPosition.y}px)`;
        });
      };

      const mouseUpListener = () => {
        document.removeEventListener('mousemove', mouseMoveListener);

        requestAnimationFrame(() => {
          element.style.transition = '0.75s';
          element.style.transform = 'translate(0)';

          element.addEventListener(
            'transitionend',
            () => {
              element.style.transition = null;
              element.style.transform = null;
            },
            { capture: true, once: true },
          );
        });
      };

      document.addEventListener('mousemove', mouseMoveListener);
      document.addEventListener('mouseup', mouseUpListener, { once: true });
    });
  }

  document.querySelectorAll('li').forEach(makeMoveable);
})();
