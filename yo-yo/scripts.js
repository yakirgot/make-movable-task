(() => {
  function makeMoveable(element) {
    element.addEventListener('mousedown', (mouseDownEvent) => {
      if (mouseDownEvent.buttons !== 1) {
        return;
      }

      // prevents dragging while element movement
      if (getTranslateValues(element)) {
        return;
      }

      const elementBoundingClientRect = element.getBoundingClientRect();

      const mousePositionInElement = {
        left: mouseDownEvent.clientX - elementBoundingClientRect.left,
        top: mouseDownEvent.clientY - elementBoundingClientRect.top,
      };

      document.onmousemove = (mouseMoveEvent) => {
        requestAnimationFrame(() => {
          const elementNewPosition = {
            x: mouseMoveEvent.clientX - elementBoundingClientRect.left - mousePositionInElement.left,
            y: mouseMoveEvent.clientY - elementBoundingClientRect.top - mousePositionInElement.top,
          };

          element.style.transform = `translate(${elementNewPosition.x}px, ${elementNewPosition.y}px)`;
        });
      };

      document.onmouseup = () => {
        moveElementToPreviousPosition(element);

        document.onmousemove = null;
        document.onmouseup = null;
      };
    });
  }

  function moveElementToPreviousPosition(element) {
    const translateValues = getTranslateValues(element);

    if (translateValues.x === 0 && translateValues.y === 0) {
      element.style.transform = null;

      return;
    }

    if (translateValues.x !== 0) {
      translateValues.x = getStepCloserToZero(translateValues.x);
    }

    if (translateValues.y !== 0) {
      translateValues.y = getStepCloserToZero(translateValues.y);
    }

    requestAnimationFrame(() => {
      element.style.transform = `translate(${translateValues.x}px, ${translateValues.y}px)`;

      moveElementToPreviousPosition(element);
    });
  }

  function getStepCloserToZero(position) {
    let stepSize = 1;
    const positionDistance = Math.abs(position);

    if (positionDistance > 500) {
      stepSize = 12;
    } else if (positionDistance > 300) {
      stepSize = 8;
    } else if (positionDistance > 50) {
      stepSize = 5;
    }

    if (position > stepSize) {
      return position - stepSize;
    }

    if (position < -stepSize) {
      return position + stepSize;
    }

    return 0;
  }

  function getTranslateValues(element) {
    const transformValue = getComputedStyle(element).getPropertyValue('transform');

    if (transformValue === 'none') {
      return null;
    }

    const matrixArray = transformValue.split(', ');

    const translateValues = {
      x: Number(matrixArray[4]),
      y: Number(matrixArray[5].slice(0, -1)),
    };

    return translateValues;
  }

  document.querySelectorAll('li').forEach(makeMoveable);
})();
