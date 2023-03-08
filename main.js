// Execute this in chrome console



// Create the modmenu element with multiple child divs for text
const modmenu = document.createElement("div");
modmenu.id = "modmenu";
modmenu.style.opacity = '0';
modmenu.style.transition = 'opacity 1s';
modmenu.innerHTML = `
<div id="modmenu" style="opacity: 1; transition: opacity 1s ease 0s;">
<div id="modmenu" style="opacity: 1; transition: opacity 1s ease 0s;">
<div id="modmenu" style="opacity: 1; transition: opacity 1s ease 0s;">
<div id="modmenu" style="left: 1px; top: 1px;">
<div id="modmenu">
<div id="modmenu" style="background-color: black;position: absolute;top: -2px;left: 6px;border: 1px solid black;width: 380px;height: 270px;overflow: hidden;">
  <div class="title" style="position: absolute;top: 2px;left: 108px;height: 20px;color: white;font-size: 20px;">Mod Menu 1.0.0<div class="title" style="position: absolute;top: 44px;left: 29px;height: 32px;color: white;font-size: 20px;">STATS<div class="title" style="position: absolute;top: 119px;left: 4px;height: 20px;color: white;font-size: 20px;">Mods</div></div></div>
  <div class="div" style="position: absolute;top: 95px;left: 7px;height: 20px;color: white;font-size: 14px;">Engine Temp: -20C</div><div class="div" style="position: absolute;top: 96px;left: 146px;height: 20px;color: white;font-size: 14px;">Speed: 0</div>
  <div class="div" style="position: absolute;top: 98px;left: 248px;height: 20px;color: white;font-size: 14px;">Throttle: 0%</div>
  <div class="enginelights" style="position: absolute;top: 124px;left: 10px;height: 20px;color: white;font-size: 14px;">Engine Lights: {"eng":false,"bat":false,"oil":false}</div><div class="pressuretext" style="position: absolute;top: 145px;left: 10px;height: 20px;color: white;font-size: 14px;">Engine Lights: {"eng":false,"bat":false,"oil":false}</div><button id="toggle-update-button" style="position: absolute;bottom: 26px;left: 238px;">Disable Update</button>
  <button id="kill-engine-button" style="position: absolute;bottom: 28px;left: 133px;">Kill Engine</button>
  <button id="dumpitemsBtn" style="position: absolute;bottom: 64px;left: 11px;">Dump Items</button>
<button id="fupengineBtn" style="position: absolute;bottom: 61px;left: 134px;">Fuck Up Engine</button><button id="closebtn" style="position: absolute;bottom: 247px;left: 357px;background: transparent;color: white;">X</button><button id="revive-engine-button" style="position: absolute;bottom: 27px;left: 11px;">Start Engine</button></div>
</div></div>

</div>
</div>
</div>
`;

setTimeout(() => {
  modmenu.style.opacity = '1';
}, 3000);

// Add event listeners for dragging behavior
let isDragging = false;
let startX;
let startY;
let initialX;
let initialY;

modmenu.addEventListener("mousedown", function(e) {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  initialX = modmenu.offsetLeft;
  initialY = modmenu.offsetTop;
});

modmenu.addEventListener("mousemove", function(e) {
  if (isDragging) {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    modmenu.style.left = `${initialX + deltaX}px`;
    modmenu.style.top = `${initialY + deltaY}px`;
  }
});

modmenu.addEventListener("mouseup", function() {
  isDragging = false;
});


// Insert the modmenu element after the #tools element
const toolsElement = document.querySelector("#tools");
toolsElement.insertAdjacentElement("afterend", modmenu);
const pressuretext = document.querySelector("#modmenu > div.pressuretext")
// Set up the update function
let updateActive = true;
const updateInterval = setInterval(function() {
  // Check if the variable is true
  if (updateActive) {
    // If the variable is true, update the text
    const modmenuTextElements = modmenu.querySelectorAll(".div");
    const enginelights = document.querySelector("#modmenu > div.enginelights")
    const throttleslider = modmenu.querySelectorAll("#throttleslider")
    modmenuTextElements[0].innerText = `Engine Temp: ${document.all.temperature?.value.toFixed() || ""}C`;
    modmenuTextElements[1].innerText = `Speed: ${document.all.dashboard?.speed?.value.toFixed() || ""}`;
    modmenuTextElements[2].innerText = `Throttle: ${document.all.dashboard?.pedal?.value.toFixed() || ""}%`;
    enginelights.innerText = `Engine Lights: ${JSON.stringify(document.all.dashboard.lights)}`
    pressuretext.innerText = `Pressure: ${document.querySelector("#pressuremeter > div > svg > polygon:nth-child(41)").transform.animVal[1].angle.toFixed() + "kPa"}`
  }
}, 5);

// Add event listener to the toggle update button
const toggleUpdateButton = document.querySelector("#toggle-update-button");
toggleUpdateButton.addEventListener("click", function() {
  updateActive = !updateActive;
  toggleUpdateButton.innerText = updateActive ? "Disable Update" : "Enable Update";
});

const killengineBtn = document.querySelector("#kill-engine-button");
killengineBtn.addEventListener("click", function() {
    document.all.dashboard.ignition.value = 0
})

const reviveengineBtn = document.querySelector("#revive-engine-button");
reviveengineBtn.addEventListener("click", function() {
    document.all.dashboard.ignition.value = 3;

    setTimeout(function() {
        document.all.dashboard.ignition.value = 2;
    }, 500);
});

const dumpitemsBtn = document.querySelector("#dumpitemsBtn");
dumpitemsBtn.addEventListener("click", function() {
  console.dir(document.all)
});

const fupengineBtn = document.querySelector("#fupengineBtn");
fupengineBtn.addEventListener("click", function() {
  document.all.dashboard.ignition.value = 3;
});

const closebtn = document.querySelector("#closebtn");
closebtn.addEventListener("click", function() {
    modmenu.style.opacity = '0';
    modmenu.remove();
});

// Stop the update interval when the page is unloaded
window.addEventListener("unload", function() {
  clearInterval(updateInterval);
});
