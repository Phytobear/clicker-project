console.log("Hello World");

let wookieCount = 0;
let wookiesPerSecond = 1;

const wookieCountDisplay = document.getElementById("wookiesCount");
const wookiePerSecondDisplay = document.getElementById("wookiesPerSecond");
const bigWookieImage = document.getElementById("bigWookie");

bigWookieImage.addEventListener("click", function () {
  wookieCount++;
  updateUI();
});

function updateUI() {
  wookieCountDisplay.innerText = wookieCount;
  wookiePerSecondDisplay.innerText = wookiesPerSecond;
}

function update() {
  wookieCount += wookiesPerSecond;
  updateUI();
}

setInterval(update, 1000);
addDataToPage();

const api = "https://cookie-upgrade-api.vercel.app/api/upgrades";

// async function getWookies() {
//   const upgradeData = await fetch(
//     `https://cookie-upgrade-api.vercel.app/api/upgrades`
//   );

//   const finalInfo = await upgradeData.json();

// //   return finalInfo;

async function addDataToPage() {
  const data = await getWookies();
  console.log(data);
}

async function fetchUpgrade() {
  const res = await fetch(api);
  const fetchData = await res.json();
  createUpgradeButtons(fetchData);
}

function createUpgradeButtons(upgradeButton) {
  upgradeButton.forEach(function (upgrade) {
    const button = document.createElement("button");
    button.innerText = `${upgrade.name} {cost: ${upgrade.cost}}`;
    button.addEventListener("click", function () {
      if (wookieCount >= upgrade.cost) {
        wookieCount -= upgrade.cost;
        wookiesPerSecond += upgrade.increase;
        updateUI();
      }
    });
    buttonContainer.appendChild(button);
  });
}

fetchUpgrade();
