Vue.createApp({
    data() {
        return {
            bookCovers: [
                'Cover_a.png', 'Cover_b.png', 'Cover_c_10.png', 'Cover_c_20.png', 
                'Cover_c_33.png', 'Cover_c_36.png', 'Cover_c_46.png', 'Cover_h_n_s.png',
                'Cover_l_n_b.png', 'Cover_m&c.png'
            ],
            currentIndex: 0,
        }
    },
    methods: {
        previous() {
            if(this.currentIndex > 0)
                this.currentIndex--
        },
        next() {
            if(this.bookCovers && this.currentIndex < this.bookCovers.length - 1)
                this.currentIndex++
        }
    }
}).mount('#book')