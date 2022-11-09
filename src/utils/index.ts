export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  props: Record<string, any>
) => {
  const element = document.createElement<T>(tagName);

  for (const [key, value] of Object.entries(props)) {
    element.setAttribute(key, value);
  }

  return element;
};

export const angleToRadian = (angle: number) => angle * (Math.PI / 180);

export const lerp = (start: number, end: number, t: number) =>
  (1 - t) * start + t * end;

export const roundNumber = (num: number, decimal = 2) =>
  Number(num.toFixed(decimal));
