'use strict';

(() => {
  function makeMoveable(element) {
    element.addEventListener('mousedown', (mouseDownEvent) => {
      if (mouseDownEvent.buttons !== 1) {
        return;
      }

      const elementBoundingClientRect = element.getBoundingClientRect();
      const translateValues = getTranslateValues(element);

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

          if (translateValues) {
            elementNewPosition.x += translateValues.x;
            elementNewPosition.y += translateValues.y;
          }

          element.style.transform = `translate(${elementNewPosition.x}px, ${elementNewPosition.y}px)`;
        });
      };

      const mouseUpListener = () => {
        document.removeEventListener('mousemove', mouseMoveListener);
      };

      document.addEventListener('mousemove', mouseMoveListener);
      document.addEventListener('mouseup', mouseUpListener, { once: true });
    });

    function getTranslateValues(element) {
      const transformValue = getComputedStyle(element).getPropertyValue(
        'transform',
      );

      if (transformValue !== 'none') {
        const matrixArray = transformValue.split(', ');

        const translateValues = {
          x: Number(matrixArray[4]),
          y: Number(matrixArray[5].slice(0, -1)),
        };

        return translateValues;
      }
    }
  }

  document.querySelectorAll('li').forEach(makeMoveable);
})();
