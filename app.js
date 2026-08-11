const STORAGE_KEY = "kaoyan-2027-dashboard-v1";

const defaultData = {
  examDate: "2027-12-25",
  weeklyTargetHours: 28,
  activeTaskFilter: "today",
  activeMistakeFilter: "open",
  activeLogFilter: "week",
  subjects: [
    {
      name: "408",
      color: "#7460a8",
      chapters: [
        { name: "数据结构", progress: 12 },
        { name: "计算机组成原理", progress: 8 },
        { name: "操作系统", progress: 5 },
        { name: "计算机网络", progress: 5 },
        { name: "真题与综合题", progress: 0 }
      ]
    },
    {
      name: "数学一",
      color: "#376fa8",
      chapters: [
        { name: "高等数学", progress: 16 },
        { name: "线性代数", progress: 8 },
        { name: "概率论与数理统计", progress: 0 },
        { name: "习题强化", progress: 0 },
        { name: "真题套卷", progress: 0 }
      ]
    },
    {
      name: "英语一",
      color: "#2f8a63",
      chapters: [
        { name: "单词", progress: 18 },
        { name: "阅读", progress: 8 },
        { name: "翻译", progress: 0 },
        { name: "作文", progress: 0 },
        { name: "真题套卷", progress: 0 }
      ]
    },
    {
      name: "政治",
      color: "#b84c55",
      chapters: [
        { name: "马原", progress: 0 },
        { name: "毛中特", progress: 0 },
        { name: "史纲", progress: 0 },
        { name: "思修法基", progress: 0 },
        { name: "时政与冲刺背诵", progress: 0 }
      ]
    }
  ],
  tasks: [
    {
      id: crypto.randomUUID(),
      subject: "数学一",
      title: "高数：极限与连续知识点梳理",
      date: todayKey(),
      minutes: 90,
      done: false
    },
    {
      id: crypto.randomUUID(),
      subject: "408",
      title: "数据结构：线性表习题 25 题",
      date: todayKey(),
      minutes: 75,
      done: false
    },
    {
      id: crypto.randomUUID(),
      subject: "英语一",
      title: "单词复习 + 阅读真题 1 篇",
      date: todayKey(),
      minutes: 70,
      done: false
    },
    {
      id: crypto.randomUUID(),
      subject: "408",
      title: "计组：数制与编码预习",
      date: addDays(todayKey(), 1),
      minutes: 60,
      done: false
    }
  ],
  reviews: {},
  mistakes: [],
  exams: [],
  studyLogs: [],
  goals: {
    school: "",
    major: "",
    score: "",
    cutoff: "",
    materials: "",
    scores: { "408": "", "数学一": "", "英语一": "", "政治": "" },
    weights: { "408": 4, "数学一": 4, "英语一": 3, "政治": 2 }
  }
};

let state = loadState();

const els = {
  examDate: document.querySelector("#examDate"),
  daysLeft: document.querySelector("#daysLeft"),
  stageLabel: document.querySelector("#stageLabel"),
  todayTasks: document.querySelector("#todayTasks"),
  todayCompletion: document.querySelector("#todayCompletion"),
  subjectProgress: document.querySelector("#subjectProgress"),
  overallProgress: document.querySelector("#overallProgress"),
  hoursChart: document.querySelector("#hoursChart"),
  weekHours: document.querySelector("#weekHours"),
  weeklyTargetHours: document.querySelector("#weeklyTargetHours"),
  weekTargetStatus: document.querySelector("#weekTargetStatus"),
  riskList: document.querySelector("#riskList"),
  riskCount: document.querySelector("#riskCount"),
  calendarSummary: document.querySelector("#calendarSummary"),
  studyCalendar: document.querySelector("#studyCalendar"),
  roadmapCurrentLabel: document.querySelector("#roadmapCurrentLabel"),
  roadmapCurrentTitle: document.querySelector("#roadmapCurrentTitle"),
  roadmapCurrentDescription: document.querySelector("#roadmapCurrentDescription"),
  roadmapFocus: document.querySelector("#roadmapFocus"),
  roadmapTimeline: document.querySelector("#roadmapTimeline"),
  weekTaskCount: document.querySelector("#weekTaskCount"),
  weekCompletionMetric: document.querySelector("#weekCompletionMetric"),
  latestExamSubject: document.querySelector("#latestExamSubject"),
  latestExamMetric: document.querySelector("#latestExamMetric"),
  latestExamNote: document.querySelector("#latestExamNote"),
  goalForm: document.querySelector("#goalForm"),
  goalSchool: document.querySelector("#goalSchool"),
  goalMajor: document.querySelector("#goalMajor"),
  goalScore: document.querySelector("#goalScore"),
  goalCutoff: document.querySelector("#goalCutoff"),
  goalMaterials: document.querySelector("#goalMaterials"),
  goal408Score: document.querySelector("#goal408Score"),
  goalMathScore: document.querySelector("#goalMathScore"),
  goalEnglishScore: document.querySelector("#goalEnglishScore"),
  goalPoliticsScore: document.querySelector("#goalPoliticsScore"),
  goal408Weight: document.querySelector("#goal408Weight"),
  goalMathWeight: document.querySelector("#goalMathWeight"),
  goalEnglishWeight: document.querySelector("#goalEnglishWeight"),
  goalPoliticsWeight: document.querySelector("#goalPoliticsWeight"),
  saveGoals: document.querySelector("#saveGoals"),
  taskForm: document.querySelector("#taskForm"),
  taskSubject: document.querySelector("#taskSubject"),
  taskTitle: document.querySelector("#taskTitle"),
  taskDate: document.querySelector("#taskDate"),
  taskMinutes: document.querySelector("#taskMinutes"),
  taskPriority: document.querySelector("#taskPriority"),
  taskDifficulty: document.querySelector("#taskDifficulty"),
  taskList: document.querySelector("#taskList"),
  logForm: document.querySelector("#logForm"),
  logSubject: document.querySelector("#logSubject"),
  logTitle: document.querySelector("#logTitle"),
  logDate: document.querySelector("#logDate"),
  logMinutes: document.querySelector("#logMinutes"),
  logList: document.querySelector("#logList"),
  subjectCards: document.querySelector("#subjectCards"),
  mistakeForm: document.querySelector("#mistakeForm"),
  mistakeSubject: document.querySelector("#mistakeSubject"),
  mistakeSource: document.querySelector("#mistakeSource"),
  mistakeTopic: document.querySelector("#mistakeTopic"),
  mistakeType: document.querySelector("#mistakeType"),
  mistakePriority: document.querySelector("#mistakePriority"),
  mistakeNote: document.querySelector("#mistakeNote"),
  mistakeList: document.querySelector("#mistakeList"),
  weaknessRanking: document.querySelector("#weaknessRanking"),
  examForm: document.querySelector("#examForm"),
  examSubject: document.querySelector("#examSubject"),
  examTitle: document.querySelector("#examTitle"),
  examDateRecord: document.querySelector("#examDateRecord"),
  examScore: document.querySelector("#examScore"),
  examTotal: document.querySelector("#examTotal"),
  examMinutes: document.querySelector("#examMinutes"),
  examQuestionCount: document.querySelector("#examQuestionCount"),
  examWrongCount: document.querySelector("#examWrongCount"),
  examAssessment: document.querySelector("#examAssessment"),
  examNote: document.querySelector("#examNote"),
  examSummary: document.querySelector("#examSummary"),
  examCount: document.querySelector("#examCount"),
  examList: document.querySelector("#examList"),
  examTrendChart: document.querySelector("#examTrendChart"),
  examInsights: document.querySelector("#examInsights"),
  reviewStats: document.querySelector("#reviewStats"),
  reviewSummary: document.querySelector("#reviewSummary"),
  reviewGood: document.querySelector("#reviewGood"),
  reviewProblem: document.querySelector("#reviewProblem"),
  reviewNext: document.querySelector("#reviewNext"),
  saveReview: document.querySelector("#saveReview"),
  quickAddDashboard: document.querySelector("#quickAddDashboard"),
  exportData: document.querySelector("#exportData"),
  importData: document.querySelector("#importData"),
  toast: document.querySelector("#toast")
};

