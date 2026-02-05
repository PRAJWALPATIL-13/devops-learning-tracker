// Main JS Logic with Locking Feature

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('weeks-container');
    const globalBar = document.getElementById('global-bar-fill');
    const globalPercent = document.getElementById('global-percent');
    const completedCountEl = document.getElementById('completed-count');
    const totalCountEl = document.getElementById('total-count');
    const resetBtn = document.getElementById('reset-btn');

    const STORAGE_KEY = 'devopsWeekProgress';

    // Store completed IDs as "weekIndex-topicIndex" strings
    let completedState = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);

    if (typeof weeks === 'undefined' || !weeks) {
        container.innerHTML = '<div class="loading-state">Error: Data not loaded.</div>';
        return;
    }

    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedState]));
        updateUI();
    }

    function toggleTopic(weekIdx, topicIdx) {
        const id = `${weekIdx}-${topicIdx}`;
        if (completedState.has(id)) {
            completedState.delete(id);
        } else {
            completedState.add(id);
        }

        // Capture currently open weeks
        const openWeekIndices = [];
        document.querySelectorAll('.week-content.expanded').forEach(content => {
            const module = content.closest('.week-module');
            if (module) {
                // Extract index from id "week-module-0"
                const idx = module.id.split('-')[2];
                openWeekIndices.push(idx);
            }
        });

        saveState();
        // Re-render view to handle unlocking next weeks dynamically
        renderView();

        // Restore open weeks
        openWeekIndices.forEach(idx => {
            const module = document.getElementById(`week-module-${idx}`);
            if (module && !module.classList.contains('locked')) {
                const content = module.querySelector('.week-content');
                if (content) {
                    content.classList.add('expanded');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    }

    function calculateStats() {
        let globalTotal = 0;
        let globalCompleted = 0;
        const weekStats = [];

        weeks.forEach((week, wIdx) => {
            let weekTotal = week.topics.length;
            let weekCompleted = 0;

            week.topics.forEach((_, tIdx) => {
                const id = `${wIdx}-${tIdx}`;
                if (completedState.has(id)) weekCompleted++;
            });

            globalTotal += weekTotal;
            globalCompleted += weekCompleted;

            weekStats.push({
                total: weekTotal,
                completed: weekCompleted,
                percent: weekTotal === 0 ? 0 : Math.round((weekCompleted / weekTotal) * 100)
            });
        });

        const globalPercentVal = globalTotal === 0 ? 0 : Math.round((globalCompleted / globalTotal) * 100);

        return { globalTotal, globalCompleted, globalPercentVal, weekStats };
    }

    function updateUI() {
        const stats = calculateStats();

        // Update Global Stats
        globalBar.style.width = `${stats.globalPercentVal}%`;
        globalPercent.textContent = `${stats.globalPercentVal}%`;
        completedCountEl.textContent = `${stats.globalCompleted} Completed`;
        totalCountEl.textContent = `${stats.globalTotal} Total Topics`;

        // Update Week UIs (Progress bars and visual checks)
        weeks.forEach((_, wIdx) => {
            const weekStat = stats.weekStats[wIdx];

            // Update Mini Bar in Header
            const miniFill = document.getElementById(`week-fill-${wIdx}`);
            const percentText = document.getElementById(`week-percent-${wIdx}`);
            if (miniFill && percentText) {
                // If it's locked, these might be hidden by CSS, but we update them anyway
                miniFill.style.width = `${weekStat.percent}%`;
                percentText.textContent = `${weekStat.percent}%`;
            }

            // Update Topic Cards
            const weekModule = document.getElementById(`week-module-${wIdx}`);
            if (weekModule) {
                const topicCards = weekModule.querySelectorAll('.topic-card');
                topicCards.forEach((card, tIdx) => {
                    const id = `${wIdx}-${tIdx}`;
                    if (completedState.has(id)) {
                        card.classList.add('completed');
                    } else {
                        card.classList.remove('completed');
                    }
                });

                // If week is 100% complete, border color
                if (weekStat.percent === 100) {
                    weekModule.style.borderColor = 'var(--success-color)';
                } else {
                    weekModule.style.borderColor = ''; // Reset to default or locked style
                }
            }
        });
    }

    function renderView() {
        container.innerHTML = '';
        const stats = calculateStats();

        // Unlock Logic: Week 0 is always unlocked.
        // Week i is unlocked if Week i-1 is 100% complete.
        let isPreviousComplete = true;

        weeks.forEach((week, wIdx) => {
            const weekStat = stats.weekStats[wIdx];

            // Determine if THIS week is locked
            const isLocked = !isPreviousComplete;

            const module = document.createElement('div');
            module.className = `week-module ${isLocked ? 'locked' : ''}`;
            module.id = `week-module-${wIdx}`;

            // Lock Icon SVG
            const lockIcon = `
                <svg class="lock-icon" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3 3.1-3 1.71 0 3.1 1.29 3.1 3v2z"/>
                </svg>
            `;

            // Hdr content varies if locked
            const percentDisplay = isLocked ? 'Locked' : `${weekStat.percent}%`;

            // Header
            const header = document.createElement('div');
            header.className = 'week-header';
            header.innerHTML = `
                <div class="week-info">
                    <h2>${isLocked ? lockIcon : ''} ${week.title}</h2>
                    <p class="week-desc">${isLocked ? 'Complete previous week to unlock' : week.description}</p>
                </div>
                <div class="week-meta">
                    <span class="week-percent" id="week-percent-${wIdx}">${percentDisplay}</span>
                    <div class="week-progress-mini">
                        <div class="week-mini-fill" id="week-fill-${wIdx}" style="width: ${weekStat.percent}%"></div>
                    </div>
                </div>
            `;

            // Content (Topics)
            const content = document.createElement('div');
            content.className = 'week-content';
            const grid = document.createElement('div');
            grid.className = 'topics-grid';

            week.topics.forEach((topic, tIdx) => {
                const isCompleted = completedState.has(`${wIdx}-${tIdx}`);
                const card = document.createElement('div');
                card.className = `topic-card ${isCompleted ? 'completed' : ''}`;
                // Only allow clicking if not locked (though pointer-events:none in CSS handles this mostly)
                if (!isLocked) {
                    card.onclick = (e) => {
                        e.stopPropagation();
                        toggleTopic(wIdx, tIdx);
                    };
                }

                card.innerHTML = `
                    <div class="topic-check">
                        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <div class="topic-text">
                        <h3>${topic.title}</h3>
                        <p>${topic.details}</p>
                    </div>
                `;
                grid.appendChild(card);
            });

            content.appendChild(grid);
            module.appendChild(header);
            module.appendChild(content);

            // Accordion Logic (Only if not locked)
            if (!isLocked) {
                header.onclick = () => {
                    const isOpen = content.style.maxHeight;
                    if (isOpen) {
                        content.style.maxHeight = null;
                        content.classList.remove('expanded');
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.classList.add('expanded');
                    }
                };
            }

            container.appendChild(module);

            // Logic for NEXT week:
            // Is this week 100% done?
            isPreviousComplete = (weekStat.percent === 100);
        });
    }

    resetBtn.addEventListener('click', () => {
        if (confirm('Reset everything? This cannot be undone.')) {
            completedState.clear();
            saveState();
            renderView();
        }
    });

    renderView();
    updateUI(); // Initial check
});
