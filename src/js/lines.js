export function drawWritingLines(element) {
  const divisions = element.querySelectorAll(".paper");
  const lineHeight = element.offsetHeight / 36;
  const lineColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--paper-lines")
    .trim();
  const paperColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--paper-bg")
    .trim();

  divisions.forEach((division) => {
    division.style.background = `
      linear-gradient(
        to bottom,
        ${paperColor},
        ${paperColor} ${lineHeight * 0.93}px,
        ${lineColor} ${lineHeight * 0.93}px,
        ${lineColor} ${lineHeight}px)`;
    division.style.backgroundSize = `100% ${lineHeight}px`;
  });
}