init();

function init() {
  els.examDate.value = state.examDate;
  els.weeklyTargetHours.value = state.weeklyTargetHours;
  els.taskDate.value = todayKey();
  populateSubjectOptions();
  els.examDateRecord.value = todayKey();
  els.logDate.value = todayKey();
  loadGoals();

  bindEvents();
  loadCurrentReview();
  render();
  showView(location.hash.replace("#", "") || "dashboard");
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      showView(item.dataset.view);
    });
  });

  els.examDate.addEventListener("change", () => {
    state.examDate = els.examDate.value || defaultData.examDate;
    persist();
    render();
    showToast("考试日期已更新");
  });

  els.weeklyTargetHours.addEventListener("change", () => {
    const target = Number(els.weeklyTargetHours.value);
    state.weeklyTargetHours = Number.isFinite(target) && target > 0 ? target : defaultData.weeklyTargetHours;
    els.weeklyTargetHours.value = state.weeklyTargetHours;
    persist();
    renderHoursChart();
    showToast("每周目标已更新");
  });

  els.taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = els.taskTitle.value.trim();
    if (!title) return;

    state.tasks.push({
      id: crypto.randomUUID(),
      subject: els.taskSubject.value,
      title,
      date: els.taskDate.value,
      minutes: Number(els.taskMinutes.value || 60),
      actualMinutes: 0,
      priority: els.taskPriority.value,
      difficulty: els.taskDifficulty.value,
      done: false
    });
    els.taskTitle.value = "";
    persist();
    render();
    showToast("任务已添加");
  });

  els.logForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = els.logTitle.value.trim();
    const minutes = Number(els.logMinutes.value);
    if (!title || !Number.isFinite(minutes) || minutes <= 0) return;

    state.studyLogs.push({
      id: crypto.randomUUID(),
      subject: els.logSubject.value,
      title,
      date: els.logDate.value,
      minutes,
      createdAt: new Date().toISOString()
    });
    els.logTitle.value = "";
    els.logMinutes.value = "60";
    persist();
    render();
    showToast("学习记录已保存");
  });

  els.mistakeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const topic = els.mistakeTopic.value.trim();
    if (!topic) return;

    state.mistakes.push({
      id: crypto.randomUUID(),
      subject: els.mistakeSubject.value,
      source: els.mistakeSource.value.trim(),
      topic,
      type: els.mistakeType.value,
      priority: els.mistakePriority.value,
      note: els.mistakeNote.value.trim(),
      reviewCount: 0,
      resolved: false,
      createdAt: todayKey()
    });
    els.mistakeTopic.value = "";
    els.mistakeSource.value = "";
    els.mistakeNote.value = "";
    persist();
    render();
    showToast("错题已记录");
  });

  els.examForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = els.examTitle.value.trim();
    const score = Number(els.examScore.value);
    const total = Number(els.examTotal.value);
    if (!title || !Number.isFinite(score) || !Number.isFinite(total) || total <= 0 || score < 0) return;
    if (score > total) {
      showToast("得分不能高于满分");
      return;
    }
    if (Number(els.examQuestionCount.value || 0) > 0 && Number(els.examWrongCount.value || 0) > Number(els.examQuestionCount.value || 0)) {
      showToast("错题数不能高于总题数");
      return;
    }

    state.exams.push({
      id: crypto.randomUUID(),
      subject: els.examSubject.value,
      title,
      date: els.examDateRecord.value,
      score,
      total,
      minutes: Number(els.examMinutes.value || 0),
      questionCount: Number(els.examQuestionCount.value || 0),
      wrongCount: Number(els.examWrongCount.value || 0),
      assessment: els.examAssessment.value,
      note: els.examNote.value.trim()
    });
    els.examTitle.value = "";
    els.examScore.value = "";
    els.examQuestionCount.value = "0";
    els.examWrongCount.value = "0";
    els.examNote.value = "";
    persist();
    render();
    showToast("套卷记录已保存");
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTaskFilter = button.dataset.filter;
      persist();
      render();
    });
  });

  document.querySelectorAll("[data-mistake-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMistakeFilter = button.dataset.mistakeFilter;
      persist();
      renderMistakeList();
    });
  });

  document.querySelectorAll("[data-log-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeLogFilter = button.dataset.logFilter;
      persist();
      renderLogList();
    });
  });

  els.quickAddDashboard.addEventListener("click", () => {
    showView("tasks");
    els.taskTitle.focus();
  });

  els.saveReview.addEventListener("click", () => {
    state.reviews[weekKey(new Date())] = {
      good: els.reviewGood.value,
      problem: els.reviewProblem.value,
      next: els.reviewNext.value,
      updatedAt: new Date().toISOString()
    };
    persist();
    showToast("复盘已保存");
  });

  els.saveGoals.addEventListener("click", saveGoals);
  els.goalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveGoals();
  });

  els.exportData.addEventListener("click", exportData);
  els.importData.addEventListener("change", importData);
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewId);
  });
  window.location.hash = viewId;
}

