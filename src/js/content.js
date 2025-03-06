const newFolderElement = `
<div class="folder">
    <div class="documents-container flex-column"></div>
    <div class="front">
        <div class="tag">
        <p class="label"></p>
        </div>
    </div>
</div>
`;

const newDocumentElement = `<div class="document"><p class="document-text"></p></div>`;

export function applyLabel(parent, content) {
  parent.textContent = content;
}

export function loadFolders(parent, content) {
  return new Promise((resolve) => {
    const folders = parent.querySelectorAll(".folder");
    folders.forEach((folder) => folder.remove());

    Object.keys(content).forEach((key) => {
      parent.insertAdjacentHTML("afterbegin", newFolderElement);
      const label = parent.firstElementChild.querySelector(".label");
      const documentsContainer = parent.querySelector(".documents-container");
      label.textContent = key;
      loadDocuments(documentsContainer, content[key]);
    });

    resolve();
  });
}






// export function loadFolders(parent, content) {
//   const folders = parent.querySelectorAll(".folder");
//   folders.forEach((folder) => folder.remove());
//   Object.keys(content).forEach((key) => {
//     parent.insertAdjacentHTML("afterbegin", newFolderElement);
//     const label = parent.firstElementChild.querySelector(".label");
//     const documentsContainer = parent.querySelector(".documents-container");
//     label.textContent = key;
//     loadDocuments(documentsContainer, content[key])
//   });
// }

function loadDocuments(parent, content) {
    parent.innerHTML = "";
    content.forEach(item => {
        parent.insertAdjacentHTML("beforeend", newDocumentElement);
        const documentText = parent.lastElementChild.querySelector('.document-text');
        documentText.textContent = item;
    });
}
