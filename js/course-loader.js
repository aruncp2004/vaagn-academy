(function () {
  var params = new URLSearchParams(window.location.search);
  var courseId = params.get('course');

  if (!courseId || !COURSES[courseId]) {
    window.location.href = '../programs.html';
    return;
  }

  var c = COURSES[courseId];

  // Accent CSS variables
  document.documentElement.style.setProperty('--course-accent', c.accentColor);
  document.documentElement.style.setProperty('--course-accent-bg', c.accentBg);

  // Page title & meta
  document.title = c.name + ' — VIEM | Vaagn Institute of Electric Mobility';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', c.desc);

  // Simple text setter
  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  setText('course-name', c.name);
  setText('course-subtitle', c.subtitle);
  setText('course-desc', c.desc);
  setText('course-price', c.price);
  setText('course-original-price', c.originalPrice);
  setText('course-discount', c.discount);

  // Tag badge
  var tagEl = document.getElementById('course-tag');
  if (tagEl) {
    tagEl.textContent = c.tag;
    tagEl.style.background = c.tagColor;
    tagEl.style.color = c.tagText;
    tagEl.style.border = '1px solid ' + c.tagText + '30';
  }

  // Hero icon
  var iconEl = document.getElementById('course-icon');
  if (iconEl) {
    iconEl.className = 'ti ' + c.icon;
    iconEl.style.color = c.accentColor;
  }

  // Hero icon bg
  var iconWrap = document.getElementById('course-icon-wrap');
  if (iconWrap) {
    iconWrap.style.background = c.accentBg;
    iconWrap.style.border = '1px solid ' + c.accentColor + '30';
  }

  // Why grid
  var whyGrid = document.getElementById('why-grid');
  if (whyGrid) {
    whyGrid.innerHTML = c.whyCards.map(function (card) {
      return '<div class="why-card">' +
        '<div class="why-icon-wrap" style="background:' + card.color + '15;">' +
        '<i class="ti ' + card.icon + '" style="color:' + card.color + ';font-size:22px;"></i>' +
        '</div>' +
        '<h3 class="why-card-title">' + card.title + '</h3>' +
        '<p class="why-card-desc">' + card.desc + '</p>' +
        '</div>';
    }).join('');
  }

  // Syllabus — table format if course has .syllabus, card format if .weeks
  var syllabusEl = document.getElementById('syllabus-container');
  if (syllabusEl) {
    if (c.syllabus) {
      syllabusEl.innerHTML = buildSyllabusTable(c.syllabus);
    } else if (c.weeks) {
      syllabusEl.innerHTML = buildWeekCards(c.weeks);
    }
  }

  function buildSyllabusTable(rows) {
    var theoryCount = rows.filter(function (r) { return r.type === 'theory'; }).length;
    var practicalCount = rows.filter(function (r) { return r.type === 'practical'; }).length;

    var stats =
      '<div class="syllabus-stats">' +
      '<div class="syllabus-stat"><span class="syllabus-stat-dot stat-dot-theory"></span>' + theoryCount + ' Theory Sessions</div>' +
      '<div class="syllabus-stat"><span class="syllabus-stat-dot stat-dot-practical"></span>' + practicalCount + ' Practical Workshops</div>' +
      '<div class="syllabus-stat"><i class="ti ti-calendar" style="color:var(--course-accent);font-size:14px;"></i> ' + rows.length + ' Total Sessions</div>' +
      '</div>';

    var headerRow =
      '<thead><tr>' +
      '<th>Date</th>' +
      '<th>L.No</th>' +
      '<th>Module</th>' +
      '<th>Topics Covered</th>' +
      '<th>Outcome</th>' +
      '</tr></thead>';

    var bodyRows = rows.map(function (row) {
      var isPractical = row.type === 'practical';
      var rowClass = isPractical ? 'row-practical' : 'row-theory';

      var moduleCell = isPractical
        ? '<span class="practical-badge">Practical</span><br>' + row.module
        : row.module;

      var lessonNoCell = isPractical
        ? '<span class="lessonno-practical">' + row.lessonNo + '</span>'
        : '<span class="lessonno-theory">' + row.lessonNo + '</span>';

      return '<tr class="' + rowClass + '">' +
        '<td class="td-date">' + row.date + '</td>' +
        '<td class="td-lessonno">' + lessonNoCell + '</td>' +
        '<td class="td-module">' + moduleCell + '</td>' +
        '<td class="td-topics">' + row.topics + '</td>' +
        '<td class="td-outcome">' + row.outcome + '</td>' +
        '</tr>';
    }).join('');

    return stats +
      '<div class="syllabus-table-wrap">' +
      '<table class="syllabus-table">' +
      headerRow +
      '<tbody>' + bodyRows + '</tbody>' +
      '</table>' +
      '</div>';
  }

  function buildWeekCards(weeks) {
    return weeks.map(function (week) {
      var lessons = week.lessons.map(function (lesson, j) {
        return '<li class="lesson-item">' +
          '<span class="lesson-num" style="background:' + week.color + '18;color:' + week.color + ';">' +
          (j + 1 < 10 ? '0' + (j + 1) : '' + (j + 1)) +
          '</span>' +
          '<span class="lesson-name">' + lesson + '</span>' +
          '</li>';
      }).join('');
      return '<div class="week-card">' +
        '<div class="week-header" style="border-left:4px solid ' + week.color + ';padding-left:16px;">' +
        '<span class="week-label" style="color:' + week.color + ';">' + week.label + '</span>' +
        '<h3 class="week-title">' + week.title + '</h3>' +
        '<p class="week-desc">' + week.desc + '</p>' +
        '</div>' +
        '<ul class="lesson-list">' + lessons + '</ul>' +
        '</div>';
    }).join('');
  }

  // Prerequisites
  var prereqEl = document.getElementById('prereq-list');
  if (prereqEl) {
    prereqEl.innerHTML = c.prereqs.map(function (p) {
      var parts = p.split(' — ');
      var bold = parts[0];
      var rest = parts[1] || '';
      return '<li class="prereq-item">' +
        '<span class="prereq-check" style="background:' + c.accentBg + ';color:' + c.accentColor + ';">' +
        '<i class="ti ti-check"></i>' +
        '</span>' +
        '<span><strong>' + bold + '</strong>' + (rest ? ' — ' + rest : '') + '</span>' +
        '</li>';
    }).join('');
  }
})();