function render() {
  renderCountdown();
  renderRoadmap();
  renderDashboardTasks();
  renderDashboardMetrics();
  renderSubjectProgress();
  renderHoursChart();
  renderStudyCalendar();
  renderRisks();
  renderTaskList();
  renderLogList();
  renderSubjectCards();
  renderMistakeList();
  renderWeaknessRanking();
  renderExamRecords();
  renderReviewStats();
}

function renderCountdown() {
  const target = parseLocalDate(state.examDate);
  const now = stripTime(new Date());
  const diff = Math.max(0, Math.ceil((target - now) / 86400000));
  els.daysLeft.textContent = diff;
  els.stageLabel.textContent = getStage(target);
}

function getStage(target) {
  return getCurrentRoadmapStage(getRoadmapStages(target)).name;
}

function renderDashboardTasks() {
  const tasks = tasksForDate(todayKey());
  const done = tasks.filter((task) => task.done).length;
  els.todayCompletion.textContent = `${done}/${tasks.length}`;
  els.todayTasks.innerHTML = renderTasks(tasks.slice(0, 5), true);
}

function renderDashboardMetrics() {
  const weekTasks = filterTasks("week");
  const done = weekTasks.filter((task) => task.done).length;
  const rate = weekTasks.length ? Math.round((done / weekTasks.length) * 100) : 0;
  els.weekTaskCount.textContent = `${done}/${weekTasks.length}`;
  els.weekCompletionMetric.textContent = weekTasks.length ? `${rate}%` : "--";

  const latest = [...state.exams].sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!latest) {
    els.latestExamSubject.textContent = "--";
    els.latestExamMetric.textContent = "--";
    els.latestExamNote.textContent = "完成套卷后会显示在这里";
    return;
  }

  const scoreRate = Math.round((latest.score / latest.total) * 100);
  els.latestExamSubject.textContent = latest.subject;
  els.latestExamMetric.textContent = `${latest.score}/${latest.total}`;
  els.latestExamNote.textContent = `${scoreRate}% 得分率 · ${formatDate(latest.date)}`;
}

function renderSubjectProgress() {
  const subjectAverages = state.subjects.map((subject) => ({
    ...subject,
    progress: getSubjectProgress(subject)
  }));
  const overall = average(subjectAverages.map((subject) => subject.progress));
  els.overallProgress.textContent = `${Math.round(overall)}%`;
  els.subjectProgress.innerHTML = subjectAverages
    .map(
      (subject) => `
        <div class="progress-row">
          <div class="progress-label">
            <span>${subject.name}</span>
            <strong>${Math.round(subject.progress)}%</strong>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${subject.progress}%; background: ${subject.color};"></div>
          </div>
        </div>
      `
    )
    .join("");
}

function renderHoursChart() {
  const days = getCurrentWeekDays();
  const maxHours = Math.max(
    1,
    ...days.map((date) => logMinutesForDate(date) / 60)
  );
  const total = days.reduce((sum, date) => sum + logMinutesForDate(date), 0);
  els.weekHours.textContent = `${(total / 60).toFixed(1)}h`;
  const targetMinutes = Number(state.weeklyTargetHours || defaultData.weeklyTargetHours) * 60;
  const targetRate = Math.min(100, Math.round((total / targetMinutes) * 100));
  els.weekTargetStatus.textContent = total >= targetMinutes ? "本周目标已完成" : `已完成 ${targetRate}%`;
  els.hoursChart.innerHTML = days
    .map((date) => {
      const hours = logMinutesForDate(date) / 60;
      const height = Math.max(6, (hours / maxHours) * 150);
      return `
        <div class="bar-cell" title="${date} ${hours.toFixed(1)}h">
          <div class="bar" style="height: ${height}px;"></div>
          <span>${weekdayLabel(date)}</span>
        </div>
      `;
    })
    .join("");
}

function renderStudyCalendar() {
  const dates = Array.from({ length: 28 }, (_, index) => addDays(todayKey(), index - 27));
  const totalMinutes = dates.reduce((sum, date) => sum + logMinutesForDate(date), 0);
  const activeDays = dates.filter((date) => logMinutesForDate(date) > 0).length;
  els.calendarSummary.textContent = `${(totalMinutes / 60).toFixed(1)}h / ${activeDays} 天`;
  els.studyCalendar.innerHTML = dates
    .map((date) => {
      const minutes = logMinutesForDate(date);
      const level = minutes >= 240 ? 4 : minutes >= 150 ? 3 : minutes >= 60 ? 2 : minutes > 0 ? 1 : 0;
      const dateObject = parseLocalDate(date);
      return `
        <div class="calendar-day level-${level} ${date === todayKey() ? "today" : ""}" title="${formatDate(date)}：${minutes} 分钟">
          <strong>${dateObject.getMonth() + 1}/${dateObject.getDate()}</strong>
          <span>${minutes ? `${minutes} 分钟` : "未记录"}</span>
        </div>
      `;
    })
    .join("");
}

