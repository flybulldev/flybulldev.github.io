async function checkAlert() {
  try {
    const response = await fetch("https://licexam.com/flybull/alert.json", { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.alert !== "") {
      const alert = document.getElementById('alert');
      alert.textContent = data.alert;
      alert.style.display = 'block';
    }
  } catch (error) {
    console.log(error)
  }
}

function progressBarAnimate() {
  let percentage = 10;
  setInterval(() => {
    percentage = (percentage + 1) % 100;
    if (percentage === 0) percentage = 10;
    const progBar = document.querySelector("#prog-bar");
    progBar.style.width = `${percentage}%`;
    progBar.textContent = `${percentage}%`;
  }, 1000);
}

function toHome() {
  window.scrollTo(0, 0);
}

window.onload = () => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  const toastLiveExample = document.getElementById("liveToast");

  checkAlert();
  progressBarAnimate();

  setTimeout(() => {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
  }, 5000);
};
