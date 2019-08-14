function makeMoveable(element) {
  element.addEventListener('mousedown', (mouseDownEvent) => {
    if (mouseDownEvent.buttons !== 1) {
      return;
    }

    const elementCoordinates = element.getBoundingClientRect();
    const translateValues = getTranslateValues(element);

    const leftGapInElement = mouseDownEvent.clientX - elementCoordinates.left;
    const topGapInElement = mouseDownEvent.clientY - elementCoordinates.top;

    document.onmousemove = (mouseMoveEvent) => {
      requestAnimationFrame(() => {
        let xCoordinate =
          mouseMoveEvent.clientX - elementCoordinates.left - leftGapInElement;
        let yCoordinate =
          mouseMoveEvent.clientY - elementCoordinates.top - topGapInElement;

        if (translateValues) {
          xCoordinate += translateValues.xTranslate;
          yCoordinate += translateValues.yTranslate;
        }

        element.style.transform = `translate(${xCoordinate}px, ${yCoordinate}px)`;
      });
    };

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

    return { xTranslate, yTranslate };
  }
}

document.querySelectorAll('li').forEach(makeMoveable);
