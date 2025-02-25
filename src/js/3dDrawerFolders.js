export function add3dFolders(parent) {
  for (let index = 0; index < 3; index++) {
    const paper = document.createElement("div");
    paper.classList.add("paper");
    paper.style.transform = `translateZ(${(index+1) * -27}cqw)`;
    parent.appendChild(paper);

    for (let index = 0; index < 2; index++) {
      const folder = document.createElement("div");
      folder.classList.add("folder");
      folder.style.transform = `rotateX(${index === 0 ? -5 : 5}deg)`;
      paper.appendChild(folder);
    }
  }
}
