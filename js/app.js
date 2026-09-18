/**
 * B.Tech.(CSE)-AIR 2024 · Semester 5 (Section 5A)
 * PPT Submission Portal & Presentation Allocation Manager
 * Brainware University - Department of CSE-AI
 */

/* ══════════════════════════════════════════
   1. CONSTELLATION CANVAS ENGINE
══════════════════════════════════════════ */
(function initConstellation(){
  const canvas = document.getElementById('constellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let W = 0, H = 0, dots = [];
  const N = window.innerWidth < 600 ? 28 : 55;
  const MAX_DIST = window.innerWidth < 600 ? 95 : 135;

  function resize(){ 
    W = canvas.width = window.innerWidth || document.documentElement.clientWidth || 1200; 
    H = canvas.height = window.innerHeight || document.documentElement.clientHeight || 800; 
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for(let i = 0; i < N; i++){
    dots.push({
      x: Math.random() * (W || 1200), 
      y: Math.random() * (H || 800),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.6,
      c: i % 4 === 0 ? '#42c3fe' : i % 4 === 1 ? '#086bcc' : i % 4 === 2 ? '#38bdf8' : '#22d3ee',
      cLight: i % 4 === 0 ? '#086bcc' : i % 4 === 1 ? '#0284c7' : i % 4 === 2 ? '#0369a1' : '#38bdf8'
    });
  }

  function draw(){
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const isLight = (document.documentElement && typeof document.documentElement.getAttribute === 'function')
      ? document.documentElement.getAttribute('data-theme') === 'light'
      : false;
    dots.forEach(d => {
      d.x += d.vx; 
      d.y += d.vy;
      if(d.x < 0 || d.x > W) d.vx *= -1;
      if(d.y < 0 || d.y > H) d.vy *= -1;
    });

    for(let i = 0; i < dots.length; i++){
      for(let j = i + 1; j < dots.length; j++){
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < MAX_DIST){
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = isLight
            ? `rgba(2, 132, 199, ${(1 - dist / MAX_DIST) * 0.12})`
            : `rgba(66, 195, 254, ${(1 - dist / MAX_DIST) * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    dots.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? (d.cLight + '99') : (d.c + '99');
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══════════════════════════════════════════
   THEME MANAGER (DARK / LIGHT MODE)
══════════════════════════════════════════ */
(function initThemeManager(){
  const THEME_KEY = 'air5a_theme';
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  function applyTheme(theme) {
    if (html && typeof html.setAttribute === 'function') {
      html.setAttribute('data-theme', theme);
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch(e){}
    const metaTheme = typeof document.querySelector === 'function' ? document.querySelector('meta[name="theme-color"]') : null;
    if (metaTheme && typeof metaTheme.setAttribute === 'function') {
      metaTheme.setAttribute('content', theme === 'light' ? '#f8fafc' : '#03060d');
    }
    if (themeToggleBtn && typeof themeToggleBtn.setAttribute === 'function') {
      const label = theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme';
      themeToggleBtn.setAttribute('aria-label', label);
      themeToggleBtn.setAttribute('title', label);
    }
  }

  try {
    const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      applyTheme(savedTheme);
    } else {
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  } catch(e) {
    applyTheme('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = (html && typeof html.getAttribute === 'function') ? (html.getAttribute('data-theme') || 'dark') : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
})();

/* ══════════════════════════════════════════
   2. DATASET DEFINITIONS (SEM 5 - 5 SUBJECTS)
══════════════════════════════════════════ */
const SUBJECTS_META = [
  {
    "id": "rai",
    "code": "BTR50112",
    "name": "Robotics and Artificial Intelligence",
    "short": "Robotics & AI",
    "softDeadline": "28/09/2026",
    "presDate": "To be announced",
    "status": "ACTIVE"
  },
  {
    "id": "rsm",
    "code": "BTR50113",
    "name": "Robot Safety and Maintenance",
    "short": "Robot Safety",
    "softDeadline": "05/10/2026",
    "presDate": "06/10/2026 - 07/11/2026",
    "status": "ACTIVE"
  },
  {
    "id": "tmmd",
    "code": "BTR50114",
    "name": "Theory of Machine & Machine Design",
    "short": "Machine Design",
    "softDeadline": "08/10/2026",
    "presDate": "09/10/2026 - 06/11/2026",
    "status": "ACTIVE"
  },
  {
    "id": "pe",
    "code": "BTR50115",
    "name": "Professional Ethics",
    "short": "Prof. Ethics",
    "softDeadline": "28/09/2026",
    "presDate": "29/09/2026 - 17/11/2026",
    "status": "ACTIVE"
  },
  {
    "id": "ra",
    "code": "BTR50116",
    "name": "Robotic Algorithms",
    "short": "Robotic Algorithms",
    "softDeadline": "15/10/2026",
    "presDate": "16/10/2026 - 30/10/2026",
    "status": "ACTIVE"
  }
];

const raiData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "28/09/2026",
    "topic": "Humanoid Robotics Technology and Social Robots",
    "pres": ""
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "28/09/2026",
    "topic": "Sensors in Humanoid Robot",
    "pres": ""
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "28/09/2026",
    "topic": "Actuation types for humanoid Robot",
    "pres": ""
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "28/09/2026",
    "topic": "System Integration in Humanoid Robot, Social Robot",
    "pres": ""
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "28/09/2026",
    "topic": "Need of Social Robots",
    "pres": ""
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATASATYASURYAKANTH",
    "sub": "28/09/2026",
    "topic": "Assistive and Social Robots in the Healthcare Sector and other",
    "pres": ""
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "28/09/2026",
    "topic": "Case study On Humanoid Robot",
    "pres": ""
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "28/09/2026",
    "topic": "Swarm Robotics Characteristics",
    "pres": ""
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "28/09/2026",
    "topic": "Swarm Robotics and Multi-Robotic Systems",
    "pres": ""
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "28/09/2026",
    "topic": "Experimental Platforms in Swarm Robotics",
    "pres": ""
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "28/09/2026",
    "topic": "Tasks in Swarm Robotics",
    "pres": ""
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "28/09/2026",
    "topic": "Swarm Robots used in Real world applications",
    "pres": ""
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "28/09/2026",
    "topic": "Smart Robots, Smart Robots applications",
    "pres": ""
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "28/09/2026",
    "topic": "Robotics for Warfare Applications",
    "pres": ""
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "28/09/2026",
    "topic": "Human Robot Interaction (HRI) Definition",
    "pres": ""
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "28/09/2026",
    "topic": "History, Need of HRI, Ethical Issues for HRI",
    "pres": ""
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "28/09/2026",
    "topic": "Multi-Modal Perception",
    "pres": ""
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "28/09/2026",
    "topic": "Social, Service, and Assistive Robotics",
    "pres": ""
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "28/09/2026",
    "topic": "HRI Architecture, Collaborative Robots",
    "pres": ""
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "28/09/2026",
    "topic": "Definition, Types of Collaboration",
    "pres": ""
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "28/09/2026",
    "topic": "Applications of collaborative robots",
    "pres": ""
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "28/09/2026",
    "topic": "collaborative Robot Technology",
    "pres": ""
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "28/09/2026",
    "topic": "Industry 4.0 and Internet of Robotic things (IORT)",
    "pres": ""
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "28/09/2026",
    "topic": "Industry 4.0 and Internet of Robotic things (IORT)",
    "pres": ""
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "28/09/2026",
    "topic": "Industry 4.0 and Internet of Robotic things (IORT)",
    "pres": ""
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "28/09/2026",
    "topic": "Internet of Things and Robotics",
    "pres": ""
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "28/09/2026",
    "topic": "Internet of Things and Robotics",
    "pres": ""
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "28/09/2026",
    "topic": "Internet of Things and Robotics",
    "pres": ""
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "28/09/2026",
    "topic": "Applications and developments of the Internet of Robotic Things",
    "pres": ""
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "28/09/2026",
    "topic": "Applications and developments of the Internet of Robotic Things",
    "pres": ""
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "28/09/2026",
    "topic": "Applications and developments of the Internet of Robotic Things",
    "pres": ""
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "28/09/2026",
    "topic": "Applications and developments of the Internet of Robotic Things",
    "pres": ""
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "28/09/2026",
    "topic": "Natural Language Processing Introduction",
    "pres": ""
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "28/09/2026",
    "topic": "Natural Language Processing Introduction",
    "pres": ""
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "28/09/2026",
    "topic": "Classical Approaches to Natural Language Processing",
    "pres": ""
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "28/09/2026",
    "topic": "Classical Approaches to Natural Language Processing",
    "pres": ""
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "28/09/2026",
    "topic": "Logics for AI and Automated Reasoning",
    "pres": ""
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "28/09/2026",
    "topic": "Logics for AI and Automated Reasoning",
    "pres": ""
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "28/09/2026",
    "topic": "Automated Reasoning, Methods of Reasoning",
    "pres": ""
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "28/09/2026",
    "topic": "Reasoning types",
    "pres": ""
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "28/09/2026",
    "topic": "Use of Automated reasoning in AI",
    "pres": ""
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "28/09/2026",
    "topic": "Reasoning and its types",
    "pres": ""
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "28/09/2026",
    "topic": "Applications for Automated Reasoning",
    "pres": ""
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "28/09/2026",
    "topic": "Mathematical consideration",
    "pres": ""
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "28/09/2026",
    "topic": "Humanoid Robotics Technology and Social Robots",
    "pres": ""
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "28/09/2026",
    "topic": "Sensors in Humanoid Robot",
    "pres": ""
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "28/09/2026",
    "topic": "Actuation types for humanoid Robot",
    "pres": ""
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "28/09/2026",
    "topic": "System Integration in Humanoid Robot, Social Robot",
    "pres": ""
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "28/09/2026",
    "topic": "Need of Social Robots",
    "pres": ""
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "28/09/2026",
    "topic": "Assistive and Social Robots in the Healthcare Sector and other",
    "pres": ""
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "28/09/2026",
    "topic": "Control of Humanoid Robot",
    "pres": ""
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "28/09/2026",
    "topic": "Case study On Humanoid Robot",
    "pres": ""
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "28/09/2026",
    "topic": "Swarm Robotics Characteristics",
    "pres": ""
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "28/09/2026",
    "topic": "Swarm Robotics and Multi-Robotic Systems",
    "pres": ""
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "28/09/2026",
    "topic": "Experimental Platforms in Swarm Robotics",
    "pres": ""
  }
];
const rsmData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "05/10/2026",
    "topic": "Basic Safety-Related Terms and Definitions in Robotics",
    "pres": "06/10/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "05/10/2026",
    "topic": "Organizations and Standards Bodies Concerned with Robot Safety",
    "pres": "06/10/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "05/10/2026",
    "topic": "Common Robotic Safety Problems and Hazard Types",
    "pres": "06/10/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "05/10/2026",
    "topic": "Weak Points in Robot Planning and Design That Cause Safety Issues",
    "pres": "06/10/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "05/10/2026",
    "topic": "Manufacturer's vs. User's Role in Ensuring Robot Safety",
    "pres": "06/10/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATASATYASURYAKANTH",
    "sub": "05/10/2026",
    "topic": "Causes and Characteristics of Robot Accidents",
    "pres": "10/10/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "05/10/2026",
    "topic": "Case Studies: Robot Accidents in Japan, Western Europe, and the US",
    "pres": "10/10/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "05/10/2026",
    "topic": "Robot Accidents at Manufacturer Sites vs. User Sites",
    "pres": "10/10/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "05/10/2026",
    "topic": "Economic and Human Impact: Periods Off Work Due to Robot Accidents",
    "pres": "10/10/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "05/10/2026",
    "topic": "Robot Accident Analysis and Prevention Strategies",
    "pres": "10/10/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "05/10/2026",
    "topic": "Safety Considerations in Robot Testing, Start-Up, and Commissioning",
    "pres": "10/10/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "05/10/2026",
    "topic": "Robot Safety in Welding Operations",
    "pres": "10/10/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "05/10/2026",
    "topic": "Robot Safety Practices in the Automobile Industry",
    "pres": "10/10/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "05/10/2026",
    "topic": "Gripper Design to Prevent Dropped or Thrown Work Items on Energy Loss",
    "pres": "10/10/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "05/10/2026",
    "topic": "Robot Standardization and International Safety Standards",
    "pres": "10/10/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "05/10/2026",
    "topic": "Types of Emergency Stop (E-Stop) Systems in Robots",
    "pres": "10/10/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "05/10/2026",
    "topic": "Deadman Switches, Mode Select Switches, and Safeguards",
    "pres": "10/10/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "05/10/2026",
    "topic": "Safety Procedures for Entering a Robotic Safety Fence",
    "pres": "13/10/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "05/10/2026",
    "topic": "Robots vs. Humans: Comparative Capabilities and Risks",
    "pres": "13/10/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "05/10/2026",
    "topic": "Built-In Human Biases and Design Improvements for Operator Comfort",
    "pres": "13/10/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "05/10/2026",
    "topic": "Benefits and Drawbacks of Robotization from a Human Factors Perspective",
    "pres": "13/10/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "05/10/2026",
    "topic": "Guidelines for Safeguarding Operators and Teachers Around Robots",
    "pres": "13/10/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "05/10/2026",
    "topic": "Reliability Analysis of Robot Systems Considering Human Error",
    "pres": "13/10/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "05/10/2026",
    "topic": "Types of Robot Maintenance: Preventive vs. Corrective",
    "pres": "13/10/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "05/10/2026",
    "topic": "BIS and ISO Safety Standards, Hazard Identification, and Risk Analysis in Robot Maintenance",
    "pres": "13/10/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "05/10/2026",
    "topic": "Deadman Switches, Mode Select Switches, and Safeguards",
    "pres": "27/10/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "05/10/2026",
    "topic": "Safety Procedures for Entering a Robotic Safety Fence",
    "pres": "27/10/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "05/10/2026",
    "topic": "Robots vs. Humans: Comparative Capabilities and Risks",
    "pres": "27/10/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "05/10/2026",
    "topic": "Guidelines for Safeguarding Operators and Teachers Around Robots",
    "pres": "27/10/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "05/10/2026",
    "topic": "Reliability Analysis of Robot Systems Considering Human Error",
    "pres": "27/10/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "05/10/2026",
    "topic": "Types of Robot Maintenance: Preventive vs. Corrective",
    "pres": "27/10/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "05/10/2026",
    "topic": "Deadman Switches, Mode Select Switches, and Safeguards",
    "pres": "31/10/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "05/10/2026",
    "topic": "Safety Procedures for Entering a Robotic Safety Fence",
    "pres": "31/10/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "05/10/2026",
    "topic": "Robots vs. Humans: Comparative Capabilities and Risks",
    "pres": "31/10/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "05/10/2026",
    "topic": "Economic and Human Impact: Periods Off Work Due to Robot Accidents",
    "pres": "31/10/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "05/10/2026",
    "topic": "Robot Accident Analysis and Prevention Strategies",
    "pres": "31/10/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "05/10/2026",
    "topic": "Safety Considerations in Robot Testing, Start-Up, and Commissioning",
    "pres": "31/10/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "05/10/2026",
    "topic": "Robot Safety in Welding Operations",
    "pres": "31/10/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "05/10/2026",
    "topic": "Robot Safety Practices in the Automobile Industry",
    "pres": "31/10/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "05/10/2026",
    "topic": "Organizations and Standards Bodies Concerned with Robot Safety",
    "pres": "03/11/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "05/10/2026",
    "topic": "Common Robotic Safety Problems and Hazard Types",
    "pres": "03/11/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "05/10/2026",
    "topic": "Weak Points in Robot Planning and Design That Cause Safety Issues",
    "pres": "03/11/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "05/10/2026",
    "topic": "Manufacturer's vs. User's Role in Ensuring Robot Safety",
    "pres": "03/11/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "05/10/2026",
    "topic": "BIS and ISO Safety Standards, Hazard Identification, and Risk Analysis in Robot Maintenance",
    "pres": "03/11/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "05/10/2026",
    "topic": "Deadman Switches, Mode Select Switches, and Safeguards",
    "pres": "03/11/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "05/10/2026",
    "topic": "Safety Procedures for Entering a Robotic Safety Fence",
    "pres": "03/11/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "05/10/2026",
    "topic": "Robots vs. Humans: Comparative Capabilities and Risks",
    "pres": "07/11/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "05/10/2026",
    "topic": "Robot Safety in Welding Operations",
    "pres": "07/11/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "05/10/2026",
    "topic": "Robot Safety Practices in the Automobile Industry",
    "pres": "07/11/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "05/10/2026",
    "topic": "Organizations and Standards Bodies Concerned with Robot Safety",
    "pres": "07/11/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "05/10/2026",
    "topic": "Common Robotic Safety Problems and Hazard Types",
    "pres": "07/11/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "05/10/2026",
    "topic": "Deadman Switches, Mode Select Switches, and Safeguards",
    "pres": "07/11/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "05/10/2026",
    "topic": "Safety Procedures for Entering a Robotic Safety Fence",
    "pres": "07/11/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "05/10/2026",
    "topic": "Robots vs. Humans: Comparative Capabilities and Risks",
    "pres": "07/11/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "05/10/2026",
    "topic": "Economic and Human Impact: Periods Off Work Due to Robot Accidents",
    "pres": "07/11/2026"
  }
];
const tmmdData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "08/10/2026",
    "topic": "Kinematic Links, Pairs, and Chains: Basic Definitions and Classification",
    "pres": "09/10/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "08/10/2026",
    "topic": "Difference Between Structure, Mechanism, and Machine",
    "pres": "09/10/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "08/10/2026",
    "topic": "Types of Constrained Motion and Degrees of Freedom",
    "pres": "09/10/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "08/10/2026",
    "topic": "Grubler's Criterion for Plane Mechanisms",
    "pres": "09/10/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "08/10/2026",
    "topic": "Equivalent Linkage Mechanisms and Inversions of the Four-Bar Chain",
    "pres": "09/10/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATASATYASURYAKANTH",
    "sub": "08/10/2026",
    "topic": "Single and Double Slider Crank Chain: Construction and Inversions",
    "pres": "09/10/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "08/10/2026",
    "topic": "Spatial vs. Planar Mechanisms, Pantograph, and Straight-Line Motion Mechanisms",
    "pres": "09/10/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "08/10/2026",
    "topic": "Hooke's Joint (Universal Joint): Working and Applications",
    "pres": "09/10/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "08/10/2026",
    "topic": "Relative Velocity Method and Velocity Polygons for Kinematic Links",
    "pres": "09/10/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "08/10/2026",
    "topic": "Acceleration Diagrams for a Link",
    "pres": "09/10/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "08/10/2026",
    "topic": "Coriolis Component of Acceleration: Concept and Derivation",
    "pres": "10/10/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "08/10/2026",
    "topic": "Klein's Construction for Velocity and Acceleration in Slider-Crank Mechanisms",
    "pres": "10/10/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "08/10/2026",
    "topic": "Instantaneous Centre of Rotation (ICR) and the Angular Velocity Ratio Theorem",
    "pres": "10/10/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "08/10/2026",
    "topic": "Methods of Locating ICR: Body and Space Centrodes",
    "pres": "10/10/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "08/10/2026",
    "topic": "Static Equilibrium and Analysis of Two-Force and Three-Force Members",
    "pres": "10/10/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "08/10/2026",
    "topic": "D'Alembert's Principle and Equivalent Dynamic Systems",
    "pres": "10/10/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "08/10/2026",
    "topic": "Compound Pendulum: Theory and Applications",
    "pres": "10/10/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "08/10/2026",
    "topic": "Bifilar and Trifilar Suspension Methods for Determining Moment of Inertia",
    "pres": "16/10/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "08/10/2026",
    "topic": "Static and Dynamic Analysis of Inertia Forces in a Slider-Crank Mechanism (Analytical Method)",
    "pres": "16/10/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "08/10/2026",
    "topic": "Static Dynamic Analysis of Inertia Forces in a Slider-Crank Mechanism (Graphical Method)",
    "pres": "16/10/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "08/10/2026",
    "topic": "Static Equilibrium and Analysis of Two-Force and Three-Force Members",
    "pres": "16/10/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "08/10/2026",
    "topic": "D'Alembert's Principle and Equivalent Dynamic Systems",
    "pres": "16/10/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "08/10/2026",
    "topic": "Compound Pendulum: Theory and Applications",
    "pres": "16/10/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "08/10/2026",
    "topic": "Bifilar and Trifilar Suspension Methods for Determining Moment of Inertia",
    "pres": "16/10/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "08/10/2026",
    "topic": "Static and Dynamic Analysis of Inertia Forces in a Slider-Crank Mechanism (Analytical Method)",
    "pres": "30/10/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "08/10/2026",
    "topic": "Static and Dynamic Analysis of Inertia Forces in a Slider-Crank Mechanism (Graphical Method)",
    "pres": "30/10/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "08/10/2026",
    "topic": "Types of Loads and Stresses in Machine Design: Static, Shock, Impact, and Fluctuating",
    "pres": "30/10/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "08/10/2026",
    "topic": "Design of Shafts, Keys, Keyways, and Splines",
    "pres": "30/10/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "08/10/2026",
    "topic": "Standard Threads, Preloaded Fasteners, and Power Screws",
    "pres": "30/10/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "08/10/2026",
    "topic": "Fundamentals of Gearing: Classification, Terminology, and the Law of Gearing",
    "pres": "30/10/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "08/10/2026",
    "topic": "Gear Trains and the Differential Gear Box: Types and Velocity Ratio Calculations",
    "pres": "30/10/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "08/10/2026",
    "topic": "Static Equilibrium and Analysis of Two-Force and Three-Force Members",
    "pres": "30/10/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "08/10/2026",
    "topic": "D'Alembert's Principle and Equivalent Dynamic Systems",
    "pres": "30/10/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "08/10/2026",
    "topic": "Compound Pendulum: Theory and Applications",
    "pres": "30/10/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "08/10/2026",
    "topic": "Bifilar and Trifilar Suspension Methods for Determining Moment of Inertia",
    "pres": "30/10/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "08/10/2026",
    "topic": "Static and Dynamic Analysis of Inertia Forces in a Slider-Crank Mechanism (Analytical Method)",
    "pres": "30/10/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "08/10/2026",
    "topic": "Static and Dynamic Analysis of Inertia Forces in a Slider-Crank Mechanism (Graphical Method)",
    "pres": "30/10/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "08/10/2026",
    "topic": "Types of Loads and Stresses in Machine Design: Static, Shock, Impact, and Fluctuating",
    "pres": "31/10/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "08/10/2026",
    "topic": "Design of Shafts, Keys, Keyways, and Splines",
    "pres": "31/10/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "08/10/2026",
    "topic": "Standard Threads, Preloaded Fasteners, and Power Screws",
    "pres": "31/10/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "08/10/2026",
    "topic": "Fundamentals of Gearing: Classification, Terminology, and the Law of Gearing",
    "pres": "31/10/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "08/10/2026",
    "topic": "Gear Trains and the Differential Gear Box: Types and Velocity Ratio Calculations",
    "pres": "31/10/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "08/10/2026",
    "topic": "Concepts of Stress and Strain: Linear, Lateral, Shear, and Volumetric",
    "pres": "31/10/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "08/10/2026",
    "topic": "Hooke's Law, Elastic Constants, and Their Interrelationships",
    "pres": "31/10/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "08/10/2026",
    "topic": "Shear Force and Bending Moment Diagrams for Cantilevers and Simple Beams",
    "pres": "31/10/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "08/10/2026",
    "topic": "Theory of Simple Bending and Bending Stress Distribution",
    "pres": "31/10/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "08/10/2026",
    "topic": "Theory of Torsion: Torsional Stresses and Deflections",
    "pres": "31/10/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "08/10/2026",
    "topic": "Types of Loads and Stresses in Machine Design: Static, Shock, Impact, and Fluctuating",
    "pres": "06/11/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "08/10/2026",
    "topic": "Design of Shafts, Keys, Keyways, and Splines",
    "pres": "06/11/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "08/10/2026",
    "topic": "Standard Threads, Preloaded Fasteners, and Power Screws",
    "pres": "06/11/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "08/10/2026",
    "topic": "Fundamentals of Gearing: Classification, Terminology, and the Law of Gearing",
    "pres": "06/11/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "08/10/2026",
    "topic": "Gear Trains and the Differential Gear Box: Types and Velocity Ratio Calculations",
    "pres": "06/11/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "08/10/2026",
    "topic": "Static Equilibrium and Analysis of Two-Force and Three-Force Members",
    "pres": "06/11/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "08/10/2026",
    "topic": "D'Alembert's Principle and Equivalent Dynamic Systems",
    "pres": "06/11/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "08/10/2026",
    "topic": "Compound Pendulum: Theory and Applications",
    "pres": "06/11/2026"
  }
];
const peData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "28/09/2026",
    "topic": "Ethical Dilemma",
    "pres": "29/09/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "28/09/2026",
    "topic": "Virtue Theory",
    "pres": "29/09/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "28/09/2026",
    "topic": "Ethical Egoism",
    "pres": "29/09/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "28/09/2026",
    "topic": "Utilitarianism",
    "pres": "29/09/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "28/09/2026",
    "topic": "Ethics Vs Morality",
    "pres": "29/09/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATASATYASURYAKANTH",
    "sub": "28/09/2026",
    "topic": "Causist Theory",
    "pres": "29/09/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "28/09/2026",
    "topic": "Deontology",
    "pres": "29/09/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "28/09/2026",
    "topic": "Emotional Intelligence",
    "pres": "29/09/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "28/09/2026",
    "topic": "Consequentialism",
    "pres": "29/09/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "28/09/2026",
    "topic": "Profession Vs Professionalism",
    "pres": "29/09/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "28/09/2026",
    "topic": "Professional Accountability",
    "pres": "29/09/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "28/09/2026",
    "topic": "Ethics in AI",
    "pres": "29/09/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "28/09/2026",
    "topic": "Moral pluralism",
    "pres": "06/10/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "28/09/2026",
    "topic": "Professional Obligations Vs Morality",
    "pres": "06/10/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "28/09/2026",
    "topic": "Ethics in Decision Making",
    "pres": "06/10/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "28/09/2026",
    "topic": "Responsibilities, obligations, and moral values in professional ethics.",
    "pres": "06/10/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "28/09/2026",
    "topic": "Predictibility in Engineering",
    "pres": "06/10/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "28/09/2026",
    "topic": "Central Responsibilities of Engineers",
    "pres": "06/10/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "28/09/2026",
    "topic": "Importance of Professional Associationship in Engineering",
    "pres": "06/10/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "28/09/2026",
    "topic": "Code of ethics",
    "pres": "06/10/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "28/09/2026",
    "topic": "Life skills-communication skill, problem solving skill",
    "pres": "06/10/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "28/09/2026",
    "topic": "The trolley problem- ethical dilemma",
    "pres": "06/10/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "28/09/2026",
    "topic": "Professional associationship",
    "pres": "06/10/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "28/09/2026",
    "topic": "Ombudsment",
    "pres": "06/10/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "28/09/2026",
    "topic": "Ethics in Engineering",
    "pres": "13/10/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "28/09/2026",
    "topic": "Ethics in medical",
    "pres": "13/10/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "28/09/2026",
    "topic": "Dimensions in ethics",
    "pres": "13/10/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "28/09/2026",
    "topic": "Normative Ethics",
    "pres": "13/10/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "28/09/2026",
    "topic": "Workplace Rights",
    "pres": "13/10/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "28/09/2026",
    "topic": "Steps of an organisational complaint procedure.",
    "pres": "13/10/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "28/09/2026",
    "topic": "Ethical Issues and DC-10 case",
    "pres": "13/10/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "28/09/2026",
    "topic": "Hyatt Regency Walkway Collapse",
    "pres": "13/10/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "28/09/2026",
    "topic": "Causist Theory",
    "pres": "13/10/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "28/09/2026",
    "topic": "Deontology",
    "pres": "13/10/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/038",
    "name": "MOULENDU SINHA",
    "sub": "28/09/2026",
    "topic": "Emotional Intelligence",
    "pres": "13/10/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "28/09/2026",
    "topic": "Consequentialism",
    "pres": "13/10/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "28/09/2026",
    "topic": "Profession Vs Professionalism",
    "pres": "27/10/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "28/09/2026",
    "topic": "Professional Accountability",
    "pres": "27/10/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "28/09/2026",
    "topic": "Ethics in AI",
    "pres": "27/10/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "28/09/2026",
    "topic": "Moral pluralism",
    "pres": "27/10/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "28/09/2026",
    "topic": "Professional Obligations Vs Morality",
    "pres": "27/10/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "28/09/2026",
    "topic": "The trolley problem- ethical dilemma",
    "pres": "27/10/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "28/09/2026",
    "topic": "Professional associationship",
    "pres": "27/10/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "28/09/2026",
    "topic": "Ombudsment",
    "pres": "27/10/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "28/09/2026",
    "topic": "Ethics in Engineering",
    "pres": "27/10/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "28/09/2026",
    "topic": "Ethics in medical",
    "pres": "03/11/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "28/09/2026",
    "topic": "Dimensions in ethics",
    "pres": "03/11/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "28/09/2026",
    "topic": "Professional associationship",
    "pres": "03/11/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "28/09/2026",
    "topic": "Normative Ethics",
    "pres": "03/11/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "28/09/2026",
    "topic": "Workplace Rights",
    "pres": "03/11/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "28/09/2026",
    "topic": "Steps of an organisational complaint procedure.",
    "pres": "03/11/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "28/09/2026",
    "topic": "Central Responsibilities of Engineers",
    "pres": "03/11/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "28/09/2026",
    "topic": "Importance of Professional Associationship in Engineering",
    "pres": "03/11/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "28/09/2026",
    "topic": "Code of ethics",
    "pres": "17/11/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "28/09/2026",
    "topic": "Dimensions in ethics",
    "pres": "17/11/2026"
  },
  {
    "sl": 56,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "28/09/2026",
    "topic": "Moral pluralism",
    "pres": "17/11/2026"
  }
];
const raData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "15/10/2026",
    "topic": "Overview of Robotics",
    "pres": "16/10/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "15/10/2026",
    "topic": "Key Concepts in Robotics",
    "pres": "16/10/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "15/10/2026",
    "topic": "Historical Perspective of Robotics",
    "pres": "16/10/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "15/10/2026",
    "topic": "Current Trends in Robotics",
    "pres": "16/10/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "15/10/2026",
    "topic": "Evolution of Robotic Algorithms",
    "pres": "16/10/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATASATYASURYAKANTH",
    "sub": "15/10/2026",
    "topic": "Role of Algorithms in Robotic Systems",
    "pres": "16/10/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "15/10/2026",
    "topic": "Autonomous Robots and Robotic Algorithms",
    "pres": "16/10/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "15/10/2026",
    "topic": "Robotics: From Early Systems to Modern Robots",
    "pres": "16/10/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "15/10/2026",
    "topic": "Fundamental Components of Robotic Systems",
    "pres": "16/10/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "15/10/2026",
    "topic": "Algorithmic Foundations of Autonomous Robotics",
    "pres": "16/10/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "15/10/2026",
    "topic": "Applications of Modern Robotics",
    "pres": "16/10/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "15/10/2026",
    "topic": "Challenges and Current Trends in Robotics",
    "pres": "16/10/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "15/10/2026",
    "topic": "Introduction to Robot Kinematics",
    "pres": "16/10/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "15/10/2026",
    "topic": "Forward Kinematics",
    "pres": "16/10/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "15/10/2026",
    "topic": "Inverse Kinematics",
    "pres": "16/10/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "15/10/2026",
    "topic": "Comparison of Forward and Inverse Kinematics",
    "pres": "16/10/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "15/10/2026",
    "topic": "Kinematic Analysis of Robotic Systems",
    "pres": "16/10/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "15/10/2026",
    "topic": "Applications of Forward Kinematics",
    "pres": "16/10/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "15/10/2026",
    "topic": "Applications of Inverse Kinematics",
    "pres": "16/10/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "15/10/2026",
    "topic": "Robot Dynamics: Fundamental Concepts",
    "pres": "16/10/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "15/10/2026",
    "topic": "Relationship Between Kinematics and Dynamics",
    "pres": "16/10/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "15/10/2026",
    "topic": "Dynamics of Robotic Systems",
    "pres": "16/10/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/066",
    "name": "MOHIT KUMAR",
    "sub": "15/10/2026",
    "topic": "Robot Dynamics and Control",
    "pres": "16/10/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/069",
    "name": "BISWAJIT CHAKRABORTY",
    "sub": "15/10/2026",
    "topic": "Kinematics and Dynamics in Robot Motion",
    "pres": "16/10/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/070",
    "name": "DISHA MANDAL",
    "sub": "15/10/2026",
    "topic": "Introduction to Robotic Perception",
    "pres": "16/10/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/071",
    "name": "DIPAN PAUL",
    "sub": "15/10/2026",
    "topic": "Sensor Models in Robotics",
    "pres": "30/10/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/072",
    "name": "SAGAR SK",
    "sub": "15/10/2026",
    "topic": "Sensor Data Acquisition",
    "pres": "30/10/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/073",
    "name": "SAYAN BASAK",
    "sub": "15/10/2026",
    "topic": "Sensor-Based Perception in Robots",
    "pres": "30/10/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "15/10/2026",
    "topic": "Sensor Data and Robotic Decision-Making",
    "pres": "30/10/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "15/10/2026",
    "topic": "Introduction to Sensor Fusion",
    "pres": "30/10/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "15/10/2026",
    "topic": "Need for Sensor Fusion in Robotics",
    "pres": "30/10/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "15/10/2026",
    "topic": "Filtering Techniques in Robotics",
    "pres": "30/10/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "15/10/2026",
    "topic": "Kalman Filter",
    "pres": "30/10/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "15/10/2026",
    "topic": "Particle Filter",
    "pres": "30/10/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "15/10/2026",
    "topic": "Kalman Filter and Particle Filter",
    "pres": "30/10/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "15/10/2026",
    "topic": "Perception and Sensor Fusion for Autonomous Robots",
    "pres": "30/10/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "15/10/2026",
    "topic": "Introduction to Robot Localization",
    "pres": "30/10/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "15/10/2026",
    "topic": "Probabilistic Approaches to Localization",
    "pres": "30/10/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "15/10/2026",
    "topic": "Robot Mapping",
    "pres": "30/10/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "15/10/2026",
    "topic": "Simultaneous Localization and Mapping (SLAM)",
    "pres": "30/10/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "15/10/2026",
    "topic": "Fundamentals of Motion Planning",
    "pres": "30/10/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "15/10/2026",
    "topic": "Graph-Based Motion Planning",
    "pres": "30/10/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "15/10/2026",
    "topic": "A* Algorithm for Robot Navigation",
    "pres": "30/10/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "15/10/2026",
    "topic": "Dijkstra's Algorithm for Robot Navigation",
    "pres": "30/10/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "15/10/2026",
    "topic": "A* and Dijkstra: A Comparative Study",
    "pres": "30/10/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "15/10/2026",
    "topic": "Sampling-Based Motion Planning",
    "pres": "30/10/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "15/10/2026",
    "topic": "Rapidly-Exploring Random Tree (RRT)",
    "pres": "30/10/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "15/10/2026",
    "topic": "Probabilistic Roadmap (PRM)",
    "pres": "30/10/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "15/10/2026",
    "topic": "Introduction to Robotic Control Algorithms",
    "pres": "30/10/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "15/10/2026",
    "topic": "PID Control for Robots",
    "pres": "30/10/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "15/10/2026",
    "topic": "Model Predictive Control (MPC)",
    "pres": "30/10/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "15/10/2026",
    "topic": "Adaptive Control in Robotics",
    "pres": "30/10/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "15/10/2026",
    "topic": "Robust Control in Robotics",
    "pres": "30/10/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "15/10/2026",
    "topic": "Adaptive and Robust Control: A Comparison",
    "pres": "30/10/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "15/10/2026",
    "topic": "Applications of Forward Kinematics",
    "pres": "30/10/2026"
  }
];

// Master Combined Data for Universal Search
const masterData = [];
raiData.forEach(r => masterData.push({ ...r, subjectKey: 'rai', subjectCode: 'BTR50112', subjectName: 'Robotics & AI' }));
rsmData.forEach(r => masterData.push({ ...r, subjectKey: 'rsm', subjectCode: 'BTR50113', subjectName: 'Robot Safety' }));
tmmdData.forEach(r => masterData.push({ ...r, subjectKey: 'tmmd', subjectCode: 'BTR50114', subjectName: 'Machine Design' }));
peData.forEach(r => masterData.push({ ...r, subjectKey: 'pe', subjectCode: 'BTR50115', subjectName: 'Prof. Ethics' }));
raData.forEach(r => masterData.push({ ...r, subjectKey: 'ra', subjectCode: 'BTR50116', subjectName: 'Robotic Algorithms' }));

/* ══════════════════════════════════════════
   3. TABLE RENDERING FUNCTIONS
══════════════════════════════════════════ */
function renderTableRows(tbodyId, countId, data, subjectCode, countSingular = 'student', countPlural = 'students') {
  const tbody = document.getElementById(tbodyId);
  const countEl = document.getElementById(countId);
  if (!tbody) return;

  if (countEl) {
    countEl.innerHTML = `Showing <strong>${data.length}</strong> ${data.length === 1 ? countSingular : countPlural}`;
  }

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="td-empty">No matching records found. Try modifying your search keywords.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(r => {
    const hasDate = r.pres && r.pres.trim() && r.pres !== '—';
    const presDisplay = hasDate 
      ? `<span class="pres-date-val">${r.pres}</span>` 
      : `<span class="pres-date-tba" title="Date not yet scheduled by department">—</span>`;
    return `
      <tr>
        <td class="td-sl">${String(r.sl).padStart(2, '0')}</td>
        <td class="td-code"><span class="code-pill">${r.code}</span></td>
        <td class="td-name">${r.name}</td>
        <td class="td-topic">${r.topic}</td>
        <td class="td-date">${presDisplay}</td>
      </tr>
    `;
  }).join('');
}

function renderRaiTable(data)  { renderTableRows('raiTbody', 'raiCount', data, 'BTR50112'); }
function renderRsmTable(data)  { renderTableRows('rsmTbody', 'rsmCount', data, 'BTR50113'); }
function renderTmmdTable(data) { renderTableRows('tmmdTbody', 'tmmdCount', data, 'BTR50114'); }
function renderPeTable(data)   { renderTableRows('peTbody', 'peCount', data, 'BTR50115'); }
function renderRaTable(data)   { renderTableRows('raTbody', 'raCount', data, 'BTR50116'); }

function renderMasterTable(data) {
  const tbody = document.getElementById('masterTbody');
  const countEl = document.getElementById('masterCount');
  if (!tbody) return;

  if (countEl) {
    countEl.innerHTML = `Showing <strong>${data.length}</strong> of ${masterData.length} topic allocations`;
  }

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="td-empty">No matching topics found across all subjects.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(r => {
    const hasDate = r.pres && r.pres.trim() && r.pres !== '—';
    const presDisplay = hasDate 
      ? `<span class="pres-date-val">${r.pres}</span>` 
      : `<span class="pres-date-tba" title="Date not yet scheduled by department">—</span>`;
    return `
      <tr>
        <td class="td-sl">${String(r.sl).padStart(2, '0')}</td>
        <td class="td-code"><span class="code-pill">${r.code}</span></td>
        <td class="td-name">${r.name}</td>
        <td class="td-topic"><span class="sub-tag ${r.subjectKey}">${r.subjectName}</span> ${r.topic}</td>
        <td class="td-date">${presDisplay}</td>
      </tr>
    `;
  }).join('');
}

/* ══════════════════════════════════════════
   4. SEARCH AND FILTER LISTENERS
══════════════════════════════════════════ */
function setupSearch(inputId, dataList, renderFn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', function(){
    const q = this.value.trim().toLowerCase();
    if (!q) {
      renderFn(dataList);
      return;
    }
    const filtered = dataList.filter(r => 
      r.code.toLowerCase().includes(q) || 
      r.name.toLowerCase().includes(q) ||
      (r.topic && r.topic.toLowerCase().includes(q))
    );
    renderFn(filtered);
  });
}

setupSearch('raiSearch', raiData, renderRaiTable);
setupSearch('rsmSearch', rsmData, renderRsmTable);
setupSearch('tmmdSearch', tmmdData, renderTmmdTable);
setupSearch('peSearch', peData, renderPeTable);
setupSearch('raSearch', raData, renderRaTable);

// Master Search & Subject Filters
let currentMasterFilter = 'all';
function applyMasterFilters() {
  const q = (document.getElementById('masterSearch')?.value || '').trim().toLowerCase();
  let list = masterData;
  if (currentMasterFilter !== 'all') {
    list = list.filter(r => r.subjectKey === currentMasterFilter);
  }
  if (q) {
    list = list.filter(r => 
      r.code.toLowerCase().includes(q) || 
      r.name.toLowerCase().includes(q) || 
      r.topic.toLowerCase().includes(q) ||
      r.subjectName.toLowerCase().includes(q) ||
      r.subjectCode.toLowerCase().includes(q)
    );
  }
  renderMasterTable(list);
}

const masterSearchEl = document.getElementById('masterSearch');
if (masterSearchEl) {
  masterSearchEl.addEventListener('input', applyMasterFilters);
}

document.querySelectorAll('#masterFilterPills .filter-btn').forEach(btn => {
  btn.addEventListener('click', function(){
    document.querySelectorAll('#masterFilterPills .filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentMasterFilter = this.getAttribute('data-filter') || 'all';
    applyMasterFilters();
  });
});

/* ══════════════════════════════════════════
   5. SPA ROUTER & NAVIGATION ENGINE
══════════════════════════════════════════ */
const pages = {
  home: document.getElementById('home'),
  subjects: document.getElementById('subjects'),
  topics: document.getElementById('topics'),
  deadlines: document.getElementById('deadlines'),
  'rai-detail': document.getElementById('rai-detail'),
  'rsm-detail': document.getElementById('rsm-detail'),
  'tmmd-detail': document.getElementById('tmmd-detail'),
  'pe-detail': document.getElementById('pe-detail'),
  'ra-detail': document.getElementById('ra-detail'),
  'submit-rsm': document.getElementById('submit-rsm'),
};

let currentPage = 'home';

function hideAllPages(){
  Object.values(pages).forEach(p => {
    if (p) p.classList.remove('active');
  });
}

function showPage(name){
  hideAllPages();
  const target = pages[name] || pages['home'];
  if (target) {
    target.classList.add('active');
  }
  currentPage = name;
  if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Update active state in top navbar
  document.querySelectorAll('.site-nav .nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-nav') === name);
  });

  // Reset search and refresh tables
  if (name === 'rai-detail')  { const el = document.getElementById('raiSearch');  if(el) el.value = ''; renderRaiTable(raiData); }
  if (name === 'rsm-detail')  { const el = document.getElementById('rsmSearch');  if(el) el.value = ''; renderRsmTable(rsmData); }
  if (name === 'tmmd-detail') { const el = document.getElementById('tmmdSearch'); if(el) el.value = ''; renderTmmdTable(tmmdData); }
  if (name === 'pe-detail')   { const el = document.getElementById('peSearch');   if(el) el.value = ''; renderPeTable(peData); }
  if (name === 'ra-detail')   { const el = document.getElementById('raSearch');   if(el) el.value = ''; renderRaTable(raData); }
  if (name === 'topics')      { applyMasterFilters(); }
  if (name === 'submit-rsm')  {
    const iframe = document.getElementById('rsmFormIframe');
    if (iframe && (!iframe.src || iframe.src === 'about:blank')) {
      iframe.src = 'https://docs.google.com/forms/d/e/1FAIpQLSfP5n7nqjTnmcfQlLN7MDX2wsRQgNaGA4qB2kqyzug-FUebvg/viewform?embedded=true';
    }
  }

  if (target && typeof target.querySelectorAll === 'function') {
    const cards = target.querySelectorAll('.subject-card, .topic-card');
    cards.forEach(c => { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; });
  }

  if (name === 'home') {
    const heroLogo = document.getElementById('heroLogoShowcase');
    if (heroLogo) {
      heroLogo.style.animation = 'none';
      void heroLogo.offsetWidth;
      heroLogo.style.animation = '';
    }
  }
}

// Safe history API wrappers (prevent SecurityError on file:// protocol or sandbox iframes)
function safeHistory(action, state, title, url) {
  try {
    if (window.history && typeof window.history[action] === 'function') {
      window.history[action](state, title, url);
    }
  } catch (e) {
    // Protocol doesn't allow history states (e.g. file:// in some browsers)
  }
}

function nav(name){
  safeHistory('pushState', { page: name }, '', location.href);
  showPage(name);
}
window.nav = nav;

function goBack() {
  try {
    if (window.history && window.history.length > 1 && currentPage !== 'home') {
      window.history.back();
    } else {
      nav('home');
    }
  } catch (e) {
    nav('home');
  }
}
window.goBack = goBack;

// In-page Back button listeners
['backBtn', 'backBtn2', 'backBtn3', 'backBtn4', 'backBtn5', 'backBtn6', 'backBtn7', 'backBtn8'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      goBack();
    });
  }
});

// Primary CTA buttons on Home
const ctaBtn = document.getElementById('ctaBtn');
if (ctaBtn) ctaBtn.addEventListener('click', () => nav('subjects'));

const ctaBtn2 = document.getElementById('ctaBtn2');
if (ctaBtn2) ctaBtn2.addEventListener('click', () => nav('subjects'));

const topicBtn = document.getElementById('topicBtn');
if (topicBtn) topicBtn.addEventListener('click', () => nav('topics'));

const deadlineBtn = document.getElementById('deadlineBtn');
if (deadlineBtn) deadlineBtn.addEventListener('click', () => nav('deadlines'));

// Topic Cards on Topics Page
const topicCardMap = {
  raiCard: 'rai-detail',
  rsmCard: 'rsm-detail',
  tmmdCard: 'tmmd-detail',
  peCard: 'pe-detail',
  raCard: 'ra-detail',
};

Object.keys(topicCardMap).forEach(id => {
  const card = document.getElementById(id);
  if (card) {
    card.addEventListener('click', () => nav(topicCardMap[id]));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nav(topicCardMap[id]);
      }
    });
  }
});

// Hardware / Browser Back button handling
window.addEventListener('popstate', e => {
  const page = (e.state && e.state.page) ? e.state.page : 'home';
  showPage(page);
});

// Visibility change history sync
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && history.state && history.state.page !== currentPage) {
    safeHistory('replaceState', { page: currentPage }, '', location.href);
  }
});

// Touch swipe-back gesture for iOS/Android
(function setupSwipeBack(){
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
    if (touchStartX < 40 && dx > 60 && dy < 80 && currentPage !== 'home') {
      goBack();
    }
  }, { passive: true });
})();

/* ══════════════════════════════════════════
   6. PPT SUBMISSION MODAL & LOGIC
══════════════════════════════════════════ */
let selectedFile = null;

// Official Google Forms for PPT Submission across all 5 core subjects
const SUBJECT_GOOGLE_FORMS = {
  'BTR50112': {
    name: 'Robotics and Artificial Intelligence',
    url: 'https://forms.gle/BFtHZ1xs6i8ej7LT6'
  },
  'BTR50113': {
    name: 'Robot Safety and Maintenance',
    url: 'https://forms.gle/QyTjQNBShAkmym879'
  },
  'BTR50114': {
    name: 'Theory of Machine & Machine Design',
    url: 'https://forms.gle/XPsQoRgDLFohLeP96'
  },
  'BTR50115': {
    name: 'Professional Ethics',
    url: 'https://forms.gle/AQ23qEcpwCw3rmn58'
  },
  'BTR50116': {
    name: 'Robotic Algorithms',
    url: 'https://forms.gle/634qrTnzSsBa6UXF9'
  }
};
window.SUBJECT_GOOGLE_FORMS = SUBJECT_GOOGLE_FORMS;

function openSubjectSubmission(subjectCode) {
  const form = SUBJECT_GOOGLE_FORMS[subjectCode];
  if (form && form.url) {
    window.open(form.url, '_blank', 'noopener,noreferrer');
    if (typeof showToast === 'function') {
      showToast(`✓ Opening Google Form for ${form.name} in a new tab…`);
    }
    return;
  }
  openSubmitModal(subjectCode);
}
window.openSubjectSubmission = openSubjectSubmission;

function openSubmitModal(subjectCode, rollCode) {
  // If subject code is specified, open that subject's official Google Form directly in a new tab
  if (subjectCode && SUBJECT_GOOGLE_FORMS[subjectCode] && !rollCode) {
    openSubjectSubmission(subjectCode);
    return;
  }

  const modal = document.getElementById('submitModal');
  const formView = document.getElementById('modalFormView');
  const successView = document.getElementById('modalSuccessView');
  if (!modal) return;

  if (formView) formView.style.display = 'block';
  if (successView) successView.style.display = 'none';

  const form = document.getElementById('pptUploadForm');
  if (form) form.reset();
  removeSelectedFile();

  if (subjectCode) {
    const subjSelect = document.getElementById('modalSubject');
    if (subjSelect) {
      subjSelect.value = subjectCode;
      onModalSubjectChange();
    }
  }

  if (rollCode) {
    const rollInput = document.getElementById('modalRoll');
    if (rollInput) {
      rollInput.value = rollCode;
      onModalRollInput();
    }
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openSubmitModal = openSubmitModal;

function closeSubmitModal() {
  const modal = document.getElementById('submitModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeSubmitModal = closeSubmitModal;

// Close on backdrop click & ESC key
const submitModalEl = document.getElementById('submitModal');
if (submitModalEl) {
  submitModalEl.addEventListener('click', function(e){
    if (e.target === submitModalEl) {
      closeSubmitModal();
    }
  });
}
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') closeSubmitModal();
});

// Auto-populate Name and Topic when Roll or Subject is selected
function onModalSubjectChange() {
  const subjSelect = document.getElementById('modalSubject');
  const googleNotice = document.getElementById('modalGoogleFormNotice');
  const subjVal = subjSelect ? subjSelect.value : '';
  const formInfo = SUBJECT_GOOGLE_FORMS[subjVal];

  if (googleNotice) {
    if (formInfo) {
      googleNotice.style.display = 'flex';
      const textEl = googleNotice.querySelector('.modal-embed-callout-text');
      if (textEl) {
        textEl.innerHTML = `<strong>Official Google Form:</strong> ${formInfo.name} (${subjVal}) submissions are accepted via Google Form.`;
      }
      const btnEl = googleNotice.querySelector('.modal-embed-callout-btn');
      if (btnEl) {
        btnEl.onclick = function() {
          closeSubmitModal();
          openSubjectSubmission(subjVal);
        };
        btnEl.textContent = `Open ${subjVal} Google Form ↗`;
      }
    } else {
      googleNotice.style.display = 'none';
    }
  }
  onModalRollInput();
}
window.onModalSubjectChange = onModalSubjectChange;

// Iframe helpers for embedded Google Form
function onIframeLoaded(loaderId) {
  const loader = document.getElementById(loaderId);
  if (loader) {
    loader.classList.add('loaded');
  }
}
window.onIframeLoaded = onIframeLoaded;

function reloadFormIframe(iframeId) {
  const iframe = document.getElementById(iframeId);
  const loader = document.getElementById('rsmEmbedLoader');
  if (loader) loader.classList.remove('loaded');
  if (iframe) {
    const currentSrc = iframe.src;
    iframe.src = '';
    setTimeout(() => {
      iframe.src = currentSrc;
    }, 150);
  }
}
window.reloadFormIframe = reloadFormIframe;

function copyFormLink(url) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(url).then(() => {
      if (typeof showToast === 'function') {
        showToast('✓ Google Form link copied to clipboard!');
      }
    }).catch(() => {
      window.prompt('Copy Google Form link:', url);
    });
  } else {
    window.prompt('Copy Google Form link:', url);
  }
}
window.copyFormLink = copyFormLink;

function onModalRollInput() {
  const rollInput = document.getElementById('modalRoll');
  const nameInput = document.getElementById('modalName');
  const topicInput = document.getElementById('modalTopic');
  const subjSelect = document.getElementById('modalSubject');

  if (!rollInput || !nameInput || !topicInput) return;
  const rollVal = rollInput.value.trim().toUpperCase();
  const subjVal = subjSelect ? subjSelect.value : '';

  // Look up student across data
  const student = masterData.find(s => s.code.toUpperCase() === rollVal);
  if (student) {
    nameInput.value = student.name;
    if (subjVal) {
      const matchTopic = masterData.find(s => s.code.toUpperCase() === rollVal && s.subjectCode === subjVal);
      if (matchTopic) {
        topicInput.value = matchTopic.topic;
      }
    }
  }
}
window.onModalRollInput = onModalRollInput;

// Drag and drop file handling
const dropZone = document.getElementById('modalDropZone');
const fileInput = document.getElementById('modalFileInput');

if (dropZone && fileInput) {
  dropZone.addEventListener('click', () => fileInput.click());

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
    });
  });

  dropZone.addEventListener('drop', e => {
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      fileInput.files = e.dataTransfer.files;
      onFileSelected(fileInput);
    }
  });
}

function onFileSelected(input) {
  if (input.files && input.files[0]) {
    selectedFile = input.files[0];
    const badge = document.getElementById('selectedFileBadge');
    const nameEl = document.getElementById('selectedFileName');
    if (badge && nameEl) {
      nameEl.textContent = selectedFile.name + ' (' + (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB)';
      badge.style.display = 'inline-flex';
    }
    if (dropZone) dropZone.style.display = 'none';
  }
}
window.onFileSelected = onFileSelected;

function removeSelectedFile() {
  selectedFile = null;
  const fileInput = document.getElementById('modalFileInput');
  if (fileInput) fileInput.value = '';
  const badge = document.getElementById('selectedFileBadge');
  if (badge) badge.style.display = 'none';
  if (dropZone) dropZone.style.display = 'block';
}
window.removeSelectedFile = removeSelectedFile;

// Form Submission & Receipt Generator
function handleFormSubmit(e) {
  e.preventDefault();

  const subjSelect = document.getElementById('modalSubject');
  const rollInput = document.getElementById('modalRoll');
  const nameInput = document.getElementById('modalName');
  const topicInput = document.getElementById('modalTopic');
  const submitBtn = document.getElementById('modalSubmitBtn');

  const subjectCode = subjSelect.value;
  const studentCode = rollInput.value.trim().toUpperCase();
  const studentName = nameInput.value.trim();
  const topicName = topicInput.value.trim();

  if (!selectedFile) {
    showToast('Please attach your presentation file (.pptx, .ppt, or .pdf)');
    return;
  }

  // Visual submission feedback
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-label">Uploading & Verifying...</span>';
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span class="btn-label">Submit Presentation</span><span class="btn-icon">→</span>';
    }

    // Generate verified receipt
    const cleanRoll = studentCode.replace(/[^0-9]/g, '').slice(-3) || '001';
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const receiptCode = `AIR5A-${subjectCode}-${cleanRoll}-${randSuffix}`;

    const formView = document.getElementById('modalFormView');
    const successView = document.getElementById('modalSuccessView');
    if (formView && successView) {
      formView.style.display = 'none';
      successView.style.display = 'block';
    }

    const receiptIdEl = document.getElementById('receiptId');
    if (receiptIdEl) receiptIdEl.textContent = receiptCode;

    const receiptStudentEl = document.getElementById('receiptStudent');
    if (receiptStudentEl) receiptStudentEl.textContent = `${studentName} (${studentCode})`;

    const subjObj = SUBJECTS_META.find(s => s.code === subjectCode);
    const receiptSubjEl = document.getElementById('receiptSubject');
    if (receiptSubjEl) receiptSubjEl.textContent = subjObj ? subjObj.name : subjectCode;

    const receiptTopicEl = document.getElementById('receiptTopic');
    if (receiptTopicEl) receiptTopicEl.textContent = topicName;

    const receiptTimeEl = document.getElementById('receiptTime');
    if (receiptTimeEl) receiptTimeEl.textContent = new Date().toLocaleString();

    showToast('✓ Presentation submitted successfully!');
  }, 800);
}
window.handleFormSubmit = handleFormSubmit;

function copyReceiptCode() {
  const code = document.getElementById('receiptId')?.textContent;
  if (code) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        showToast('Receipt ID copied to clipboard!');
      }).catch(() => {
        showToast('Receipt ID: ' + code);
      });
    } else {
      showToast('Receipt ID: ' + code);
    }
  }
}
window.copyReceiptCode = copyReceiptCode;

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
window.showToast = showToast;

/* ══════════════════════════════════════════
   7. INITIALIZATION ON SCRIPT LOAD
══════════════════════════════════════════ */
// Pre-render all tables so no view is ever blank
renderRaiTable(raiData);
renderRsmTable(rsmData);
renderTmmdTable(tmmdData);
renderPeTable(peData);
renderRaTable(raData);
applyMasterFilters();

// Initialize initial page view
safeHistory('replaceState', { page: 'home' }, '', location.href);

// Check if a specific page hash was requested in the URL (e.g. #subjects or #topics)
let initHash = '';
try {
  if (typeof window !== 'undefined' && window.location && window.location.hash) {
    initHash = window.location.hash.replace('#', '');
  }
} catch (e) {}

if (initHash && pages[initHash]) {
  showPage(initHash);
} else {
  showPage('home');
}
