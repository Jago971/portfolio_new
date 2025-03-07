function pointCabinet(event) {
  const cabinet = document.querySelector(".cabinet-body");
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  let rotateX = 0;
  let rotateY = 0;

  if (event.type === "mousemove") {
    rotateX = (event.clientY / viewportHeight).toFixed(2);
    rotateY = (event.clientX / viewportWidth).toFixed(2);

    cabinet.style.transform = `rotateX(${
      22.5 * rotateX * -1 - 7.5
    }deg) rotateY(${90 * rotateY - 45}deg)`;
  } else if (event.type === "deviceorientation") {
    const { gamma, beta } = event;
    rotateX = -beta + 15;
    rotateY = gamma;

    cabinet.style.transform = `rotateX(${clamp(
      rotateX,
      -45,
      -7.5
    )}deg) rotateY(${clamp(rotateY, -45, 45)}deg)`;
  }
}

export function deviceOrientationPermission() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/.test(navigator.userAgent);

  if (isIOS) {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", pointCabinet);
          } else {
            alert("Permission denied. Unable to access device orientation data.");
          }
        })
        .catch((error) => {
          console.error("Error requesting permission:", error);
        });
      console.log("ios");
    } else {
      window.addEventListener("deviceorientation", pointCabinet);
      console.log("ios fallback");
    }
  } else if (isAndroid && "DeviceOrientationEvent" in window) {
    window.addEventListener("deviceorientation", pointCabinet);
    console.log("android");
  } else {
    window.addEventListener("mousemove", pointCabinet);
    console.log("desktop");
  }
}
