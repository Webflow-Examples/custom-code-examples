const rumplelooks = new rive.Rive({
  src: "https://ucarecdn.com/d2e95826-37c2-4c9d-af6c-e96e00a232f6/rumplelooks.riv",
  canvas: document.getElementById("rumplelookscanvas"),
  autoplay: true,
  artboard: "New Artboard",
  stateMachines: ["State Machine 1"],
  onLoad: () => {
    rumplelooks.resizeDrawingSurfaceToCanvas();
    const inputs = rumplelooks.stateMachineInputs("State Machine 1");

    const xInput = inputs.find((input) => {
      return input.name === "xAxis";
    });

    const yInput = inputs.find((input) => {
      return input.name === "yAxis";
    });
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    window.addEventListener("mousemove", function (e) {
      xInput.value = (e.x / maxWidth) * 100;
      yInput.value = 100 - (e.y / maxHeight) * 100;
    });
  },
});
