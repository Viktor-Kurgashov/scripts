export function calcDimensions(target: HTMLElement, root?: 'parent') {
  const rect = target.getBoundingClientRect();

  if (root === 'parent') {
    const parent = target.parentElement as HTMLElement;

    const parentRect = parent.getBoundingClientRect();

    return {
      top: rect.top - parentRect.top,
      height: rect.height + Number.parseFloat(getComputedStyle(parent).paddingBottom),
      rootHeight: parentRect.height - Number.parseFloat(getComputedStyle(parent).paddingTop),
      // rootHeight: parentRect.height - target.offsetTop,
    };
  }

  return {
    top: rect.top,
    height: rect.height,
    rootHeight: window.innerHeight,
  };
}

export function parseThreshold(value: string | number): number {
  if (typeof value === 'number') return value;

  if (/^\d+(\.\d+)?px$/.test(value)) {
    return Number.parseFloat(value);
  }

  if (/^\d+%$/.test(value)) {
    const percent = Number.parseInt(value, 10);

    const res = window.innerHeight * (percent / 100);

    return res;
  }

  return 100;
}
