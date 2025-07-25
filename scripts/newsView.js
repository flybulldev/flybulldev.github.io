window.onload = () => {
  setupFooterContacts();
};

Vue.createApp({
  data() {
    return {
      id: null,
      newsList: null,
      rowPerPage: 15,
      currentPage: 1,
      currentNews: null,
    };
  },
  computed: {
    numOfpages() {
      return this.newsList
        ? Math.ceil(this.newsList.length / this.rowPerPage)
        : 1;
    },

    currentList() {
      if (!this.newsList) return null;
      const startNum = (this.currentPage - 1) * this.rowPerPage;
      const endNum = Math.min(startNum + this.rowPerPage, this.newsList.length);
      return this.newsList.slice(startNum, endNum);
    },
  },
  methods: {
    gotoPage(n) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("page", n);
      const newUrl = window.location.pathname + "?" + urlParams.toString();
      window.history.pushState({}, "", newUrl);
      this.currentPage = n;
    },
    setPage() {
      const urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has("id")) {
        this.id = urlParams.get("id");
      } else {
        if (urlParams.has("page")) {
          this.currentPage = urlParams.get("page");
        } else {
          this.currentPage = 1;
        }
      }
    },
  },
  async created() {
    this.setPage();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("id")) {
      let news = localStorage.getItem(`news-${this.id}`);
      if (news) {
        news = JSON.parse(news);
      } else {
        const url = `https://news.flybull.net/news.php?id=${this.id}`;
        const response = await fetch(url);
        news = await response.json();
        
        localStorage.setItem(`news-${this.id}`, JSON.stringify(news));
      }
      document.title = news.title
      this.currentNews = news;
    } else {
      try {
        const url = "https://news.flybull.net/news.php";
        const response = await fetch(url);
        const newsList = await response.json();
        this.newsList = newsList;
      } catch (e) {
        window.location.replace("/index.html");
      }
    }
  },
  beforeMount() {
    window.addEventListener("popstate", () => this.setPage());
  },
}).mount("#news-view");
