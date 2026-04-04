window.onload = function () {
  setupFooterContacts();
};

(function () {
  var rowPerPage = 15;
  var currentPage = 1;
  var newsList = null;

  var articleView = document.getElementById("news-article-view");
  var listView = document.getElementById("news-list-view");
  var breadcrumbTitle = document.getElementById("breadcrumb-title");
  var articleTitle = document.getElementById("news-article-title");
  var articleDate = document.getElementById("news-article-date");
  var articleContent = document.getElementById("news-article-content");
  var newsDiv = document.getElementById("news");
  var pager = document.getElementById("news-pager");

  var urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("id")) {
    showArticle(urlParams.get("id"));
  } else {
    if (urlParams.has("page")) {
      currentPage = parseInt(urlParams.get("page"), 10) || 1;
    }
    showList();
  }

  window.addEventListener("popstate", function () {
    var params = new URLSearchParams(window.location.search);
    if (params.has("id")) {
      showArticle(params.get("id"));
    } else {
      currentPage = params.has("page") ? parseInt(params.get("page"), 10) || 1 : 1;
      if (!newsList) {
        showList();
      } else {
        renderList();
      }
    }
  });

  async function showArticle(id) {
    articleView.style.display = "";
    listView.style.display = "none";
    breadcrumbTitle.style.display = "";

    articleTitle.textContent = "Loading...";
    articleDate.textContent = "";
    articleContent.textContent = "";

    try {
      var news;
      var cached = localStorage.getItem("news-" + id);
      if (cached) {
        news = JSON.parse(cached);
      } else {
        var response = await fetch("https://site.flybull.net/news?id=" + id);
        news = await response.json();
        localStorage.setItem("news-" + id, JSON.stringify(news));
      }

      document.title = news.title;
      breadcrumbTitle.textContent = news.title;
      articleTitle.textContent = news.title;
      articleDate.textContent = news.date;
      articleContent.innerHTML = news.content;
    } catch (e) {
      articleTitle.textContent = "加载失败";
    }
  }

  async function showList() {
    articleView.style.display = "none";
    listView.style.display = "";

    try {
      var response = await fetch("https://site.flybull.net/news");
      newsList = await response.json();
      renderList();
    } catch (e) {
      window.location.replace("/index.html");
    }
  }

  function renderList() {
    newsDiv.replaceChildren();

    var numOfPages = Math.ceil(newsList.length / rowPerPage);
    var startNum = (currentPage - 1) * rowPerPage;
    var endNum = Math.min(startNum + rowPerPage, newsList.length);
    var currentList = newsList.slice(startNum, endNum);

    currentList.forEach(function (n) {
      var a = document.createElement("a");
      a.className = "news-row";
      a.href = "./news.html?id=" + n.id;

      var title = document.createElement("span");
      title.className = "news-row-title";
      title.textContent = n.title;

      var date = document.createElement("span");
      date.className = "news-row-date";
      date.textContent = n.date;

      a.appendChild(title);
      a.appendChild(date);
      newsDiv.appendChild(a);
    });

    // Pager
    pager.replaceChildren();
    if (numOfPages > 1) {
      pager.style.display = "";

      var prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "news-page-btn";
      prevBtn.disabled = currentPage === 1;
      prevBtn.textContent = "\u00AB";
      prevBtn.addEventListener("click", function () {
        gotoPage(currentPage - 1);
      });
      pager.appendChild(prevBtn);

      for (var n = 1; n <= numOfPages; n++) {
        (function (pageNum) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className =
            "news-page-btn" +
            (currentPage === pageNum ? " news-page-btn-active" : "");
          btn.textContent = pageNum;
          btn.addEventListener("click", function () {
            gotoPage(pageNum);
          });
          pager.appendChild(btn);
        })(n);
      }

      var nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = "news-page-btn";
      nextBtn.disabled = currentPage === numOfPages;
      nextBtn.textContent = "\u00BB";
      nextBtn.addEventListener("click", function () {
        gotoPage(currentPage + 1);
      });
      pager.appendChild(nextBtn);
    } else {
      pager.style.display = "none";
    }
  }

  function gotoPage(n) {
    var params = new URLSearchParams(window.location.search);
    params.set("page", n);
    var newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
    currentPage = n;
    renderList();
  }
})();
