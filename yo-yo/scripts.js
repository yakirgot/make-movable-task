(() => {
  function makeMoveable(element) {
    element.addEventListener('mousedown', (mouseDownEvent) => {
      if (mouseDownEvent.buttons !== 1) {
        return;
      }

      element.style.transition = null;
      element.style.transform = null;

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

          element.style.transform = `matrix(1.2, 0, 0, 1.2, ${elementNewPosition.x}, ${elementNewPosition.y})`;
        });
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        requestAnimationFrame(() => {
          element.style.transition = '0.75s';
          element.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
        });
      };
    });
  }

  document.querySelectorAll('li').forEach(makeMoveable);
})();
