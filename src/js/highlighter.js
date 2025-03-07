function countCharacters(string) {
  return string.length;
}

function applyStyles(span) {
  span.style.backgroundRepeat = "no-repeat";
  span.style.backgroundSize = "0% 100%";
}

function applyAnim(span, duration) {
  span.style.animation = `fillGradient ${
    duration * 0.05
  }s ease-in-out forwards`;
}

function changeWritingColor(span, Class) {
  span.style.setProperty(`--${Class}Width`, "100%");
  span.style.setProperty(
    `--${Class}Duration`,
    `${countCharacters(span.textContent) * 0.05}s`
  );
}

export function drawHighlights(selectedDocument, selected = 0) {
  const spans = selectedDocument.querySelectorAll("p span");
  if (spans.length) {
    const duration = countCharacters(spans[selected].textContent);
    const multiplier =
      spans[selected].classList.contains("below") && window.innerWidth > 768
        ? 0
        : 50;

    applyStyles(spans[selected]);
    applyAnim(spans[selected], duration);
    spans[selected].classList.remove("no-highlight");

    if (spans[selected].classList.contains("github")) {
      changeWritingColor(spans[selected], "github");
    } else if (spans[selected].classList.contains("codepen")) {
      changeWritingColor(spans[selected], "codepen");
    }

    if (spans.length > selected + 1) {
      setTimeout(() => {
        drawHighlights(selectedDocument, (selected += 1));
      }, duration * multiplier);
    }
  }
}
