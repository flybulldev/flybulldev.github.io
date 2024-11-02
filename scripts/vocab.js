Vue.createApp({
    data() {
        return {
            section: 0,
            vocabs: [{
                word: 'Concrete',
                cn: '混凝土',
                audio: 'concrete.mp3',
                question: 'The purpose of a batter board in <b>concrete</b> Work is:',
                questionCn: '<b>混凝土</b>工程中打板的目的是:',
                answer: 'to support layout strings when locating foundations',
                answerCn: '在确定地基位置时，支持布局弦线'
            },
            {
                word: 'Cable',
                cn: '电缆',
                audio: 'cable.mp3',
                question: 'Which of the following is the smallest Romex <b>cable</b>?',
                questionCn: '以下哪个是最小的Romex<b>电缆</b>？',
                answer: '14 Gauge',
                answerCn: '14 铅径'
            },
            {
                word: 'Approve',
                cn: '批准',
                audio: 'approve.mp3',
                question: 'Which of the following may <b>approve</b> a change order on a public works project?',
                questionCn: '以下哪项可以<b>批准</b>公共工程项目的变更令？',
                answer: 'City',
                answerCn: '市政府'
            },
            {
                word: 'Handrail',
                cn: '扶手',
                audio: 'handrail.mp3',
                question: 'What is the minimum height of a staircase <b>handrail</b>?',
                questionCn: '楼梯<b>扶手</b>的最低高度是多少？',
                answer: '34"',
                answerCn: '34英寸'
            },
            {
                word: 'Minimum',
                cn: '最小',
                audio: 'minimum.mp3',
                question: 'What is the <b>minimum</b> openable area for a window that is to be used as an escape window?',
                questionCn: '用作逃生窗的窗户<b>最小</b>可开启面积是多少？',
                answer: '5.7 square feet',
                answerCn: '5.7 平方英尺'
            },
            {
                word: 'Reportable',
                cn: '应报告的',
                audio: 'reportable.mp3',
                question: 'All <b>reportable</b> occupational injuries and illnesses are submitted on Cal/OSHA Form 5020 within:',
                questionCn: '所有<b>应报告的</b>工伤和疾病都应该在在多长时间之内报告给Cal/OSHA表格5020？',
                answer: 'Five days',
                answerCn: '五天'
            },
            {
                word: 'Diameter',
                cn: '直径',
                audio: 'diameter.mp3',
                question: 'A contractor installs a handrail along a stairway. The handrail is 1-5/8" in <b>diameter</b> and is installed 1-3/4" from the wall. Based on this installation, does the handrail meet building codes?',
                questionCn: '一个承包商沿着楼梯安装扶手。扶手的<b>直径</b>为1-5/8英寸，安装在离墙1-3/4英寸的地方。根据这种安装方式，该扶手是否符合建筑规范？',
                answer: 'Yes',
                answerCn: '是'
            },
            {
                word: 'Contract',
                cn: '合同',
                audio: 'contract.mp3',
                question: 'If Eric is selling or negotiating <b>contracts</b> at a client’s home and does not hold a Home Improvement Salesperson Registration, what kind of charge can the Registrar of Contractors impose on Eric?',
                questionCn: '如果Eric在客户家中进行销售或谈判<b>合同</b>，并且没有持有家庭装修销售人员的注册资格，那么承包商注册局可以对Eric提出什么样的指控？',
                answer: 'Misdemeanor',
                answerCn: '轻罪'
            }],
            index: 0,
            options: [],
            finish: false,
            input: '',
            inputError: false,
            inputPass: false,
            inputHint: ''
        }
    },
    methods: {
        back() {
            this.index--
        },
        next() {
            this.index++
        },
        getRandomOptions(correct) {
            const indexes = [this.index]
            let randomNum

            while (indexes.length < 4) {
                randomNum = Math.floor(Math.random() * this.vocabs.length)
                if(!indexes.includes(randomNum) && randomNum !== correct) {
                    indexes.push(randomNum)
                }
            }

            return indexes
        },
        getOptions() {
            const correct = this.vocabs[this.index]
            const randomOptionIndex = this.getRandomOptions(correct)

            let randomOptions = randomOptionIndex.map(opt => ({
                text: this.vocabs[opt].word,
                cn: this.vocabs[opt].cn,
                correct: opt === this.index,
                highlight: false
            }))

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                
                return array;
            }

            return shuffleArray(randomOptions)
        },
        optClick(i) {
            this.options[i] = { ...this.options[i], highlight: true }

            if (!this.options[i].correct) return

            setTimeout(() => {
                if (this.index < this.vocabs.length - 1) 
                    this.index++
                else
                    this.finish = true
            }, 400)
        },
        playsound() {
            const audioUrl = `./assets/${this.vocabs[this.index].audio}`
            const audio = new Audio(audioUrl)
            audio.play()
        },
        // setInput(evt) {
        //     console.log(evt.target.value)
        //     this.input = '+'
        // },
        restart() {
            this.index = 0
            this.finish = false
        },
        gotoSection(section) {
            this.section = section
            this.restart()
        }
    },
    watch: {
        section(val) {
            this.index = 0
            if (val === 0) {
                this.options = []
            } else if (val === 1 || this.section === 2) {
                this.options = this.getOptions()
            } else if (val === 3) {
                
            }
        },
        index() {
            if (this.section === 1 || this.section === 2) {
                this.options = this.getOptions()
            }
        },
        input(val, prev) {
            const stringToCompare = this.vocabs[this.index].word.slice(0, val.length)
            const isError =  val.toLowerCase() !== stringToCompare.toLowerCase()

            this.inputError = isError
            this.inputHint = stringToCompare

            // if (isError) {
            //     this.input = prev
            // }

            if(val.toLowerCase() === this.vocabs[this.index].word.toLowerCase()) {
                this.inputPass = true
                setTimeout(() => {
                    this.inputPass = false
                    this.input = ''
                    this.inputHint = ''
                    this.index++
                }, 1000)
            }
        }
    }
}).mount('#vocabulary')