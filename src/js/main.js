import { drawWritingLines } from "./lines.js";
import { drawHighlights } from "./highlighter.js";
import { unfold } from "./unfold.js";
import { deviceOrientationPermission } from "./point_cabinet.js";
import { openDrawer } from "./cabinet_ui.js";
import { applyLabel } from "./content.js";
import { contentObject } from "./files.js";
import { add3dFolders } from "./3dDrawerFolders.js";

const sections = document.querySelectorAll("section");
const documents = document.querySelectorAll(".document");
const clickMeBtns = document.querySelectorAll(".click-me");
const drawers = document.querySelectorAll(".cabinet-drawer");
const drawerFronts = document.querySelectorAll(".cabinet-drawer > .front");
const drawerLabels = document.querySelectorAll(".cabinet-drawer .label");
const drawerOverlayFront = document.querySelector(".drawer-overlay-front");

function initializeDocuments() {
  documents.forEach((documentEl) => {
    drawWritingLines(documentEl);
  });
}

function initializeClickMeButtons() {
  clickMeBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      unfold(documents[index]);
      setTimeout(() => {
        drawHighlights(documents[index]);
      }, 2000);
    });
  });
}

function initializeDrawers() {
  drawerFronts.forEach((front, index) => {
    front.addEventListener("click", () => {
      openDrawer(sections[0], sections[1], drawers, index);
    });
  });

  drawerLabels.forEach((label, index) => {
    applyLabel(label, Object.keys(contentObject)[index].toUpperCase());
  });

  drawers.forEach((drawer) => {
    add3dFolders(drawer);
  });

  drawerOverlayFront.addEventListener("click", () => {
    openDrawer(sections[0], sections[1], drawers, Number(drawerOverlayFront.dataset.index));
  });
}

function initializeEventListeners() {
  window.addEventListener("resize", () => {
    documents.forEach((document) => {
      drawWritingLines(document);
    });
  });

  function handleFirstInteraction() {
    deviceOrientationPermission();
    document.removeEventListener("click", handleFirstInteraction);
    document.removeEventListener("touchend", handleFirstInteraction);
  }

  // Improved iOS detection function
  function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  }

  const isIOS = iOS();

  if (isIOS) {
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchend", handleFirstInteraction);
  } else {
    deviceOrientationPermission();
  }
}

function initialize() {
  initializeDocuments();
  initializeClickMeButtons();
  initializeDrawers();
  initializeEventListeners();
}

window.onload = initialize;