import { applyLabel, loadFolders } from "./content.js";
import { contentObject } from "./files.js";

let selectedDrawer = "unselected";
const drawerOverlay = document.querySelector("#cabinet-drawer-overlay");
const drawerBody = drawerOverlay.querySelector(".drawer-overlay-body");
const drawerLabel = drawerOverlay.querySelector(".drawer-overlay-front .label");
const drawerFront = drawerOverlay.querySelector(".drawer-overlay-front");
const shadows = document.querySelectorAll(
  ".front .shadow:not(:last-of-type), .bottom-drawer-shadow"
);

export function openDrawer(fixedDocument, drawers, index) {
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
    fixedDocument.classList.toggle("fade");
    setTimeout(() => {
      toggleDrawerOverlay(index);
    }, 250);
  } else if (selectedDrawer === index) {
    selectedDrawer = "unselected";
    toggleDrawerOverlay(index);
    setTimeout(() => {
      removeOpenAll();
      fixedDocument.classList.toggle("fade");
    }, 500);
  } else {
    toggleDrawerOverlay(index);
    removeOpenAll();
    setTimeout(() => {
      selectedDrawer = index;
      addOpen(index);
      toggleDrawerOverlay(index);
    }, 1000);
  }
}

function toggleDrawerOverlay(index) {
  const content = contentObject[Object.keys(contentObject)[index]];
  const isOpen = drawerOverlay.classList.contains("open");
  if(!isOpen) {
    applyLabel(drawerLabel, Object.keys(contentObject)[index].toUpperCase());
    drawerFront.setAttribute("data-index", index);
    loadFolders(drawerBody, content).then(() => {
        drawerOverlay.scrollTop = drawerOverlay.scrollHeight;
        requestAnimationFrame(() => {
          drawerOverlay.classList.add("open");
        });
    })
  } else {
    drawerOverlay.scrollTop = drawerOverlay.scrollHeight;
    drawerOverlay.classList.remove("open")
  }
  // loadFolders(drawerBody, content);

  // setTimeout(
  //   () => {
  //     applyLabel(drawerLabel, Object.keys(contentObject)[index].toUpperCase());
  //     drawerOverlay.scrollTop = drawerOverlay.scrollHeight;
  //     drawerFront.setAttribute("data-index", index);
  //   },
  //   isOpen ? 10 : 750
  // );
}
