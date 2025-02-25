function moveFold(
  fold,
  finishAngle,
  finishBrightness,
  fold2,
  fold2FinishBrightness
) {
  const clickMe = fold.querySelector(".click-me");
  const content = fold.querySelector(".content");

  fold.style.transform = `rotateX(${finishAngle}deg)`;
  fold.style.filter = `brightness(${finishBrightness - 0.1})`;
  setTimeout(() => {
    fold2.style.filter = `brightness(${fold2FinishBrightness})`;
  }, 100);
  setTimeout(() => {
    if (clickMe) {
      clickMe.classList.toggle("hidden");
    }
    content.classList.toggle("hidden");
    fold.style.filter = `brightness(${finishBrightness})`;
  }, 400);
}

function moveHole(fold) {
  const hole = fold.querySelector(".hole");

  hole.style.boxShadow = "inset 0 0 0 black";
  hole.style.filter = "brightness(0.75)";

  setTimeout(() => {
    hole.style.backgroundColor = "var(--bg)";
    hole.style.boxShadow = "inset 0.5cqw 0.5cqw 0.5cqw rgba(0, 0, 0, 0.5)";
    hole.style.filter = "brightness(1)";
    hole.style.transform = "scale(1, 1)";
  }, 500);
}

export function unfold(document) {
  const folds = document.querySelectorAll(".paper");

  moveFold(folds[0], -10, 0.9, folds[2], 0.95);
  moveHole(folds[0]);

  setTimeout(() => {
    moveFold(folds[2], 10, 1, folds[1], 0.95);
    moveHole(folds[2]);
  }, 800);
}
