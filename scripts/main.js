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

function showMoreFAQ() {
  const moreFAQbtn = document.getElementById('faq-more-btn');
  moreFAQbtn.style.display = 'none';
  const moreFAQ = document.getElementById('faq-hidden');
  moreFAQ.style.display = 'block';
}

window.onload = () => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  const toastLiveExample = document.getElementById("liveToast");

  progressBarAnimate();
  setupFooterContacts();

  const copyRightYear = document.getElementById('copyright-year');
  const currentYear = new Date().getFullYear();
  copyRightYear.textContent = currentYear;

  setTimeout(() => {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
  }, 5000);
};
