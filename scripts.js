(() => {
  function makeMoveable(element) {
    element.addEventListener('mousedown', (mouseDownEvent) => {
      if (mouseDownEvent.buttons !== 1) {
        return;
      }

      const elementCoordinates = element.getBoundingClientRect();
      const translateValues = getTranslateValues(element);

      const leftGapInElement = mouseDownEvent.clientX - elementCoordinates.left;
      const topGapInElement = mouseDownEvent.clientY - elementCoordinates.top;

      document.onmousemove = (mouseMoveEvent) =>
        requestAnimationFrame(() => {
          const coordinates = { x: 0, y: 0 };

          coordinates.x =
            mouseMoveEvent.clientX - elementCoordinates.left - leftGapInElement;
          coordinates.y =
            mouseMoveEvent.clientY - elementCoordinates.top - topGapInElement;

          if (translateValues) {
            coordinates.x += translateValues.x;
            coordinates.y += translateValues.y;
          }

          element.style.transform = `translate(${coordinates.x}px, ${coordinates.y}px)`;
        });

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    });
  }

  function getTranslateValues(element) {
    const transformValue = getComputedStyle(element).getPropertyValue(
      'transform',
    );

    if (transformValue !== 'none') {
      const matrixArray = transformValue.split(', ');

      const xTranslate = Number(matrixArray[4]);
      const yTranslate = Number(matrixArray[5].slice(0, -1));

      return { x: xTranslate, y: yTranslate };
    }
  }

  document.querySelectorAll('li').forEach(makeMoveable);
})();
