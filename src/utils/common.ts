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

export const toRadian = (angle: number) => angle * (Math.PI / 180);

export const roundNumber = (num: number, decimal = 2) =>
  Number(num.toFixed(decimal));
