Vue.createApp({
    data() {
        return {
            news: null,
        }
    },
    methods: {
        
    },
    async created(){
        try {
            const url = 'https://licexam.com/flybull/news.php?hp=1'
            const response = await fetch(url)
            const news = await response.json()

            this.news = news
        }
        catch(e) {
            const newsRelated = document.querySelectorAll('.news-elements')
            newsRelated.forEach(element => {
                element.style.display = 'none'
            })
        }
    }
}).mount('#news')