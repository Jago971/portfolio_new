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
    rotateX = -beta - 45;
    rotateY = gamma;

    cabinet.style.transform = `rotateX(${clamp(
      rotateX,
      -45,
      0
    )}deg) rotateY(${clamp(rotateY, -45, 45)}deg)`;
  }
}

export function deviceOrientationPermission() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", pointCabinet);
        } else {
          alert("Permission denied. Unable to access device motion data.");
        }
      })
      .catch((error) => {
        console.error("Error requesting permission:", error);
      });
  } else if ("DeviceMotionEvent" in window) {
    window.addEventListener("deviceorientation", pointCabinet);
  } else {
    // alert("DeviceMotionEvent is not supported on this device or browser.");
    document.addEventListener("mousemove", (event) => {
      pointCabinet(event);
    });
  }
}
