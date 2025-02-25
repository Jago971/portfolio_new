// export function drawHighlights(document, includesBlacks = false) {
// //   let increment = 0;
// //   const below = document.querySelector(".below");
// //   const highlights = document.querySelectorAll("p span");

// //   if (below) {
// //     if (window.innerWidth > 768) {
// //       below.style.display = "none";
// //     } else {
// //       below.style.display = "initial";
// //     }
// //   }

// //   highlights.forEach((element, index) => {
// //     if (window.innerWidth > 768 && element.classList.contains("below")) {
// //       increment = 1;
// //       return;
// //     }
// //     element.style.backgroundRepeat = "no-repeat";
// //     element.style.backgroundSize = "0% 100%";
// //     element.style.animation = "fillGradient 0.5s ease forwards";
// //     element.classList.remove("no-highlight");
// //     element.style.animationDelay = `${(index - increment) * 0.5}s`;
// //     if (includesBlacks && (index === 11 || index === 12)) {
// //       setTimeout(() => {
// //         element.style.setProperty(`--width${index - 10}`, "100%");
// //       }, (index - increment) * 500);
// //     }
// //   });
// }

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
