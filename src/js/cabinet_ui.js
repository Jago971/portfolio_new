import { applyLabel, loadFolders } from "./content.js";
import { contentObject } from "./files.js";

let selectedDrawer = "unselected";
let selectedDoc = "unselected";
let documents;
const drawerOverlay = document.querySelector("#cabinet-drawer-overlay");
const documentOverlay = document.querySelector("#document-overlay");
const drawerBody = drawerOverlay.querySelector(".drawer-overlay-body");
const drawerLabel = drawerOverlay.querySelector(".drawer-overlay-front .label");
const drawerFront = drawerOverlay.querySelector(".drawer-overlay-front");
const shadows = document.querySelectorAll(
  ".front .shadow:not(:last-of-type), .bottom-drawer-shadow"
);

export function openDrawer(section1, section2, drawers, index) {
  function removeOpenAll() {
    drawers.forEach((drawer) => {
      drawer.classList.remove("open");
    });
    shadows.forEach((shadow) => {
      shadow.classList.remove("open");
    });
  }

  function addOpen(index) {
    drawers[index].classList.add("open");
    shadows[index].classList.add("open");
  }

  if (selectedDrawer === "unselected") {
    selectedDrawer = index;
    addOpen(index);
    section1.classList.toggle("fade");
    setTimeout(() => {
      toggleDrawerOverlay(index, section2);
    }, 250);
  } else if (selectedDrawer === index) {
    selectedDrawer = "unselected";
    toggleDrawerOverlay(index, section2);
    setTimeout(() => {
      removeOpenAll();
      section1.classList.toggle("fade");
    }, 500);
  } else {
    toggleDrawerOverlay(index, section2);
    removeOpenAll();
    setTimeout(() => {
      selectedDrawer = index;
      addOpen(index);
      toggleDrawerOverlay(index, section2);
    }, 1000);
  }
}

function toggleDrawerOverlay(index, section2) {
  const content = contentObject[Object.keys(contentObject)[index]];
  const isOpen = drawerOverlay.classList.contains("open");
  const currentLabel = Object.keys(contentObject)[index].toUpperCase();

  if (!isOpen) {
    drawerFront.setAttribute("data-index", index);
    applyLabel(drawerLabel, currentLabel);

    loadFolders(drawerBody, content).then(() => {
      drawerOverlay.scrollTop = drawerOverlay.scrollHeight;

      requestAnimationFrame(() => {
        drawerOverlay.classList.add("open");
      });

      documents = drawerBody.querySelectorAll(".document");
      documents.forEach((doc) => {
        doc.addEventListener("click", () => {
          openDocument(section2, doc.textContent);
        });
      });
    });
  } else {
    documents.forEach((doc) => {
      doc.removeEventListener("click", openDocument);
    });
    drawerOverlay.scrollTop = drawerOverlay.scrollHeight;
    drawerOverlay.classList.remove("open");
    selectedDoc = "unselected";
    documentOverlay.classList.remove("open");
    setTimeout(() => {
      section2.classList.remove("fade");
    }, 500);
  }
}

function openDocument(section2, doc) {
  if (selectedDoc === "unselected") {
    selectedDoc = doc;
    section2.classList.toggle("fade");
    setTimeout(() => {
      documentOverlay.classList.add("open");
    }, 250);
  } else if (selectedDoc === doc) {
    selectedDoc = "unselected";
    documentOverlay.classList.remove("open");
    setTimeout(() => {
      section2.classList.toggle("fade");
    }, 500);
  } else {
    documentOverlay.classList.remove("open");
    setTimeout(() => {
      selectedDoc = doc;
      documentOverlay.classList.add("open");
    }, 1000);
  }
}