function renderRoadmap() {
  const stages = getRoadmapStages(parseLocalDate(state.examDate));
  const current = getCurrentRoadmapStage(stages);
  els.roadmapCurrentLabel.textContent = `${formatMonthDay(current.start)} 至 ${formatMonthDay(current.end)} · 当前阶段`;
  els.roadmapCurrentTitle.textContent = current.name;
  els.roadmapCurrentDescription.textContent = current.description;
  els.roadmapFocus.innerHTML = current.focus
    .map((item) => `<div class="roadmap-focus-item"><span>${item.subject}</span><strong>${item.text}</strong></div>`)
    .join("");
  els.roadmapTimeline.innerHTML = stages
    .map(
      (stage) => `
        <article class="roadmap-stage ${stage === current ? "active" : ""}">
          <div class="roadmap-stage-period">${formatMonthDay(stage.start)} - ${formatMonthDay(stage.end)}</div>
          <div>
            <h3>${stage.name}</h3>
            <p>${stage.description}</p>
            <ul>${stage.focus.map((item) => `<li>${item.subject}：${item.text}</li>`).join("")}</ul>
          </div>
        </article>
      `
    )
    .join("");
}

function renderRisks() {
  const risks = [];
  const todayTasks = tasksForDate(todayKey());
  const completion = todayTasks.length
    ? todayTasks.filter((task) => task.done).length / todayTasks.length
    : 1;

  if (todayTasks.length === 0) risks.push("今天还没有安排任务，建议至少放入数学、408、英语各一个小任务。");
  if (todayTasks.length > 0 && completion < 0.5) risks.push("今日任务完成率偏低，先挑一个 60 分钟以内的任务推进。");

  const overdue = overdueTasks();
  if (overdue.length > 0) risks.push(`有 ${overdue.length} 个逾期任务，先决定延期、拆分或删除，别让它们持续堆积。`);

  state.subjects.forEach((subject) => {
    const recent = state.tasks.some(
      (task) => task.subject === subject.name && daysBetween(task.date, todayKey()) <= 7
    );
    if (!recent && subject.name !== "政治") risks.push(`${subject.name} 最近 7 天没有任务，容易断线。`);
  });

  const politicsProgress = getSubjectProgress(state.subjects.find((subject) => subject.name === "政治"));
  if (politicsProgress > 20 && getStage(parseLocalDate(state.examDate)) === "基础期") {
    risks.push("政治基础期投入偏早，当前更建议把主力给数学一、408 和英语一。");
  }

  const urgentMistakes = state.mistakes.filter((item) => !item.resolved && item.priority === "high").length;
  if (urgentMistakes > 0) risks.push(`还有 ${urgentMistakes} 道高优先级错题未回看，安排一次集中订正。`);

  const recentFiveDays = Array.from({ length: 5 }, (_, index) => addDays(todayKey(), -index));
  const englishReading = [...state.tasks, ...state.studyLogs].some(
    (item) => item.subject === "英语一" && recentFiveDays.includes(item.date) && /阅读|read/i.test(item.title)
  );
  if (!englishReading) risks.push("英语阅读已连续 5 天没有记录，安排一篇真题阅读并做精读复盘。");

  const math = state.subjects.find((subject) => subject.name === "数学一");
  const overall = average(state.subjects.map(getSubjectProgress));
  if (math && getSubjectProgress(math) + 12 < overall) risks.push("数学一进度明显落后于平均水平，下一周优先补一个核心章节。");

  const recentLogMinutes = [0, 1, 2].reduce((sum, index) => sum + logMinutesForDate(addDays(todayKey(), -index)), 0);
  if (recentLogMinutes === 0) risks.push("最近 3 天没有学习记录，先补一条真实的专注记录，再安排一个可完成的小任务。");

  els.riskCount.textContent = `${risks.length} 条`;
  els.riskList.innerHTML = risks.length
    ? risks.map((risk) => `<div class="risk-item">${risk}</div>`).join("")
    : `<div class="empty-state">目前节奏比较稳，继续保持。</div>`;
}

function renderTaskList() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === state.activeTaskFilter);
  });

  const tasks = filterTasks(state.activeTaskFilter);
  els.taskList.innerHTML = renderTasks(tasks);
}

