(function () {
  var vocabs = [
    {
      word: "Concrete",
      cn: "混凝土",
      audio: "concrete.mp3",
      question: "The purpose of a batter board in <b>concrete</b> Work is:",
      questionCn: "<b>混凝土</b>工程中打板的目的是:",
      answer: "to support layout strings when locating foundations",
      answerCn: "在确定地基位置时，支持布局弦线",
    },
    {
      word: "Cable",
      cn: "电缆",
      audio: "cable.mp3",
      question: "Which of the following is the smallest Romex <b>cable</b>?",
      questionCn: "以下哪个是最小的Romex<b>电缆</b>？",
      answer: "14 Gauge",
      answerCn: "14 铅径",
    },
    {
      word: "Approve",
      cn: "批准",
      audio: "approve.mp3",
      question:
        "Which of the following may <b>approve</b> a change order on a public works project?",
      questionCn: "以下哪项可以<b>批准</b>公共工程项目的变更令？",
      answer: "City",
      answerCn: "市政府",
    },
    {
      word: "Handrail",
      cn: "扶手",
      audio: "handrail.mp3",
      question:
        "What is the minimum height of a staircase <b>handrail</b>?",
      questionCn: "楼梯<b>扶手</b>的最低高度是多少？",
      answer: '34"',
      answerCn: "34英寸",
    },
    {
      word: "Minimum",
      cn: "最小",
      audio: "minimum.mp3",
      question:
        "What is the <b>minimum</b> openable area for a window that is to be used as an escape window?",
      questionCn: "用作逃生窗的窗户<b>最小</b>可开启面积是多少？",
      answer: "5.7 square feet",
      answerCn: "5.7 平方英尺",
    },
    {
      word: "Reportable",
      cn: "应报告的",
      audio: "reportable.mp3",
      question:
        "All <b>reportable</b> occupational injuries and illnesses are submitted on Cal/OSHA Form 5020 within:",
      questionCn:
        "所有<b>应报告的</b>工伤和疾病都应该在在多长时间之内报告给Cal/OSHA表格5020？",
      answer: "Five days",
      answerCn: "五天",
    },
    {
      word: "Diameter",
      cn: "直径",
      audio: "diameter.mp3",
      question:
        'A contractor installs a handrail along a stairway. The handrail is 1-5/8" in <b>diameter</b> and is installed 1-3/4" from the wall. Based on this installation, does the handrail meet building codes?',
      questionCn:
        "一个承包商沿着楼梯安装扶手。扶手的<b>直径</b>为1-5/8英寸，安装在离墙1-3/4英寸的地方。根据这种安装方式，该扶手是否符合建筑规范？",
      answer: "Yes",
      answerCn: "是",
    },
    {
      word: "Contract",
      cn: "合同",
      audio: "contract.mp3",
      question:
        "If Eric is selling or negotiating <b>contracts</b> at a client's home and does not hold a Home Improvement Salesperson Registration, what kind of charge can the Registrar of Contractors impose on Eric?",
      questionCn:
        "如果Eric在客户家中进行销售或谈判<b>合同</b>，并且没有持有家庭装修销售人员的注册资格，那么承包商注册局可以对Eric提出什么样的指控？",
      answer: "Misdemeanor",
      answerCn: "轻罪",
    },
  ];

  var section = 0;
  var index = 0;
  var options = [];
  var finish = false;
  var inputValue = "";
  var inputError = false;
  var inputPass = false;
  var inputHint = "";

  var contentEl = document.getElementById("vocab-content");
  var secBtns = [
    document.getElementById("vocab-sec-0"),
    document.getElementById("vocab-sec-1"),
    document.getElementById("vocab-sec-2"),
    document.getElementById("vocab-sec-3"),
  ];

  var secClasses = [
    ["btn-primary", "btn-outline-primary"],
    ["btn-danger", "btn-outline-danger"],
    ["btn-success", "btn-outline-success"],
    ["btn-warning", "btn-outline-warning"],
  ];

  function updateSectionButtons() {
    for (var i = 0; i < secBtns.length; i++) {
      var btn = secBtns[i];
      btn.className = "btn btn-lg " + (i === section ? secClasses[i][0] : secClasses[i][1]);
    }
  }

  function playsound() {
    var audio = new Audio("./assets/" + vocabs[index].audio);
    audio.play();
  }

  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function getOptions() {
    var indexes = [index];
    while (indexes.length < 4) {
      var r = Math.floor(Math.random() * vocabs.length);
      if (indexes.indexOf(r) === -1) indexes.push(r);
    }
    var opts = indexes.map(function (opt) {
      return {
        text: vocabs[opt].word,
        cn: vocabs[opt].cn,
        correct: opt === index,
        highlight: false,
      };
    });
    return shuffleArray(opts);
  }

  // Section 0: 学习
  function renderSection0() {
    var v = vocabs[index];
    var sec = document.createElement("section");
    sec.className = "vocab-sub-sections";

    // Progress bar
    var progressWrap = document.createElement("div");
    progressWrap.className = "vocab-progress";
    var progressLabel = document.createElement("span");
    progressLabel.className = "vocab-progress-label";
    progressLabel.textContent = (index + 1) + " / " + vocabs.length;
    var progressBg = document.createElement("div");
    progressBg.className = "vocab-progress-bar";
    var progressFill = document.createElement("div");
    progressFill.className = "vocab-progress-fill";
    progressFill.style.width = ((index + 1) / vocabs.length * 100) + "%";
    progressBg.appendChild(progressFill);
    progressWrap.appendChild(progressLabel);
    progressWrap.appendChild(progressBg);
    sec.appendChild(progressWrap);

    // Card
    var card = document.createElement("div");
    card.className = "vocab-study-card";

    // Word row: word + sound button
    var wordRow = document.createElement("div");
    wordRow.className = "vocab-study-word-row";

    var h2 = document.createElement("h2");
    h2.className = "vocab-study-word";
    h2.textContent = v.word;

    var soundBtn = document.createElement("button");
    soundBtn.type = "button";
    soundBtn.className = "vocab-sound-btn";
    soundBtn.addEventListener("click", playsound);
    var icon = document.createElement("i");
    icon.className = "bi bi-volume-up-fill";
    soundBtn.appendChild(icon);

    wordRow.appendChild(h2);
    wordRow.appendChild(soundBtn);
    card.appendChild(wordRow);

    // Divider
    var divider = document.createElement("div");
    divider.className = "vocab-study-divider";
    card.appendChild(divider);

    // Chinese translation
    var cnDiv = document.createElement("div");
    cnDiv.className = "vocab-study-cn";
    cnDiv.textContent = v.cn;
    card.appendChild(cnDiv);

    sec.appendChild(card);

    // Nav
    var navContainer = document.createElement("div");
    navContainer.className = "question-nav-container margin-block";
    var nav = document.createElement("div");
    nav.className = "question-nav";

    var backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className =
      "btn btn-outline-" + (index === 0 ? "secondary" : "warning");
    backBtn.disabled = index === 0;
    backBtn.textContent = "上一个";
    backBtn.addEventListener("click", function () {
      if (index > 0) {
        index--;
        render();
        playsound();
      }
    });

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className =
      "btn btn-outline-" + (index === vocabs.length - 1 ? "secondary" : "warning");
    nextBtn.disabled = index === vocabs.length - 1;
    nextBtn.textContent = "下一个";
    nextBtn.addEventListener("click", function () {
      if (index < vocabs.length - 1) {
        index++;
        render();
        playsound();
      }
    });

    nav.appendChild(backBtn);
    nav.appendChild(nextBtn);
    navContainer.appendChild(nav);
    sec.appendChild(navContainer);

    contentEl.replaceChildren(sec);
  }

  // Section 1 & 2: 发音 / 词义
  function renderSection12() {
    var sec = document.createElement("section");
    sec.className = "vocab-sub-sections";

    if (finish) {
      var restartBtn = document.createElement("button");
      restartBtn.type = "button";
      restartBtn.className = "btn btn-primary margin-block";
      restartBtn.textContent = "重新开始";
      restartBtn.addEventListener("click", function () {
        index = 0;
        finish = false;
        options = getOptions();
        render();
        playsound();
      });
      sec.appendChild(restartBtn);
      contentEl.replaceChildren(sec);
      return;
    }

    if (section === 2) {
      var h2 = document.createElement("h2");
      h2.className = "display-6 fw-light";
      h2.textContent = vocabs[index].word;
      sec.appendChild(h2);
    }

    var soundBtn = document.createElement("button");
    soundBtn.type = "button";
    soundBtn.className = "btn btn-light";
    soundBtn.addEventListener("click", playsound);
    var icon = document.createElement("i");
    icon.className = "bi bi-volume-up-fill";
    soundBtn.appendChild(icon);
    sec.appendChild(soundBtn);

    var optsDiv = document.createElement("div");
    optsDiv.className = "vocab-options margin-block";

    for (var i = 0; i < options.length; i++) {
      (function (optIdx) {
        var opt = options[optIdx];
        var div = document.createElement("div");
        div.className = "vocab-option";
        if (opt.highlight) {
          div.style.backgroundColor = opt.correct
            ? "rgb(150, 255, 150)"
            : "rgb(255, 150, 150)";
        }
        var text =
          optIdx + 1 + ". " + (section === 1 ? opt.text + " - " + opt.cn : opt.cn);
        div.textContent = text;
        div.addEventListener("click", function () {
          options[optIdx] = {
            text: opt.text,
            cn: opt.cn,
            correct: opt.correct,
            highlight: true,
          };
          if (opt.correct) {
            render();
            setTimeout(function () {
              if (index < vocabs.length - 1) {
                index++;
                options = getOptions();
                render();
                playsound();
              } else {
                finish = true;
                render();
              }
            }, 400);
          } else {
            render();
          }
        });
        optsDiv.appendChild(div);
      })(i);
    }

    sec.appendChild(optsDiv);
    contentEl.replaceChildren(sec);
  }

  // Section 3: 拼写
  function renderSection3() {
    var sec = document.createElement("section");
    sec.className = "vocab-sub-sections";

    if (finish) {
      var restartBtn = document.createElement("button");
      restartBtn.type = "button";
      restartBtn.className = "btn btn-primary margin-block";
      restartBtn.textContent = "重新开始";
      restartBtn.addEventListener("click", function () {
        index = 0;
        finish = false;
        inputValue = "";
        inputError = false;
        inputPass = false;
        inputHint = "";
        render();
        playsound();
      });
      sec.appendChild(restartBtn);
      contentEl.replaceChildren(sec);
      return;
    }

    var soundBtn = document.createElement("button");
    soundBtn.type = "button";
    soundBtn.className = "btn btn-light";
    soundBtn.addEventListener("click", playsound);
    var icon = document.createElement("i");
    icon.className = "bi bi-volume-up-fill";
    soundBtn.appendChild(icon);
    sec.appendChild(soundBtn);

    var cnH2 = document.createElement("h2");
    cnH2.className = "fw-light vocab-cn margin-row";
    cnH2.textContent = vocabs[index].cn;
    sec.appendChild(cnH2);

    var inputContainer = document.createElement("div");
    inputContainer.className = "margin-block vocab-options";

    var input = document.createElement("input");
    input.type = "text";
    input.className =
      "form-control vocab-input" +
      (inputError ? " is-invalid" : "") +
      (inputPass ? " is-valid" : "");
    input.value = inputValue;
    input.addEventListener("input", function (evt) {
      inputValue = evt.target.value;
      var word = vocabs[index].word;
      var compare = word.slice(0, inputValue.length);
      var isError = inputValue.toLowerCase() !== compare.toLowerCase();
      inputError = isError;
      inputHint = compare;

      if (inputValue.toLowerCase() === word.toLowerCase()) {
        inputPass = true;
        render();
        setTimeout(function () {
          inputPass = false;
          inputValue = "";
          inputHint = "";
          if (index < vocabs.length - 1) {
            index++;
          } else {
            finish = true;
          }
          render();
          // focus the new input
          var newInput = contentEl.querySelector("input.vocab-input");
          if (newInput) newInput.focus();
          playsound();
        }, 1000);
      } else {
        render();
        // keep focus and cursor position
        var newInput = contentEl.querySelector("input.vocab-input");
        if (newInput) {
          newInput.focus();
          newInput.selectionStart = newInput.selectionEnd = inputValue.length;
        }
      }
    });
    inputContainer.appendChild(input);

    var hintContainer = document.createElement("div");
    hintContainer.className = "input-hin-container";
    if (inputError) {
      var hintDiv = document.createElement("div");
      hintDiv.className = "input-hint";
      hintDiv.textContent = inputHint;
      hintContainer.appendChild(hintDiv);
    }
    inputContainer.appendChild(hintContainer);
    sec.appendChild(inputContainer);

    contentEl.replaceChildren(sec);

    // auto-focus on initial render
    input.focus();
  }

  function render() {
    updateSectionButtons();
    if (section === 0) {
      renderSection0();
    } else if (section === 1 || section === 2) {
      renderSection12();
    } else if (section === 3) {
      renderSection3();
    }
  }

  // Section button listeners
  for (var i = 0; i < secBtns.length; i++) {
    (function (s) {
      secBtns[s].addEventListener("click", function () {
        section = s;
        index = 0;
        finish = false;
        inputValue = "";
        inputError = false;
        inputPass = false;
        inputHint = "";
        if (s === 1 || s === 2) {
          options = getOptions();
        }
        render();
      });
    })(i);
  }

  // Initial render
  render();
})();
