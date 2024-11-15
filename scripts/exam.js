const questions = [
  {
    question: "The purpose of a batter board in concrete Work is:",
    options: [
      "to use when mixing concrete",
      "as a wood support in a concrete form",
      "as a part of a wood shoring system",
      "to support layout strings when locating foundations",
    ],
    answer: 3,
  },
  {
    question: "Which of the following is the smallest Romex cable?",
    options: ["30 Gauge", "10 Gauge", "14 Gauge", "16 Gauge"],
    answer: 2,
  },
  {
    question:
      "Which of the following may approve a change order on a public works project?",
    options: ["Contractor", "City", "Subcontractor", "CSLB"],
    answer: 1,
  },
  {
    question: "What is the minimum height of a staircase handrail?",
    options: ['24"', '34"', '38"', '42"'],
    answer: 1,
  },
  {
    question:
      "What is the minimum openable area for a window that is to be used as an escape window?",
    options: [
      "4 square feet",
      "5.7 square feet",
      "6 square feet",
      "8.2 square feet",
    ],
    answer: 1,
  },
  {
    question:
      "All reportable occupational injuries and illnesses are submitted on Cal/OSHA Form 5020 within:",
    options: ["24 hours", "48 hours", "Three days", "Five days"],
    answer: 3,
  },
  {
    question:
      'A contractor installs a handrail along a stairway. The handrail is 1-5/8" in diameter and is installed 1-3/4" from the wall. Based on this installation, does the handrail meet building codes?',
    options: [
      "Yes",
      'No, the handrail should be 1-3/4" in diameter and installed 2" from the wall',
      'No, the handrail should be 2" in diameter and installed 2" from the wall',
      'No, the handrail should be 1" in diameter and installed 1-1/2" from the wall',
    ],
    answer: 0,
  },
  {
    question:
      "If Eric is selling or negotiating contracts at a client’s home and does not hold a Home Improvement Salesperson Registration, what kind of charge can the Registrar of Contractors impose on Eric?",
    options: [
      "Fine of $5,000",
      "120 days in county jail",
      "Misdemeanor",
      "Felony",
    ],
    answer: 2,
  },
  {
    question:
      "Refer to the diagram. Identify the jumper connecting the neutral busbar to the metal of the distribution box.",
    options: [
      "System bonding jumper",
      "Main bonding jumper",
      "Grounding rod jumper",
      "Feeders tap jumper",
    ],
    image: "imgId07019C10P",
    answer: 1,
  },
  {
    question: 'What is the minimum distance for "Y"?',
    options: ["8 in", "12 in", "18 in", "24 in"],
    image: "imgFbId01010E",
    answer: 2,
  },
];

const translations = [
  {
    question: "混凝土工程中打板的目的是：",
    options: [
      "搅拌混凝土时使用的",
      "作为混凝土结构中的木材支撑",
      "作为木护栏系统的一部分",
      "在确定地基位置时，支持布局弦线",
    ],
  },
  {
    question: "以下哪个是最小的Romex电缆？",
    options: ["30 号", "10 号", "14 号", "16 号"],
  },
  {
    question: "以下哪项可以批准公共工程项目的变更令？",
    options: ["承包商", "市政府", "分包商", "CSLB"],
  },
  {
    question: "楼梯扶手的最低高度是多少？",
    options: ["24英寸", "34英寸", "38英寸", "42英寸"],
  },
  {
    question: "用作逃生窗的窗户最小可开启面积是多少？",
    options: ["4平方尺", "5.7 平方英尺", "6 平方英尺", "8.2 平方英尺"],
  },
  {
    question:
      "所有应报告的工伤和疾病都应该在在多长时间之内报告给Cal/OSHA表格5020？",
    options: ["24小时", "48小时", "三天", "五天"],
  },
  {
    question:
      "一个承包商沿着楼梯安装扶手。扶手的直径为1-5/8英寸，安装在离墙1-3/4英寸的地方。根据这种安装方式，该扶手是否符合建筑规范？",
    options: [
      "是",
      "不，扶手的直径应该是1-3/4英寸，安装在离墙2英寸的地方。",
      "不，扶手的直径应该是2英寸，安装在离墙2英寸的地方。",
      "不，扶手的直径应该是1英寸，安装在离墙1-1/2英寸的地方。",
    ],
  },
  {
    question:
      "如果Eric在客户家中进行销售或谈判合同，并且没有持有家庭装修销售人员的注册资格，那么承包商注册局可以对Eric提出什么样的指控？",
    options: ["罚款5,000美元", "在县级监狱服刑120天", "轻罪", "重罪"],
  },
  {
    question: "参照图示。确定连接中性母线和配电箱金属的跳线。",
    options: ["系统粘合跳线", "主键合跳线", "接地棒跳线", "供料器分接跳线"],
  },
  {
    question: '"Y"的最小距离是多少？',
    options: ["8英寸", "12英寸", "18英寸", "24英寸"],
  },
];

Vue.createApp({
  data() {
    return {
      studyMode: true,
      questions,
      translations,
      imageLocation: null,
      currentIndex: 0,
      selectedOptions: {},
      flaggedQuestions: [],
      translate: false,
    };
  },
  methods: {
    goToQuestion(index) {
      this.currentIndex = index;
    },
    changeMode() {
      this.studyMode = !this.studyMode;
    },
    selectOption(index) {
      this.selectedOptions[this.currentIndex] = index;
    },
    back() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    next() {
      if (this.currentIndex < this.questions.length - 1) this.currentIndex++;
      else if (!this.studyMode) {
        this.currentIndex = 0;
        this.studyMode = true;
      }
    },
    getAnswerIndicator(index) {
      if (!this.studyMode) return "";
      if (this.selectedOptions[this.currentIndex] === undefined) return "";

      if (this.questions[this.currentIndex].answer === index) {
        return "text-success";
      } else {
        return "text-danger";
      }
    },
    getQuestionNumIndicator(index) {
      if (!this.studyMode) return "";
      if (this.selectedOptions[index] === undefined) return "";

      if (this.questions[index].answer === this.selectedOptions[index]) {
        return "green-bg";
      } else {
        return "red-bg";
      }
    },
    showTranslations() {
      this.translate = !this.translate;
    },
    flag() {
      if (this.flaggedQuestions.includes(this.currentIndex)) {
        this.flaggedQuestions = this.flaggedQuestions.filter(
          (q) => q !== this.currentIndex
        );
      } else {
        this.flaggedQuestions.push(this.currentIndex);
      }
    },
  },
  // watch: {
  //     currentIndex(){
  //         this.translate = false
  //     }
  // },
}).mount("#exam");