function renderTasks(tasks, compact = false) {
  if (!tasks.length) {
    return `<div class="empty-state">${compact ? "今天暂时没有任务。" : "当前筛选下没有任务。"}</div>`;
  }

  return tasks
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((task) => {
      const subject = state.subjects.find((item) => item.name === task.subject);
      return `
        <article class="task-row ${task.done ? "done" : ""} ${isOverdue(task) ? "overdue" : ""}">
          <input type="checkbox" ${task.done ? "checked" : ""} aria-label="切换任务完成状态" onchange="toggleTask('${task.id}')" />
          <div>
            <div class="task-title">${escapeHtml(task.title)}</div>
            <div class="task-meta">
              <span class="tag" style="border-left: 4px solid ${subject?.color || "#236c58"}">${task.subject}</span>
              <span>${formatDate(task.date)}</span>
              <span>${task.minutes} 分钟</span>
              <span class="priority ${task.priority || "medium"}">${priorityLabel(task.priority || "medium")}优先级</span>
              <span class="task-difficulty ${task.difficulty || "medium"}">${difficultyLabel(task.difficulty || "medium")}</span>
            </div>
          </div>
          <div class="task-actions">
            <label class="task-actual">实际
              <input type="number" min="0" step="5" value="${Number(task.actualMinutes || 0)}" aria-label="实际用时（分钟）" onchange="updateTaskActual('${task.id}', this.value)" />分
            </label>
            ${isOverdue(task) ? `<button class="compact-button" type="button" onclick="rescheduleTask('${task.id}')">移至今天</button>` : ""}
            <button class="delete-button" type="button" aria-label="删除任务" onclick="deleteTask('${task.id}')">×</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderLogList() {
  document.querySelectorAll("[data-log-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.logFilter === state.activeLogFilter);
  });

  const logs = state.studyLogs
    .filter((log) => state.activeLogFilter === "all" || getCurrentWeekDays().includes(log.date))
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));

  if (!logs.length) {
    els.logList.innerHTML = `<div class="empty-state">还没有学习记录。每次结束一段专注后，在这里记下真实时长。</div>`;
    return;
  }

  els.logList.innerHTML = logs
    .map(
      (log) => `
        <article class="log-row">
          <div>
            <div class="log-title">${escapeHtml(log.title)}</div>
            <div class="log-meta">
              <span class="tag">${escapeHtml(log.subject)}</span>
              <span>${formatDate(log.date)}</span>
              <span>${log.minutes} 分钟</span>
            </div>
          </div>
          <div class="row-actions">
            <button class="compact-button danger" type="button" aria-label="删除学习记录" onclick="deleteLog('${log.id}')">删除</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderSubjectCards() {
  els.subjectCards.innerHTML = state.subjects
    .map((subject, subjectIndex) => {
      const progress = getSubjectProgress(subject);
      return `
        <section class="panel subject-card">
          <div class="panel-header">
            <h3>${subject.name}</h3>
            <span>${Math.round(progress)}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${progress}%; background: ${subject.color};"></div>
          </div>
          <div class="chapter-list">
            ${subject.chapters
              .map(
                (chapter, chapterIndex) => `
                  <div class="chapter-row">
                    <label for="chapter-${subjectIndex}-${chapterIndex}">${chapter.name}</label>
                    <input
                      id="chapter-${subjectIndex}-${chapterIndex}"
                      type="range"
                      min="0"
                      max="100"
                      value="${chapter.progress}"
                      oninput="updateChapter(${subjectIndex}, ${chapterIndex}, this.value)"
                    />
                  </div>
                `
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderMistakeList() {
  document.querySelectorAll("[data-mistake-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mistakeFilter === state.activeMistakeFilter);
  });

  const mistakes = state.mistakes
    .filter((item) => {
      if (state.activeMistakeFilter === "all") return true;
      return state.activeMistakeFilter === "resolved" ? item.resolved : !item.resolved;
    })
    .sort((a, b) => {
      if (a.resolved !== b.resolved) return Number(a.resolved) - Number(b.resolved);
      return b.createdAt.localeCompare(a.createdAt);
    });

  if (!mistakes.length) {
    els.mistakeList.innerHTML = `<div class="empty-state">当前没有符合筛选条件的错题。</div>`;
    return;
  }

  els.mistakeList.innerHTML = mistakes
    .map(
      (item) => `
        <article class="mistake-row ${item.resolved ? "resolved" : ""}">
          <div>
            <div class="mistake-title">${escapeHtml(item.topic)}</div>
            <div class="mistake-meta">
              <span class="tag">${escapeHtml(item.subject)}</span>
              ${item.source ? `<span>${escapeHtml(item.source)}</span>` : ""}
              <span>${escapeHtml(item.type)}</span>
              <span class="priority ${item.priority}">${priorityLabel(item.priority)}优先级</span>
              <span>复习 ${Number(item.reviewCount || 0)} 次</span>
              <span>${formatDate(item.createdAt)}</span>
            </div>
            ${item.note ? `<div class="mistake-note">${escapeHtml(item.note)}</div>` : ""}
          </div>
          <div class="row-actions">
            <button class="compact-button" type="button" onclick="reviewMistake('${item.id}')">复习 +1</button>
            <button class="compact-button" type="button" onclick="toggleMistake('${item.id}')">${item.resolved ? "重新打开" : "标记解决"}</button>
            <button class="compact-button danger" type="button" aria-label="删除错题" onclick="deleteMistake('${item.id}')">删除</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderWeaknessRanking() {
  const ranking = Object.values(
    state.mistakes
      .filter((item) => !item.resolved)
      .reduce((groups, item) => {
        const key = `${item.subject}::${item.topic}`;
        if (!groups[key]) groups[key] = { subject: item.subject, topic: item.topic, count: 0, priority: item.priority };
        groups[key].count += 1;
        if (item.priority === "high") groups[key].priority = "high";
        return groups;
      }, {})
  )
    .sort((a, b) => b.count - a.count || priorityWeight(b.priority) - priorityWeight(a.priority))
    .slice(0, 6);

  els.weaknessRanking.innerHTML = ranking.length
    ? ranking
        .map(
          (item, index) => `
            <div class="weakness-row">
              <strong>${index + 1}</strong>
              <span class="tag">${escapeHtml(item.subject)}</span>
              <span class="weakness-topic">${escapeHtml(item.topic)}</span>
              <span>${item.count} 道未解决</span>
            </div>
          `
        )
        .join("")
    : `<div class="empty-state">记录错题后会自动生成薄弱点排行。</div>`;
}

function renderExamRecords() {
  const records = [...state.exams].sort((a, b) => b.date.localeCompare(a.date));
  els.examCount.textContent = `${records.length} 次`;

  if (!records.length) {
    els.examSummary.innerHTML = `
      <div class="summary-card"><span>平均得分率</span><strong>--</strong></div>
      <div class="summary-card"><span>最高得分率</span><strong>--</strong></div>
      <div class="summary-card"><span>累计模考用时</span><strong>0h</strong></div>
    `;
    renderExamAnalysis(records);
    els.examList.innerHTML = `<div class="empty-state">还没有套卷记录，完成第一套真题后从这里开始积累。</div>`;
    return;
  }

  const rates = records.map((item) => (item.score / item.total) * 100);
  const totalMinutes = records.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  els.examSummary.innerHTML = `
    <div class="summary-card"><span>平均得分率</span><strong>${Math.round(average(rates))}%</strong></div>
    <div class="summary-card"><span>最高得分率</span><strong>${Math.round(Math.max(...rates))}%</strong></div>
    <div class="summary-card"><span>累计模考用时</span><strong>${(totalMinutes / 60).toFixed(1)}h</strong></div>
  `;
  renderExamAnalysis(records);

  els.examList.innerHTML = records
    .map(
      (item) => `
        <article class="exam-row">
          <div>
            <div class="exam-title">${escapeHtml(item.title)}</div>
            <div class="exam-meta">
              <span class="tag">${escapeHtml(item.subject)}</span>
              <span>${formatDate(item.date)}</span>
              <span>${item.score}/${item.total} 分</span>
              <span>${item.minutes} 分钟</span>
              <span class="score-rate">${Math.round((item.score / item.total) * 100)}%</span>
              ${getCorrectRate(item) === null ? "" : `<span>正确率 ${getCorrectRate(item)}%</span>`}
              <span class="assessment ${item.assessment || "normal"}">${assessmentLabel(item.assessment || "normal")}</span>
            </div>
            ${item.note ? `<div class="exam-note-text">${escapeHtml(item.note)}</div>` : ""}
          </div>
          <div class="row-actions">
            <button class="compact-button danger" type="button" aria-label="删除套卷记录" onclick="deleteExam('${item.id}')">删除</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderExamAnalysis(records) {
  if (!records.length) {
    els.examTrendChart.innerHTML = `<div class="empty-state">录入两次以上套卷后，这里会显示成绩变化。</div>`;
    els.examInsights.innerHTML = `<div class="empty-state">学习记录与对应科目的套卷会在这里并列显示。</div>`;
    return;
  }

  const chronological = [...records].reverse().slice(-8);
  els.examTrendChart.innerHTML = chronological
    .map((item) => {
      const scoreRate = Math.round((item.score / item.total) * 100);
      const correctRate = getCorrectRate(item);
      return `
        <div class="trend-column" title="${escapeHtml(item.title)}：${scoreRate}%">
          <div class="trend-bars">
            <div class="trend-bar score" style="height: ${Math.max(10, scoreRate)}%;"></div>
            ${correctRate === null ? "" : `<div class="trend-bar correct" style="height: ${Math.max(10, correctRate)}%;"></div>`}
          </div>
          <strong>分 ${scoreRate}%</strong>
          <span>${correctRate === null ? "正 --" : `正 ${correctRate}%`}</span>
          <small>${formatDate(item.date)}</small>
        </div>
      `;
    })
    .join("");

  const recentDates = Array.from({ length: 28 }, (_, index) => addDays(todayKey(), -index));
  const rows = state.subjects.map((subject) => {
    const hours = state.studyLogs
      .filter((log) => log.subject === subject.name && recentDates.includes(log.date))
      .reduce((sum, log) => sum + Number(log.minutes || 0), 0) / 60;
    const subjectExams = records.filter((item) => item.subject === subject.name);
    const scoreRate = subjectExams.length
      ? Math.round(average(subjectExams.map((item) => (item.score / item.total) * 100)))
      : null;
    return { name: subject.name, hours, scoreRate };
  });

  els.examInsights.innerHTML = rows
    .map(
      (item) => `
        <div class="insight-row">
          <span>${item.name}</span>
          <strong>${item.hours.toFixed(1)}h</strong>
          <span>${item.scoreRate === null ? "暂无套卷" : `均分率 ${item.scoreRate}%`}</span>
        </div>
      `
    )
    .join("");
}

function renderReviewStats() {
  const weekTasks = filterTasks("week");
  const done = weekTasks.filter((task) => task.done);
  const plannedMinutes = done.reduce((sum, task) => sum + Number(task.minutes || 0), 0);
  const actualTaskMinutes = done.reduce((sum, task) => sum + Number(task.actualMinutes || 0), 0);
  const weekLogMinutes = getCurrentWeekDays().reduce((sum, date) => sum + logMinutesForDate(date), 0);
  const subjectCounts = state.subjects
    .map((subject) => ({
      name: subject.name,
      minutes: done
        .filter((task) => task.subject === subject.name)
        .reduce((sum, task) => sum + Number(task.minutes || 0), 0)
    }))
    .filter((item) => item.minutes > 0);

  const logSubjectCounts = state.subjects
    .map((subject) => ({
      name: subject.name,
      minutes: state.studyLogs
        .filter((log) => getCurrentWeekDays().includes(log.date) && log.subject === subject.name)
        .reduce((sum, log) => sum + Number(log.minutes || 0), 0)
    }))
    .filter((item) => item.minutes > 0);

  els.reviewSummary.textContent = `${done.length}/${weekTasks.length} 个任务`;
  els.reviewStats.innerHTML = `
    <div class="stat-row"><span>完成任务</span><strong>${done.length}/${weekTasks.length}</strong></div>
    <div class="stat-row"><span>任务预计时长</span><strong>${(plannedMinutes / 60).toFixed(1)}h</strong></div>
    <div class="stat-row"><span>任务实际时长</span><strong>${(actualTaskMinutes / 60).toFixed(1)}h</strong></div>
    <div class="stat-row"><span>真实专注记录</span><strong>${(weekLogMinutes / 60).toFixed(1)}h</strong></div>
    <div class="stat-row"><span>平均科目进度</span><strong>${Math.round(average(state.subjects.map(getSubjectProgress)))}%</strong></div>
    <div class="stat-row"><span>本周主力</span><strong>${topSubject(logSubjectCounts.length ? logSubjectCounts : subjectCounts)}</strong></div>
  `;
}

function filterTasks(filter) {
  if (filter === "today") return tasksForDate(todayKey());
  if (filter === "week") {
    const days = getCurrentWeekDays();
    return state.tasks.filter((task) => days.includes(task.date));
  }
  if (filter === "overdue") return overdueTasks();
  return [...state.tasks];
}

function tasksForDate(date) {
  return state.tasks.filter((task) => task.date === date);
}

function isOverdue(task) {
  return !task.done && task.date < todayKey();
}

function overdueTasks() {
  return state.tasks.filter(isOverdue);
}

function minutesForDate(date) {
  const tasks = tasksForDate(date);
  return {
    planned: tasks.reduce((sum, task) => sum + Number(task.minutes || 0), 0),
    done: tasks.filter((task) => task.done).reduce((sum, task) => sum + Number(task.minutes || 0), 0)
  };
}

function logMinutesForDate(date) {
  return state.studyLogs
    .filter((log) => log.date === date)
    .reduce((sum, log) => sum + Number(log.minutes || 0), 0);
}

function getSubjectProgress(subject) {
  if (!subject) return 0;
  return average(subject.chapters.map((chapter) => Number(chapter.progress || 0)));
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function topSubject(subjectCounts) {
  if (!subjectCounts.length) return "暂无";
  return subjectCounts.sort((a, b) => b.minutes - a.minutes)[0].name;
}

function getCurrentWeekDays(anchor = new Date()) {
  const now = stripTime(anchor);
  const day = now.getDay() || 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - day + 1);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return toDateInput(date);
  });
}

function weekKey(date) {
  return getCurrentWeekDays(date)[0];
}

function loadCurrentReview() {
  const review = state.reviews[weekKey(new Date())] || {};
  els.reviewGood.value = review.good || "";
  els.reviewProblem.value = review.problem || "";
  els.reviewNext.value = review.next || "";
}

function populateSubjectOptions() {
  const options = state.subjects
    .map((subject) => `<option value="${subject.name}">${subject.name}</option>`)
    .join("");
  els.taskSubject.innerHTML = options;
  els.logSubject.innerHTML = options;
  els.mistakeSubject.innerHTML = options;
  els.examSubject.innerHTML = `<option value="全科">全科</option>${options}`;
}

function loadGoals() {
  const saved = state.goals || {};
  const goals = {
    ...defaultData.goals,
    ...saved,
    scores: { ...defaultData.goals.scores, ...(saved.scores || {}) },
    weights: { ...defaultData.goals.weights, ...(saved.weights || {}) }
  };
  state.goals = goals;
  els.goalSchool.value = goals.school;
  els.goalMajor.value = goals.major;
  els.goalScore.value = goals.score;
  els.goalCutoff.value = goals.cutoff;
  els.goalMaterials.value = goals.materials;
  els.goal408Score.value = goals.scores["408"];
  els.goalMathScore.value = goals.scores["数学一"];
  els.goalEnglishScore.value = goals.scores["英语一"];
  els.goalPoliticsScore.value = goals.scores["政治"];
  els.goal408Weight.value = goals.weights["408"];
  els.goalMathWeight.value = goals.weights["数学一"];
  els.goalEnglishWeight.value = goals.weights["英语一"];
  els.goalPoliticsWeight.value = goals.weights["政治"];
}

function saveGoals() {
  const weight = (value, fallback) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : fallback;
  };
  state.goals = {
    school: els.goalSchool.value.trim(),
    major: els.goalMajor.value.trim(),
    score: els.goalScore.value,
    cutoff: els.goalCutoff.value,
    materials: els.goalMaterials.value.trim(),
    scores: {
      "408": els.goal408Score.value,
      "数学一": els.goalMathScore.value,
      "英语一": els.goalEnglishScore.value,
      "政治": els.goalPoliticsScore.value
    },
    weights: {
      "408": weight(els.goal408Weight.value, 4),
      "数学一": weight(els.goalMathWeight.value, 4),
      "英语一": weight(els.goalEnglishWeight.value, 3),
      "政治": weight(els.goalPoliticsWeight.value, 2)
    }
  };
  persist();
  showToast("目标已保存");
}

function priorityLabel(priority) {
  return { high: "高", medium: "中", low: "低" }[priority] || "中";
}

function priorityWeight(priority) {
  return { high: 3, medium: 2, low: 1 }[priority] || 2;
}

function difficultyLabel(difficulty) {
  return { easy: "简单", medium: "适中", hard: "困难" }[difficulty] || "适中";
}

function assessmentLabel(assessment) {
  return { good: "状态良好", normal: "一般", poor: "需要调整" }[assessment] || "一般";
}

function getCorrectRate(exam) {
  const count = Number(exam.questionCount || 0);
  if (count <= 0) return null;
  return Math.max(0, Math.round(((count - Number(exam.wrongCount || 0)) / count) * 100));
}

function toggleMistake(id) {
  const mistake = state.mistakes.find((item) => item.id === id);
  if (!mistake) return;
  mistake.resolved = !mistake.resolved;
  persist();
  render();
  showToast(mistake.resolved ? "已标记为解决" : "已重新打开错题");
}

function reviewMistake(id) {
  const mistake = state.mistakes.find((item) => item.id === id);
  if (!mistake) return;
  mistake.reviewCount = Number(mistake.reviewCount || 0) + 1;
  persist();
  render();
  showToast("已记为一次复习");
}

function deleteMistake(id) {
  state.mistakes = state.mistakes.filter((item) => item.id !== id);
  persist();
  render();
  showToast("错题已删除");
}

function deleteExam(id) {
  state.exams = state.exams.filter((item) => item.id !== id);
  persist();
  render();
  showToast("套卷记录已删除");
}

function deleteLog(id) {
  state.studyLogs = state.studyLogs.filter((log) => log.id !== id);
  persist();
  render();
  showToast("学习记录已删除");
}

function exportData() {
  const backup = {
    version: 2,
    exportedAt: new Date().toISOString(),
    data: state
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `考研备考数据-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("数据备份已导出");
}

async function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const parsed = JSON.parse(await file.text());
    const saved = parsed.data || parsed;
    if (!saved || typeof saved !== "object" || !Array.isArray(saved.subjects) || !Array.isArray(saved.tasks)) {
      throw new Error("invalid backup");
    }
    if (!window.confirm("导入会覆盖当前浏览器中的全部备考数据，是否继续？")) return;

    state = mergeState(structuredClone(defaultData), saved);
    persist();
    els.weeklyTargetHours.value = state.weeklyTargetHours;
    els.examDate.value = state.examDate;
    populateSubjectOptions();
    loadGoals();
    loadCurrentReview();
    render();
    showToast("数据已导入");
  } catch {
    showToast("导入失败，请选择本站导出的 JSON 文件");
  } finally {
    event.target.value = "";
  }
}

function toggleTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.done = !task.done;
  persist();
  render();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  persist();
  render();
  showToast("任务已删除");
}

function rescheduleTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task || !isOverdue(task)) return;
  task.date = todayKey();
  persist();
  render();
  showToast("任务已移至今天");
}

function updateTaskActual(id, value) {
  const task = state.tasks.find((item) => item.id === id);
  const minutes = Number(value);
  if (!task || !Number.isFinite(minutes) || minutes < 0) return;
  task.actualMinutes = minutes;
  persist();
  renderReviewStats();
  showToast("实际用时已更新");
}

function updateChapter(subjectIndex, chapterIndex, value) {
  state.subjects[subjectIndex].chapters[chapterIndex].progress = Number(value);
  persist();
  renderSubjectProgress();
  renderReviewStats();
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaultData);
  try {
    return mergeState(structuredClone(defaultData), JSON.parse(raw));
  } catch {
    return structuredClone(defaultData);
  }
}

function mergeState(base, saved) {
  return {
    ...base,
    ...saved,
    subjects: saved.subjects || base.subjects,
    tasks: saved.tasks || base.tasks,
    reviews: saved.reviews || base.reviews,
    mistakes: saved.mistakes || base.mistakes,
    exams: saved.exams || base.exams,
    studyLogs: saved.studyLogs || base.studyLogs,
    goals: {
      ...base.goals,
      ...(saved.goals || {}),
      scores: { ...base.goals.scores, ...(saved.goals?.scores || {}) },
      weights: { ...base.goals.weights, ...(saved.goals?.weights || {}) }
    }
  };
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return toDateInput(new Date());
}

function addDays(dateKey, amount) {
  const date = parseLocalDate(dateKey);
  date.setDate(date.getDate() + amount);
  return toDateInput(date);
}

function toDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(a, b) {
  return Math.abs((parseLocalDate(a) - parseLocalDate(b)) / 86400000);
}

function weekdayLabel(dateKey) {
  return ["日", "一", "二", "三", "四", "五", "六"][parseLocalDate(dateKey).getDay()];
}

function getRoadmapStages(target) {
  const stageDefinitions = [
    {
      name: "基础搭建期",
      startOffset: 480,
      endOffset: 301,
      description: "完成核心教材和基础题的首轮覆盖，建立四科稳定的学习节奏。",
      focus: [
        { subject: "数学一", text: "高数主线与基础题" },
        { subject: "408", text: "四门课程首轮理解" },
        { subject: "英语一", text: "单词与长难句常态化" },
        { subject: "政治", text: "暂缓系统投入" }
      ]
    },
    {
      name: "系统强化期",
      startOffset: 300,
      endOffset: 171,
      description: "围绕题型和薄弱章节强化，把知识点转化为稳定的解题能力。",
      focus: [
        { subject: "数学一", text: "章节强化与错题回炉" },
        { subject: "408", text: "专题题组与综合题" },
        { subject: "英语一", text: "阅读真题精读" },
        { subject: "政治", text: "启动基础框架" }
      ]
    },
    {
      name: "真题成体系",
      startOffset: 170,
      endOffset: 81,
      description: "以真题为主线诊断水平，按科目拆解失分来源并定期回炉。",
      focus: [
        { subject: "数学一", text: "近年真题与限时训练" },
        { subject: "408", text: "真题专题复盘" },
        { subject: "英语一", text: "真题阅读与作文输出" },
        { subject: "政治", text: "选择题训练与知识串联" }
      ]
    },
    {
      name: "冲刺与模考期",
      startOffset: 80,
      endOffset: 1,
      description: "把重点放在套卷、错题、背诵和作息稳定上，减少无效扩张。",
      focus: [
        { subject: "数学一", text: "整卷模考与错题回看" },
        { subject: "408", text: "综合题与高频考点" },
        { subject: "英语一", text: "作文模板与限时套卷" },
        { subject: "政治", text: "背诵、肖八肖四与时政" }
      ]
    }
  ];

  return stageDefinitions.map((stage) => ({
    ...stage,
    start: addDays(toDateInput(target), -stage.startOffset),
    end: addDays(toDateInput(target), -stage.endOffset)
  }));
}

function getCurrentRoadmapStage(stages) {
  const today = todayKey();
  if (today < stages[0].start) return stages[0];
  return stages.find((stage) => today >= stage.start && today <= stage.end) || stages[stages.length - 1];
}

function formatMonthDay(dateKey) {
  const date = parseLocalDate(dateKey);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatDate(dateKey) {
  const date = parseLocalDate(dateKey);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 1800);
}

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.rescheduleTask = rescheduleTask;
window.updateTaskActual = updateTaskActual;
window.updateChapter = updateChapter;
window.toggleMistake = toggleMistake;
window.deleteMistake = deleteMistake;
window.reviewMistake = reviewMistake;
window.deleteExam = deleteExam;
window.deleteLog = deleteLog;
