export const isElementsOverlap = (el1: HTMLElement | null, el2?: HTMLElement | null) => {
  if (!el1 || !el2) {
    return false;
  }
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();
  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
};

export const isElementContainMousePos = (clientX: number, clientY: number, element: HTMLElement | null) => {
  if (!element) {
    return false;
  }
  const { left, top, bottom, right } = element.getBoundingClientRect();
  return clientX >= left && clientX <= right && clientY >= top && clientY <= bottom;
};
