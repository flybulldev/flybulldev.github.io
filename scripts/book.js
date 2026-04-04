(function () {
  const bookCovers = [
    "Cover_a.png",
    "Cover_b.png",
    "Cover_c_10.png",
    "Cover_c_16.png",
    "Cover_c_20.png",
    "Cover_c_33.png",
    "Cover_c_36.png",
    "Cover_c_46.png",
    "Cover_h_n_s.png",
    "Cover_l_n_b.png",
    "Cover_m&c.png",
  ];

  let currentIndex = 0;

  const gallery = document.getElementById("book");
  const grid = gallery.querySelector(".book-grid");
  const preview = gallery.querySelector(".book-preview");
  const previewImg = preview.querySelector(".book-preview-img");
  const closeBtn = preview.querySelector(".book-preview-close");
  const prevBtn = document.getElementById("book-prev-btn");
  const nextBtn = document.getElementById("book-next-btn");

  // Build grid
  bookCovers.forEach(function (cover, index) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "book-card";
    btn.addEventListener("click", function () {
      openPreview(index);
    });

    const img = document.createElement("img");
    img.draggable = false;
    img.className = "book-card-img";
    img.alt = cover;
    img.src = "./assets/" + cover;

    btn.appendChild(img);
    grid.appendChild(btn);
  });

  function openPreview(index) {
    currentIndex = index;
    updatePreview();
    preview.style.display = "";
  }

  function closePreview() {
    preview.style.display = "none";
  }

  function previous() {
    if (currentIndex > 0) {
      currentIndex--;
      updatePreview();
    }
  }

  function next() {
    if (currentIndex < bookCovers.length - 1) {
      currentIndex++;
      updatePreview();
    }
  }

  function updatePreview() {
    previewImg.src = "./assets/" + bookCovers[currentIndex];
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === bookCovers.length - 1;
  }

  // Event listeners
  closeBtn.addEventListener("click", closePreview);
  prevBtn.addEventListener("click", previous);
  nextBtn.addEventListener("click", next);
  preview.addEventListener("click", function (e) {
    if (e.target === preview) closePreview();
  });
})();
