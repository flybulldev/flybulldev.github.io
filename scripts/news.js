Vue.createApp({
  data() {
    return {
      news: null,
    };
  },
  methods: {},
  async created() {
    try {
      const url = "https://news.flybull.net/news.php?hp=1";
      const response = await fetch(url, { cache: 'no-store' });
      const news = await response.json();

      this.news = news;
    } catch (e) {
      const newsRelated = document.querySelectorAll(".news-elements");
      newsRelated.forEach((element) => {
        element.style.display = "none";
      });
    }
  },
}).mount("#news");
