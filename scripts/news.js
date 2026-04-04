(function () {
  var newsList = document.getElementById("news");

  fetch("https://site.flybull.net/news?hp=1", { cache: "no-store" })
    .then(function (response) {
      return response.json();
    })
    .then(function (news) {
      news.forEach(function (n) {
        var a = document.createElement("a");
        a.className = "news-card";
        a.href = "./news.html?id=" + n.id;

        var title = document.createElement("span");
        title.className = "news-card-title";
        title.textContent = n.title;

        var date = document.createElement("span");
        date.className = "news-card-date";
        date.textContent = n.date;

        a.appendChild(title);
        a.appendChild(date);
        newsList.appendChild(a);
      });
    })
    .catch(function () {
      var newsRelated = document.querySelectorAll(".news-elements");
      newsRelated.forEach(function (element) {
        element.style.display = "none";
      });
    });
})();
