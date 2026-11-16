/* =====================================================
   MAIN.JS — All Interactive Behaviour
   ===================================================== */

/* ============================================================
   1. TYPED TEXT EFFECT
   Edit the `roles` array to change what cycles in the hero
   ============================================================ */
const roles = [
  'Computer Science Teacher',
  'Mathematics Educator',
  'English Grammar Expert',
  'Python & Java Instructor',
  'AI Enthusiast & Guide',
];

let roleIndex = 0;
let charIndex  = 0;
let deleting   = false;

const typedEl = document.getElementById('typed-text');

function type() {
  const word = roles[roleIndex];

  if (!deleting) {
    typedEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 45 : 80);
}
type();


/* ============================================================
   2. SKILL CARDS — dynamically rendered
   Edit name / icon / desc / pct here to update cards
   ============================================================ */
const skills = [
  { icon: '🐍', name: 'Python',            desc: 'Data science, scripting, automation & beginner-friendly programming.', pct: 90 },
  { icon: '☕', name: 'Java',              desc: 'OOP concepts, data structures & core CS fundamentals.',               pct: 82 },
  { icon: '🌐', name: 'HTML & CSS',        desc: 'Semantic web design, responsive layouts & modern styling.',           pct: 92 },
  { icon: '🗄️', name: 'SQL',               desc: 'Database design, queries, joins & data management.',                 pct: 88 },
  { icon: '📊', name: 'MS Excel',          desc: 'Formulas, pivot tables, charts & data analysis.',                    pct: 90 },
  { icon: '📝', name: 'MS Word',           desc: 'Document formatting, mail merge & academic writing.',                pct: 95 },
  { icon: '📊', name: 'PowerPoint',        desc: 'Impactful presentations, animations & slide design.',                pct: 93 },
  { icon: '🤖', name: 'AI & ML',           desc: 'AI tools, prompting, basics of ML & modern AI concepts.',            pct: 80 },
  { icon: '🧮', name: 'Tally Software',    desc: 'Accounting, GST, inventory & financial management.',                 pct: 85 },
  { icon: '📖', name: 'English Grammar',   desc: 'Advanced grammar, composition, reading & comprehension.',            pct: 96 },
  { icon: '➗', name: 'Mathematics',       desc: 'Algebra, arithmetic, logic, statistics & quantitative reasoning.',   pct: 93 },
  { icon: '🔢', name: 'Computer Basics',   desc: 'OS fundamentals, networking basics & digital literacy.',             pct: 91 },
];

const skillsGrid = document.querySelector('.skills-grid');
skills.forEach((s, i) => {
  skillsGrid.innerHTML += `
    <div class="skill-card reveal" style="transition-delay:${i * 0.05}s">
      <span class="skill-icon">${s.icon}</span>
      <div class="skill-name">${s.name}</div>
      <div class="skill-desc">${s.desc}</div>
      <div class="skill-bar-wrap">
        <div class="skill-bar-label">
          <span>Proficiency</span><span>${s.pct}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-pct="${s.pct}"></div>
        </div>
      </div>
    </div>`;
});


/* ============================================================
   3. TOOL PILLS — dynamically rendered
   Add / remove tools here
   ============================================================ */
const tools = [
  { icon: '🐍', name: 'Python'          },
  { icon: '☕', name: 'Java'            },
  { icon: '🌐', name: 'HTML5'           },
  { icon: '🎨', name: 'CSS3'            },
  { icon: '🗄️', name: 'SQL'             },
  { icon: '📊', name: 'MS Excel'        },
  { icon: '📝', name: 'MS Word'         },
  { icon: '📊', name: 'PowerPoint'      },
  { icon: '🧮', name: 'Tally'           },
  { icon: '🤖', name: 'AI Tools'        },
  { icon: '🔢', name: 'Mathematics'     },
  { icon: '📖', name: 'English Grammar' },
  { icon: '💻', name: 'VS Code'         },
  { icon: '🖥️', name: 'Computer Science'},
];

const toolsRow = document.getElementById('tools-row');
tools.forEach(t => {
  const pill = document.createElement('div');
  pill.className = 'tool-pill';
  pill.innerHTML = `<span class="t-icon">${t.icon}</span>${t.name}`;
  toolsRow.appendChild(pill);
});


/* ============================================================
   4. SCROLL REVEAL — observes .reveal elements
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      /* Animate skill-bar fills when card enters viewport */
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    }
  });
}, { threshold: 0.12 });

/* Re-query after dynamic cards are rendered */
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   5. CONTACT FORM — success feedback
   ============================================================ */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = '✅ Message Sent!';
  btn.style.background = '#3dd6c8';
  btn.style.color = '#0a0c10';
  setTimeout(() => {
    btn.textContent = 'Send Message ✈';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
}
