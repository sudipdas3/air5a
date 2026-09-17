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
      c: i % 4 === 0 ? '#00d4ff' : i % 4 === 1 ? '#8b5cf6' : i % 4 === 2 ? '#f59e0b' : '#10b981',
      cLight: i % 4 === 0 ? '#0284c7' : i % 4 === 1 ? '#7c3aed' : i % 4 === 2 ? '#d97706' : '#059669'
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
            : `rgba(0, 212, 255, ${(1 - dist / MAX_DIST) * 0.16})`;
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
    "softDeadline": "14/04/2026",
    "presDate": "21/04/2026",
    "status": "ACTIVE"
  },
  {
    "id": "rsm",
    "code": "BTR50113",
    "name": "Robot Safety and Maintenance",
    "short": "Robot Safety",
    "softDeadline": "16/04/2026",
    "presDate": "23/04/2026",
    "status": "ACTIVE"
  },
  {
    "id": "tmmd",
    "code": "BTR50114",
    "name": "Theory of Machine & Machine Design",
    "short": "Machine Design",
    "softDeadline": "18/04/2026",
    "presDate": "25/04/2026",
    "status": "ACTIVE"
  },
  {
    "id": "pe",
    "code": "BTR50115",
    "name": "Professional Ethics",
    "short": "Prof. Ethics",
    "softDeadline": "20/04/2026",
    "presDate": "28/04/2026",
    "status": "ACTIVE"
  },
  {
    "id": "ra",
    "code": "BTR50116",
    "name": "Robotic Algorithms",
    "short": "Robotic Algorithms",
    "softDeadline": "22/04/2026",
    "presDate": "30/04/2026",
    "status": "ACTIVE"
  }
];

const raiData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "14/04/2026",
    "topic": "Forward and Inverse Kinematics in Articulated Robotic Arms",
    "pres": "21/04/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "14/04/2026",
    "topic": "Denavit-Hartenberg (D-H) Parameter Representation for Manipulators",
    "pres": "21/04/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "14/04/2026",
    "topic": "Computer Vision & Deep Learning in Robotic Object Manipulation",
    "pres": "21/04/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "14/04/2026",
    "topic": "Deep Reinforcement Learning for Autonomous Mobile Navigation",
    "pres": "21/04/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "14/04/2026",
    "topic": "Simultaneous Localization and Mapping (SLAM) Algorithms in ROS",
    "pres": "21/04/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATAS ATYASURYAKANTH",
    "sub": "14/04/2026",
    "topic": "Swarm Robotics: Decentralized Coordination & Flocking",
    "pres": "21/04/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "14/04/2026",
    "topic": "Heuristic Path Planning using A* and Dynamic RRT* Algorithms",
    "pres": "21/04/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "14/04/2026",
    "topic": "Real-Time Object Detection using YOLO for Pick-and-Place Robots",
    "pres": "21/04/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "14/04/2026",
    "topic": "End-Effector Trajectory Generation with Smooth Polynomial Splines",
    "pres": "21/04/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "14/04/2026",
    "topic": "Human-Robot Interaction (HRI) & Collaborative Robotics (Cobots)",
    "pres": "21/04/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "14/04/2026",
    "topic": "Transformer-Based Foundation Models in Vision-Language-Action Robotics",
    "pres": "21/04/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "14/04/2026",
    "topic": "Sensor Fusion with Extended Kalman Filter (EKF) for Mobile Robots",
    "pres": "21/04/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "14/04/2026",
    "topic": "LiDAR vs Depth Camera 3D Perception in Unstructured Environments",
    "pres": "21/04/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "14/04/2026",
    "topic": "Embedded Edge AI Hardware Acceleration for Autonomous Drones",
    "pres": "21/04/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "14/04/2026",
    "topic": "Generative AI & LLM Integration for High-Level Robot Task Planning",
    "pres": "21/04/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "14/04/2026",
    "topic": "Force and Torque Feedback Control in Precision Robotic Surgery",
    "pres": "21/04/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "14/04/2026",
    "topic": "Autonomous Mobile Robots (AMRs) in Smart Warehouse Logistics",
    "pres": "21/04/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "14/04/2026",
    "topic": "Semantic Scene Segmentation for Autonomous Ground Vehicles",
    "pres": "21/04/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "14/04/2026",
    "topic": "Reinforcement Learning for Bipedal and Quadrupedal Locomotion",
    "pres": "21/04/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "14/04/2026",
    "topic": "Soft Robotics: Pneumatic Actuators and Biomimetic Grippers",
    "pres": "21/04/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "14/04/2026",
    "topic": "Visual Odometry and Pose Estimation in GPS-Denied Environments",
    "pres": "21/04/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "14/04/2026",
    "topic": "Kinematic Singularity Avoidance and Manipulability Ellipsoids",
    "pres": "21/04/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "14/04/2026",
    "topic": "Imitation Learning & Behavioral Cloning from Human Demonstrations",
    "pres": "21/04/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "14/04/2026",
    "topic": "Micro-Aerial Vehicle (MAV) Flight Dynamics and Stabilization",
    "pres": "21/04/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "14/04/2026",
    "topic": "Underwater Autonomous Vehicles (AUVs): Perception and Control",
    "pres": "21/04/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "14/04/2026",
    "topic": "Agricultural Field Robotics: Autonomous Harvesting and Weed Control",
    "pres": "21/04/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "14/04/2026",
    "topic": "Brain-Computer Interfaces (BCI) for Prosthetic Robotic Limbs",
    "pres": "21/04/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "14/04/2026",
    "topic": "Model Predictive Control (MPC) for High-Speed Autonomous Driving",
    "pres": "21/04/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/038",
    "name": "MOULENDU SINHA",
    "sub": "14/04/2026",
    "topic": "Bio-Inspired Robotics: Gecko-Like Adhesive Climbing Mechanisms",
    "pres": "21/04/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "14/04/2026",
    "topic": "Tactile Sensing Arrays and Electronic Skin for Robotic Grippers",
    "pres": "21/04/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "14/04/2026",
    "topic": "Robotic Exoskeletons for Rehabilitation and Industrial Ergonomics",
    "pres": "21/04/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "14/04/2026",
    "topic": "Space Robotics: Autonomous Manipulation on Orbital Platforms",
    "pres": "21/04/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "14/04/2026",
    "topic": "3D Point Cloud Processing with PointNet for Robotic Perception",
    "pres": "21/04/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "14/04/2026",
    "topic": "Stereo Vision vs Monocular Depth Estimation in Robotics",
    "pres": "21/04/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "14/04/2026",
    "topic": "Dynamic Obstacle Tracking and Collision Avoidance with Velocity Obstacles",
    "pres": "21/04/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "14/04/2026",
    "topic": "Multi-Robot Task Allocation (MRTA) and Fleet Management",
    "pres": "21/04/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "14/04/2026",
    "topic": "Domain Randomization for Sim-to-Real Transfer in Robotic Learning",
    "pres": "21/04/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "14/04/2026",
    "topic": "Compliant Joint Mechanisms and Variable Impedance Actuation",
    "pres": "21/04/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "14/04/2026",
    "topic": "Autonomous Search and Rescue Robotics in Disaster Scenarios",
    "pres": "21/04/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "14/04/2026",
    "topic": "Thermal Imaging and Hyperspectral Vision in Inspection Robots",
    "pres": "21/04/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "14/04/2026",
    "topic": "Self-Reconfigurable Modular Robots: Mechanics and Algorithms",
    "pres": "21/04/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "14/04/2026",
    "topic": "Teleoperation with Haptic Feedback and Low-Latency Networks",
    "pres": "21/04/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "14/04/2026",
    "topic": "Active Perception and Next-Best-View Exploration in Unknown Spaces",
    "pres": "21/04/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "14/04/2026",
    "topic": "Energy-Efficient Trajectory Optimization for Battery-Powered AMRs",
    "pres": "21/04/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "14/04/2026",
    "topic": "Acoustic and Ultrasonic Sensing for Robotic Non-Destructive Testing",
    "pres": "21/04/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "14/04/2026",
    "topic": "Zero-Shot Robot Manipulation using Open-Vocabulary Foundation Models",
    "pres": "21/04/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "14/04/2026",
    "topic": "Wearable Sensors for Human Motion Capture and Robotic Teleoperation",
    "pres": "21/04/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "14/04/2026",
    "topic": "Digital Twins for Real-Time Robot Telemetry and Predictive Analytics",
    "pres": "21/04/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "14/04/2026",
    "topic": "High-Precision Micro-Robotics for Biomedical Drug Delivery",
    "pres": "21/04/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "14/04/2026",
    "topic": "Field Inspection Drones: Autonomous Pipeline and Wind Turbine Survey",
    "pres": "21/04/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "14/04/2026",
    "topic": "Vision-Guided Autonomous Docking and Wireless Recharging Systems",
    "pres": "21/04/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "14/04/2026",
    "topic": "Safety-Critical Control Barriers (CBFs) in Autonomous Robotics",
    "pres": "21/04/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "14/04/2026",
    "topic": "Robotic Bartending and Food Preparation: Food-Grade Automation",
    "pres": "21/04/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "14/04/2026",
    "topic": "Autonomous Lawn Care and Janitorial Robots: Coverage Path Planning",
    "pres": "21/04/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "14/04/2026",
    "topic": "Neuromorphic Event-Based Cameras for High-Speed Robotic Vision",
    "pres": "21/04/2026"
  },
  {
    "sl": 56,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "14/04/2026",
    "topic": "Future Horizons of Artificial General Intelligence in Embodied Robotics",
    "pres": "21/04/2026"
  }
];
const rsmData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "16/04/2026",
    "topic": "ISO 10218-1 & ISO 10218-2 Industrial Robot Safety Compliance Standards",
    "pres": "23/04/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "16/04/2026",
    "topic": "ISO/TS 15066 Technical Specifications for Collaborative Industrial Robots",
    "pres": "23/04/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "16/04/2026",
    "topic": "Hazard Identification & Risk Assessment (HIRA) in Automated Cells",
    "pres": "23/04/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "16/04/2026",
    "topic": "Safety Integrity Levels (SIL) and Safety Instrumented Systems (SIS)",
    "pres": "23/04/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "16/04/2026",
    "topic": "Category 4 Safety Circuits and Hardwired Emergency Stop Architecture",
    "pres": "23/04/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATAS ATYASURYAKANTH",
    "sub": "16/04/2026",
    "topic": "Optical Safety Devices: Safety Light Curtains and Area Laser Scanners",
    "pres": "23/04/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "16/04/2026",
    "topic": "Predictive vs Preventive Maintenance in Heavy Industrial Automation",
    "pres": "23/04/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "16/04/2026",
    "topic": "Vibration Analysis & Spectral FFT for Robot Joint Bearing Health",
    "pres": "23/04/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "16/04/2026",
    "topic": "Infrared Thermography for Early Servo Motor Winding Failure Detection",
    "pres": "23/04/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "16/04/2026",
    "topic": "Harmonic Drive & Cycloidal Gearbox Wear Diagnostics and Tribology",
    "pres": "23/04/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "16/04/2026",
    "topic": "Flex-Cable Harness Fatigue Monitoring in Multi-Axis Articulated Arms",
    "pres": "23/04/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "16/04/2026",
    "topic": "Mean Time Between Failures (MTBF) and MTTR Modeling in Robotics",
    "pres": "23/04/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "16/04/2026",
    "topic": "Failure Modes, Effects, and Criticality Analysis (FMECA) for Automation",
    "pres": "23/04/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "16/04/2026",
    "topic": "Industrial IoT (IIoT) Protocols for Remote Robot Tele-Diagnostics",
    "pres": "23/04/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "16/04/2026",
    "topic": "Digital Twins for Predictive Maintenance and Asset Lifecycle Optimization",
    "pres": "23/04/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "16/04/2026",
    "topic": "ATEX & Explosion-Proof Safety Standards for Painting and Chemical Robots",
    "pres": "23/04/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "16/04/2026",
    "topic": "Battery Health Management and Thermal Runaway Prevention in AGVs/AMRs",
    "pres": "23/04/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "16/04/2026",
    "topic": "Electrical Safety, Grounding, and ESD Protection in Robotic Workcells",
    "pres": "23/04/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "16/04/2026",
    "topic": "Power and Force Limiting (PFL) in Collaborative Human-Robot Workstations",
    "pres": "23/04/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "16/04/2026",
    "topic": "Dynamic Speed and Separation Monitoring (SSM) using Time-of-Flight Sensors",
    "pres": "23/04/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "16/04/2026",
    "topic": "Autonomous Collision Detection via Joint Motor Current Ripple Analysis",
    "pres": "23/04/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "16/04/2026",
    "topic": "Lockout/Tagout (LOTO) Procedures for Safe Maintenance Intervention",
    "pres": "23/04/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "16/04/2026",
    "topic": "Pneumatic and Hydraulic Gripper Pressure Relief and Leak Detection",
    "pres": "23/04/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "16/04/2026",
    "topic": "Brake Slip Detection and Holding Torque Verification in Vertical Axes",
    "pres": "23/04/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "16/04/2026",
    "topic": "Corrosion Prevention and Ingress Protection (IP Ratings) in Washdown Robots",
    "pres": "23/04/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "16/04/2026",
    "topic": "Software Safety: Watchdog Timers and Redundant Microcontroller Units",
    "pres": "23/04/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "16/04/2026",
    "topic": "Cybersecurity Vulnerabilities in Industrial Robot Controllers and Fieldbuses",
    "pres": "23/04/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "16/04/2026",
    "topic": "Safety Interlocks: Trapped Key and RFID Non-Contact Guard Switches",
    "pres": "23/04/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/038",
    "name": "MOULENDU SINHA",
    "sub": "16/04/2026",
    "topic": "Acoustic Emission Analysis for Bearing Fatigue and Micro-Crack Detection",
    "pres": "23/04/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "16/04/2026",
    "topic": "Robotic Workcell Enclosure Ergonomics and Safe Clearance Envelopes",
    "pres": "23/04/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "16/04/2026",
    "topic": "Automated Calibration Routines for Compensating Mechanical Link Wear",
    "pres": "23/04/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "16/04/2026",
    "topic": "Failure Diagnostics in Brushless DC (BLDC) Motor Encoders and Resolvers",
    "pres": "23/04/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "16/04/2026",
    "topic": "Cooling Fan Performance and Heat Sink Fouling in Robot Power Cabinets",
    "pres": "23/04/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "16/04/2026",
    "topic": "Safety Considerations in Autonomous Mobile Robot High-Traffic Intersections",
    "pres": "23/04/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "16/04/2026",
    "topic": "Environmental Testing: Shock, Vibration, and Thermal Chamber Validation",
    "pres": "23/04/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "16/04/2026",
    "topic": "Lubrication Regimes: Synthetic Greases and Automated Lubricator Systems",
    "pres": "23/04/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "16/04/2026",
    "topic": "Safe Teach Pendant Ergonomics and Deadman Switch Engineering",
    "pres": "23/04/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "16/04/2026",
    "topic": "Laser Processing Safety: Class 4 Laser Robotic Enclosures and Interlocks",
    "pres": "23/04/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "16/04/2026",
    "topic": "Autonomous Recovery and Safe Home Positioning after Fault Tripping",
    "pres": "23/04/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "16/04/2026",
    "topic": "Root Cause Analysis (RCA) Methodologies for Catastrophic Robot Failures",
    "pres": "23/04/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "16/04/2026",
    "topic": "Machine Safety Directives (2006/42/EC) and Global Compliance Harmonization",
    "pres": "23/04/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "16/04/2026",
    "topic": "Overhead Gantry Robot Cable Carrier Track Wear and Chain Guide Maintenance",
    "pres": "23/04/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "16/04/2026",
    "topic": "Functional Safety Lifecycle Management according to IEC 61508",
    "pres": "23/04/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "16/04/2026",
    "topic": "Sensor Redundancy and Cross-Checking in Safety-Critical Robot Controllers",
    "pres": "23/04/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "16/04/2026",
    "topic": "Cleanroom Robot Certification (ISO 14644) and Particulate Emission Control",
    "pres": "23/04/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "16/04/2026",
    "topic": "Maintenance Planning using Computerized Maintenance Management Systems (CMMS)",
    "pres": "23/04/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "16/04/2026",
    "topic": "Thermal Imaging Diagnostics of Power Distribution and Contactor Welds",
    "pres": "23/04/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "16/04/2026",
    "topic": "Safe Payload Capacity Verification and Center-of-Gravity Deviation Limits",
    "pres": "23/04/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "16/04/2026",
    "topic": "Inspection of Harmonic Drive Flexible Splines for Micro-Fractures",
    "pres": "23/04/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "16/04/2026",
    "topic": "Personnel Protective Equipment (PPE) Guidelines for Robot Cell Programmers",
    "pres": "23/04/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "16/04/2026",
    "topic": "High-Voltage Battery Disconnect Units (BDU) Safety in Electric AGV Fleets",
    "pres": "23/04/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "16/04/2026",
    "topic": "Voice of Customer (VoC) and Field Feedback Integration in Robot Redesign",
    "pres": "23/04/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "16/04/2026",
    "topic": "Safety Interlock Overrides: Risks, Audit Trails, and Regulatory Penalties",
    "pres": "23/04/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "16/04/2026",
    "topic": "Spare Parts Inventory Optimization using AI Demand Forecasting",
    "pres": "23/04/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "16/04/2026",
    "topic": "Emergency Escape Route Engineering and Visual Floor Warning Markings",
    "pres": "23/04/2026"
  },
  {
    "sl": 56,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "16/04/2026",
    "topic": "Future Trends in Self-Healing Materials and Self-Diagnostic Robotic Modules",
    "pres": "23/04/2026"
  }
];
const tmmdData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "18/04/2026",
    "topic": "Degrees of Freedom (DoF) and Kutzbach-Gruebler Criterion in Mechanisms",
    "pres": "25/04/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "18/04/2026",
    "topic": "Kinematic Inversions of Four-Bar Mechanisms and Practical Applications",
    "pres": "25/04/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "18/04/2026",
    "topic": "Slider-Crank Mechanism Kinematics and Piston Acceleration Analysis",
    "pres": "25/04/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "18/04/2026",
    "topic": "Cams and Followers: Displacement, Velocity, and Jerk Curve Profiles",
    "pres": "25/04/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "18/04/2026",
    "topic": "Involute vs Cycloidal Gear Tooth Profiles and Interference Elimination",
    "pres": "25/04/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATAS ATYASURYAKANTH",
    "sub": "18/04/2026",
    "topic": "Epicyclic Gear Trains: Velocity Ratio and Torque Distribution Calculations",
    "pres": "25/04/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "18/04/2026",
    "topic": "Harmonic Drive Gearing Principles: Wave Generator and Flexspline Mechanics",
    "pres": "25/04/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "18/04/2026",
    "topic": "Static and Dynamic Balancing of Reciprocating and Rotating Masses",
    "pres": "25/04/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "18/04/2026",
    "topic": "Flywheels in Machinery: Fluctuation of Speed and Coefficient of Fluctuation",
    "pres": "25/04/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "18/04/2026",
    "topic": "Gyroscopic Couples and Precessional Motion in High-Speed Robot Rotors",
    "pres": "25/04/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "18/04/2026",
    "topic": "Fatigue Failure Theories: Gerber, Goodman, and Soderberg Criteria",
    "pres": "25/04/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "18/04/2026",
    "topic": "Design of Transmission Shafts Subjected to Combined Bending and Torsion",
    "pres": "25/04/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "18/04/2026",
    "topic": "Power Transmission via V-Belts, Flat Belts, and Timing Belts Analysis",
    "pres": "25/04/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "18/04/2026",
    "topic": "Hydrodynamic Lubrication and Petroff's Equation in Journal Bearings",
    "pres": "25/04/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "18/04/2026",
    "topic": "Deep Groove vs Angular Contact Ball Bearings: Dynamic Load Rating and L10 Life",
    "pres": "25/04/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "18/04/2026",
    "topic": "Friction Clutches: Uniform Pressure vs Uniform Wear Design Principles",
    "pres": "25/04/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "18/04/2026",
    "topic": "Shoe and Disc Brakes: Energy Absorption and Thermal Dissipation Design",
    "pres": "25/04/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "18/04/2026",
    "topic": "Lead Screws and Recirculating Ball Screws: Efficiency and Backlash Modeling",
    "pres": "25/04/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "18/04/2026",
    "topic": "Helical Springs: Stresses, Deflection, and Surge Frequency Prevention",
    "pres": "25/04/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "18/04/2026",
    "topic": "Leaf Springs Design and Semi-Elliptic Suspensions in Transport Vehicles",
    "pres": "25/04/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "18/04/2026",
    "topic": "Bolted Joint Mechanics: Bolt Preload, Gasket Stiffness, and Clamping Force",
    "pres": "25/04/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "18/04/2026",
    "topic": "Welded Joint Design under Static and Cyclic Fatigue Shear Loading",
    "pres": "25/04/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "18/04/2026",
    "topic": "Shaft Keys and Splines: Shear and Crushing Stress Analysis",
    "pres": "25/04/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "18/04/2026",
    "topic": "Finite Element Modeling (FEM) for Stress Concentration Analysis in Fillets",
    "pres": "25/04/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "18/04/2026",
    "topic": "Geneva Mechanism and Star Wheels for Intermittent Motion Indexing",
    "pres": "25/04/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "18/04/2026",
    "topic": "Hooke’s Universal Joints and Constant Velocity (CV) Joints Kinematics",
    "pres": "25/04/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "18/04/2026",
    "topic": "Pantograph and Straight-Line Motion Generating Linkages (Peaucellier-Lipkin)",
    "pres": "25/04/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "18/04/2026",
    "topic": "Governor Mechanisms: Centrifugal vs Inertia Governors Speed Regulation",
    "pres": "25/04/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/038",
    "name": "MOULENDU SINHA",
    "sub": "18/04/2026",
    "topic": "Critical Speeds and Whirling of Rotating Shafts with Center Discs",
    "pres": "25/04/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "18/04/2026",
    "topic": "Torsional Vibration in Multi-Rotor Drive Trains and Holzer Method",
    "pres": "25/04/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "18/04/2026",
    "topic": "Vibration Isolation: Transmissibility and Damping in Sensitive Robot Bases",
    "pres": "25/04/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "18/04/2026",
    "topic": "Spur Gear Tooth Bending Strength: Lewis Equation and AGMA Standard Factors",
    "pres": "25/04/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "18/04/2026",
    "topic": "Surface Durability and Contact Pitting Stress in Helical Gear Meshing",
    "pres": "25/04/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "18/04/2026",
    "topic": "Bevel Gear Geometry and Pitch Cone Angles in Right-Angle Power Drives",
    "pres": "25/04/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "18/04/2026",
    "topic": "Worm and Worm Gear Drives: Self-Locking Conditions and Heat Dissipation",
    "pres": "25/04/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "18/04/2026",
    "topic": "Mechanical Press Mechanisms: Toggle Joint Kinematics and Mechanical Advantage",
    "pres": "25/04/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "18/04/2026",
    "topic": "Scotch Yoke Mechanism vs Simple Harmonic Motion in Pump Actuators",
    "pres": "25/04/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "18/04/2026",
    "topic": "Dynamic Force Analysis of 6-DoF Industrial Manipulator Kinematic Chains",
    "pres": "25/04/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "18/04/2026",
    "topic": "Elastic Deformation and Deflection Limits in Long Robot Cantilever Booms",
    "pres": "25/04/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "18/04/2026",
    "topic": "Tribological Mechanisms: Adhesive, Abrasive, and Fretting Wear Reduction",
    "pres": "25/04/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "18/04/2026",
    "topic": "Thermal Expansion Compensation in High-Precision Machine Tool Spindles",
    "pres": "25/04/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "18/04/2026",
    "topic": "Selection of Engineering Materials: Strength-to-Weight Ratio in Robotics",
    "pres": "25/04/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "18/04/2026",
    "topic": "Design of Hollow vs Solid Shafts: Weight Optimization and Torque Capacity",
    "pres": "25/04/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "18/04/2026",
    "topic": "Design of Thick Cylinders under High Internal Pressure (Lame's Equations)",
    "pres": "25/04/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "18/04/2026",
    "topic": "Pre-stressed Belleville Disc Spring Stacks for Heavy Clamping Devices",
    "pres": "25/04/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "18/04/2026",
    "topic": "Kinematics of Planetary Roller Screws for High-Force Linear Actuation",
    "pres": "25/04/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "18/04/2026",
    "topic": "Quick-Return Motion Mechanisms: Whitworth and Crank-Shaper Design",
    "pres": "25/04/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "18/04/2026",
    "topic": "Contact Stresses (Hertzian Stress) in Rolling Element Point and Line Contacts",
    "pres": "25/04/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "18/04/2026",
    "topic": "Dynamic Balancing Machines: Two-Plane Field Balancing using Stroboscopic Tech",
    "pres": "25/04/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "18/04/2026",
    "topic": "Design for Manufacturing and Assembly (DFMA) Principles in Machine Elements",
    "pres": "25/04/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "18/04/2026",
    "topic": "Failure Investigation of Cracked Shafts due to Rotational Bending Fatigue",
    "pres": "25/04/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "18/04/2026",
    "topic": "Hydraulic Actuator Cylinder Sizing, Seal Selection, and Buckling Resistance",
    "pres": "25/04/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "18/04/2026",
    "topic": "Backlash Compensation Mechanisms using Dual-Pinion Anti-Backlash Drives",
    "pres": "25/04/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "18/04/2026",
    "topic": "Design of Robot Gripper Linkages: Parallel Jaw vs Angular Opening Mechanics",
    "pres": "25/04/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "18/04/2026",
    "topic": "Kinematic Analysis of Cable-Driven Parallel Robots (CDPR)",
    "pres": "25/04/2026"
  },
  {
    "sl": 56,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "18/04/2026",
    "topic": "Additive Manufacturing Considerations in Complex Topology-Optimized Brackets",
    "pres": "25/04/2026"
  }
];
const peData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "20/04/2026",
    "topic": "Foundations of Professional Ethics: Codes of Conduct (IEEE, ACM, ASME)",
    "pres": "28/04/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "20/04/2026",
    "topic": "Moral Responsibility and Accountability in Autonomous Weapon Systems",
    "pres": "28/04/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "20/04/2026",
    "topic": "Algorithmic Bias and Discrimination in AI Recruitment and Lending Systems",
    "pres": "28/04/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "20/04/2026",
    "topic": "Legal and Ethical Liability in Autonomous Vehicle Fatalities",
    "pres": "28/04/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "20/04/2026",
    "topic": "Intellectual Property Rights (IPR), Software Patents, and Open Source Ethics",
    "pres": "28/04/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATAS ATYASURYAKANTH",
    "sub": "20/04/2026",
    "topic": "Workplace Automation: Socio-Economic Disruption and Just Transition",
    "pres": "28/04/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "20/04/2026",
    "topic": "Privacy in the Era of Pervasive Surveillance and Smart Home Companions",
    "pres": "28/04/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "20/04/2026",
    "topic": "Environmental Ethics: Carbon Footprint and E-Waste in the Tech Industry",
    "pres": "28/04/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "20/04/2026",
    "topic": "Whistleblowing in High-Tech Corporations: Legal Protections and Moral Duty",
    "pres": "28/04/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "20/04/2026",
    "topic": "Engineering Disaster Case Study: The Space Shuttle Challenger Tragedy",
    "pres": "28/04/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "20/04/2026",
    "topic": "Software Catastrophes: Radiation Overdose Case Study of the Therac-25",
    "pres": "28/04/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "20/04/2026",
    "topic": "Deepfakes, Synthetic Media, and the Erosion of Truth in Digital Society",
    "pres": "28/04/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "20/04/2026",
    "topic": "Global AI Governance: EU AI Act and International Regulatory Frameworks",
    "pres": "28/04/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "20/04/2026",
    "topic": "Human Dignity and Ethical Boundaries in Elderly-Care Robotic Companions",
    "pres": "28/04/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "20/04/2026",
    "topic": "Cyber Warfare, Offensive Cyber Weapons, and Geneva Convention Ethics",
    "pres": "28/04/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "20/04/2026",
    "topic": "Corporate Social Responsibility (CSR) and Greenwashing in Tech Giants",
    "pres": "28/04/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "20/04/2026",
    "topic": "Explainability and the Right to Explanation in Black-Box Deep Neural Networks",
    "pres": "28/04/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "20/04/2026",
    "topic": "Biometric Surveillance, Facial Recognition, and Civil Liberties Infringements",
    "pres": "28/04/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "20/04/2026",
    "topic": "Cultural Relativism vs Universal Human Rights in Global Technology Export",
    "pres": "28/04/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "20/04/2026",
    "topic": "Gig Economy Ethics: Algorithm-Driven Labor and Worker Exploitation",
    "pres": "28/04/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "20/04/2026",
    "topic": "Academic Integrity, Plagiarism, and Authorship Ethics with LLM Tools",
    "pres": "28/04/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "20/04/2026",
    "topic": "The Trolley Problem Revisited: Ethical Decision Algorithms in Self-Driving Cars",
    "pres": "28/04/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "20/04/2026",
    "topic": "Neuroethics and Cognitive Privacy: Brain-Computer Interface Commercialization",
    "pres": "28/04/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "20/04/2026",
    "topic": "Conflict of Interest in Tech Consulting, Peer Review, and Advisory Boards",
    "pres": "28/04/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "20/04/2026",
    "topic": "Genetic Engineering, CRISPR Ethics, and Artificial Intelligence Synergy",
    "pres": "28/04/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "20/04/2026",
    "topic": "Digital Divide: Equity of Access to Advanced Artificial Intelligence Tools",
    "pres": "28/04/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "20/04/2026",
    "topic": "Addictive System Design: Dark Patterns and Dopamine Loops in Social Tech",
    "pres": "28/04/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "20/04/2026",
    "topic": "Protection of Sensitive Whistleblower Data and Secure Investigative Channels",
    "pres": "28/04/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/038",
    "name": "MOULENDU SINHA",
    "sub": "20/04/2026",
    "topic": "Ethical Issues in Deep-Sea and Space Resource Exploitation Technologies",
    "pres": "28/04/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "20/04/2026",
    "topic": "Data Scraping, Copyright Law, and Fair Use in Generative AI Training",
    "pres": "28/04/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "20/04/2026",
    "topic": "Child Safety Online: Algorithmic Content Recommendation Ethics",
    "pres": "28/04/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "20/04/2026",
    "topic": "Truthfulness in Marketing Emerging Technologies: Mitigating Hype Cycles",
    "pres": "28/04/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "20/04/2026",
    "topic": "Engineering Malpractice and Negligence: Historical Forensic Case Studies",
    "pres": "28/04/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "20/04/2026",
    "topic": "Responsible Disclosure Policies for Zero-Day Cybersecurity Vulnerabilities",
    "pres": "28/04/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "20/04/2026",
    "topic": "The Ethics of Human Augmentation and Transhumanist Technologies",
    "pres": "28/04/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "20/04/2026",
    "topic": "Surveillance Capitalism and the Commodification of Human Personal Data",
    "pres": "28/04/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "20/04/2026",
    "topic": "Autonomous Drones in Law Enforcement: Public Trust and Proportionality",
    "pres": "28/04/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "20/04/2026",
    "topic": "Professionalism in Distributed Remote Engineering Teams: Trust and Metrics",
    "pres": "28/04/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "20/04/2026",
    "topic": "Informed Consent in Large-Scale Web-Based Psychometric Experimentation",
    "pres": "28/04/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "20/04/2026",
    "topic": "Environmental Justice: Toxic Mineral Extraction for Lithium Batteries",
    "pres": "28/04/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "20/04/2026",
    "topic": "Ethical Challenges in Medical AI Diagnosis and Doctor-Patient Trust",
    "pres": "28/04/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "20/04/2026",
    "topic": "Freedom of Speech, Censorship, and Moderation Algorithms on Platforms",
    "pres": "28/04/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "20/04/2026",
    "topic": "The Precautionary Principle in Deploying Unbounded Frontier AI Models",
    "pres": "28/04/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "20/04/2026",
    "topic": "Cross-Border Data Flows, Sovereignty, and Extraterritorial Jurisdiction",
    "pres": "28/04/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "20/04/2026",
    "topic": "Ethics in Forensic Engineering: Unbiased Expert Witness Testimony",
    "pres": "28/04/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "20/04/2026",
    "topic": "Autonomous Financial Trading Bots and Market Manipulation Ethics",
    "pres": "28/04/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "20/04/2026",
    "topic": "Robotic Rights: Philosophical Inquiries into Sentient Artificial Agents",
    "pres": "28/04/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "20/04/2026",
    "topic": "Energy Consumption in Proof-of-Work Blockchain vs Sustainable Alternatives",
    "pres": "28/04/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "20/04/2026",
    "topic": "Fairness Metrics in Machine Learning: Equal Opportunity vs Demographic Parity",
    "pres": "28/04/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "20/04/2026",
    "topic": "Professional Codes for Nuclear and Aerospace Autonomous Defense Engineers",
    "pres": "28/04/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "20/04/2026",
    "topic": "Ethical Considerations in Digital Legacy and Post-Mortem Digital Avatars",
    "pres": "28/04/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "20/04/2026",
    "topic": "Safety-First Culture vs Schedule Pressure in Fast-Paced Software Releases",
    "pres": "28/04/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "20/04/2026",
    "topic": "Bribery, Corruption, and Anti-FCPA Compliance in Global Engineering Tenders",
    "pres": "28/04/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "20/04/2026",
    "topic": "Impact of Virtual Reality & Metaverse Environments on Mental Health",
    "pres": "28/04/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "20/04/2026",
    "topic": "Veterinary and Agricultural AI: Ethical Standards in Livestock Management",
    "pres": "28/04/2026"
  },
  {
    "sl": 56,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "20/04/2026",
    "topic": "The Engineer’s Oath: Synthesizing Technological Progress with Human Welfare",
    "pres": "28/04/2026"
  }
];
const raData = [
  {
    "sl": 1,
    "code": "BWU/BAR/24/001",
    "name": "SOUMEN BHANDARI",
    "sub": "22/04/2026",
    "topic": "Classical Graph Search: Breadth-First, Depth-First, and Dijkstra's Algorithm",
    "pres": "30/04/2026"
  },
  {
    "sl": 2,
    "code": "BWU/BAR/24/002",
    "name": "DHRUBAJOTI KAR",
    "sub": "22/04/2026",
    "topic": "A* Heuristic Search and Weighted Variants for Fast Robot Navigation",
    "pres": "30/04/2026"
  },
  {
    "sl": 3,
    "code": "BWU/BAR/24/003",
    "name": "NIMESH SAMANTA",
    "sub": "22/04/2026",
    "topic": "Lifelong Planning A* (LPA*) and D* Lite for Dynamic Replanning",
    "pres": "30/04/2026"
  },
  {
    "sl": 4,
    "code": "BWU/BAR/24/004",
    "name": "SUBHAJIT BHAKTA",
    "sub": "22/04/2026",
    "topic": "Rapidly-exploring Random Trees (RRT) and Bidirectional RRT Algorithms",
    "pres": "30/04/2026"
  },
  {
    "sl": 5,
    "code": "BWU/BAR/24/007",
    "name": "ATANU BISWAS",
    "sub": "22/04/2026",
    "topic": "RRT* and Informed RRT* for Asymptotically Optimal Motion Planning",
    "pres": "30/04/2026"
  },
  {
    "sl": 6,
    "code": "BWU/BAR/24/008",
    "name": "JOGA JYOTHENDRAVEERAVENKATAS ATYASURYAKANTH",
    "sub": "22/04/2026",
    "topic": "Potential Field Methods and Artificial Force Fields for Obstacle Avoidance",
    "pres": "30/04/2026"
  },
  {
    "sl": 7,
    "code": "BWU/BAR/24/009",
    "name": "SANIA AKTAR",
    "sub": "22/04/2026",
    "topic": "Bug 1 and Bug 2 Algorithms for Sensor-Limited Reactive Navigation",
    "pres": "30/04/2026"
  },
  {
    "sl": 8,
    "code": "BWU/BAR/24/010",
    "name": "DIPSIKHA PAYRA",
    "sub": "22/04/2026",
    "topic": "Probabilistic Roadmap Method (PRM) for High-Degree-of-Freedom Manipulators",
    "pres": "30/04/2026"
  },
  {
    "sl": 9,
    "code": "BWU/BAR/24/011",
    "name": "SUPARNA GHORA",
    "sub": "22/04/2026",
    "topic": "Monte Carlo Localization (MCL) using Particle Filters and Resampling",
    "pres": "30/04/2026"
  },
  {
    "sl": 10,
    "code": "BWU/BAR/24/012",
    "name": "DIPIKA MAITY",
    "sub": "22/04/2026",
    "topic": "Extended Kalman Filter (EKF) for Wheeled Robot Odometry and Sensor Fusion",
    "pres": "30/04/2026"
  },
  {
    "sl": 11,
    "code": "BWU/BAR/24/013",
    "name": "AKASH BAIRAGI",
    "sub": "22/04/2026",
    "topic": "Unscented Kalman Filter (UKF) for Highly Nonlinear Robot Dynamics",
    "pres": "30/04/2026"
  },
  {
    "sl": 12,
    "code": "BWU/BAR/24/014",
    "name": "ANKAN DUTTA",
    "sub": "22/04/2026",
    "topic": "Graph-Based SLAM: Pose Graph Optimization using Ceres and g2o Solvers",
    "pres": "30/04/2026"
  },
  {
    "sl": 13,
    "code": "BWU/BAR/24/015",
    "name": "ARNAB SAHANA",
    "sub": "22/04/2026",
    "topic": "Iterative Closest Point (ICP) and Generalized ICP for 3D Scan Matching",
    "pres": "30/04/2026"
  },
  {
    "sl": 14,
    "code": "BWU/BAR/24/016",
    "name": "SUPRAJIT DE",
    "sub": "22/04/2026",
    "topic": "Visual-Inertial Odometry (VIO) using Tight-Coupled Optimization (VINS-Mono)",
    "pres": "30/04/2026"
  },
  {
    "sl": 15,
    "code": "BWU/BAR/24/019",
    "name": "SHILPI BHOWMICK",
    "sub": "22/04/2026",
    "topic": "Model Predictive Control (MPC) Formulation for Trajectory Tracking",
    "pres": "30/04/2026"
  },
  {
    "sl": 16,
    "code": "BWU/BAR/24/020",
    "name": "MAHUYA BHOWMICK",
    "sub": "22/04/2026",
    "topic": "Proportional-Integral-Derivative (PID) vs Computed Torque Robot Control",
    "pres": "30/04/2026"
  },
  {
    "sl": 17,
    "code": "BWU/BAR/24/021",
    "name": "SAIKAT HAZRA",
    "sub": "22/04/2026",
    "topic": "Deep Q-Networks (DQN) for Discrete Robotic Control Decision Policies",
    "pres": "30/04/2026"
  },
  {
    "sl": 18,
    "code": "BWU/BAR/24/023",
    "name": "SK SAHIL UDDIN",
    "sub": "22/04/2026",
    "topic": "Proximal Policy Optimization (PPO) for Continuous Motor Control Learning",
    "pres": "30/04/2026"
  },
  {
    "sl": 19,
    "code": "BWU/BAR/24/027",
    "name": "SHANE ALI",
    "sub": "22/04/2026",
    "topic": "Inverse Kinematics: Jacobian Pseudoinverse and Damped Least Squares (DLS)",
    "pres": "30/04/2026"
  },
  {
    "sl": 20,
    "code": "BWU/BAR/24/028",
    "name": "PRERANA BANERJEE",
    "sub": "22/04/2026",
    "topic": "Trajectory Generation: Quintic Polynomials and Trajectory Smoothing Splines",
    "pres": "30/04/2026"
  },
  {
    "sl": 21,
    "code": "BWU/BAR/24/029",
    "name": "ARNAB KUMAR JANA",
    "sub": "22/04/2026",
    "topic": "Multi-Agent Flocking Algorithms: Reynolds Boids and Swarm Cohesion",
    "pres": "30/04/2026"
  },
  {
    "sl": 22,
    "code": "BWU/BAR/24/030",
    "name": "ARIJIT SAIN",
    "sub": "22/04/2026",
    "topic": "3D Volumetric Mapping using Octree Hierarchical Structures (OctoMap)",
    "pres": "30/04/2026"
  },
  {
    "sl": 23,
    "code": "BWU/BAR/24/031",
    "name": "UJJAL DOLUI",
    "sub": "22/04/2026",
    "topic": "Frontier-Based Exploration Algorithms for Autonomous Environment Mapping",
    "pres": "30/04/2026"
  },
  {
    "sl": 24,
    "code": "BWU/BAR/24/033",
    "name": "ABHISHEK MONDAL",
    "sub": "22/04/2026",
    "topic": "Genetic Algorithms for Kinematic Parameter and Gear Ratio Optimization",
    "pres": "30/04/2026"
  },
  {
    "sl": 25,
    "code": "BWU/BAR/24/034",
    "name": "SANDIP PARAMANIK",
    "sub": "22/04/2026",
    "topic": "Generalized Voronoi Diagrams (GVD) for Maximum Clearance Navigation",
    "pres": "30/04/2026"
  },
  {
    "sl": 26,
    "code": "BWU/BAR/24/035",
    "name": "ARITRA MALIK",
    "sub": "22/04/2026",
    "topic": "Occupancy Grid Mapping with Inverse Sensor Models and Log-Odds Updates",
    "pres": "30/04/2026"
  },
  {
    "sl": 27,
    "code": "BWU/BAR/24/036",
    "name": "ANIRBAN SARKAR",
    "sub": "22/04/2026",
    "topic": "Dynamic Window Approach (DWA) for Real-Time Local Obstacle Avoidance",
    "pres": "30/04/2026"
  },
  {
    "sl": 28,
    "code": "BWU/BAR/24/037",
    "name": "ANUBRATA BHATTACHARYA",
    "sub": "22/04/2026",
    "topic": "Timed Elastic Band (TEB) Local Planner for Non-Holonomic Vehicles",
    "pres": "30/04/2026"
  },
  {
    "sl": 29,
    "code": "BWU/BAR/24/038",
    "name": "MOULENDU SINHA",
    "sub": "22/04/2026",
    "topic": "Cholesky Factorization and Sparse Matrix Methods in Large-Scale SLAM",
    "pres": "30/04/2026"
  },
  {
    "sl": 30,
    "code": "BWU/BAR/24/039",
    "name": "MALAIKA FIRDOUS AMIR",
    "sub": "22/04/2026",
    "topic": "Minimum Snap Trajectory Generation for Quadrotor Aggressive Flight",
    "pres": "30/04/2026"
  },
  {
    "sl": 31,
    "code": "BWU/BAR/24/040",
    "name": "PRIYAM JANA",
    "sub": "22/04/2026",
    "topic": "RANSAC Algorithm for Robust Plane and Geometric Feature Extraction",
    "pres": "30/04/2026"
  },
  {
    "sl": 32,
    "code": "BWU/BAR/24/042",
    "name": "SOUMIK PAL",
    "sub": "22/04/2026",
    "topic": "Particle Swarm Optimization (PSO) for Multi-Robot Target Search",
    "pres": "30/04/2026"
  },
  {
    "sl": 33,
    "code": "BWU/BAR/24/044",
    "name": "HIRAK GANGULY",
    "sub": "22/04/2026",
    "topic": "Direct Collocation and Trajectory Optimization for Underactuated Systems",
    "pres": "30/04/2026"
  },
  {
    "sl": 34,
    "code": "BWU/BAR/24/045",
    "name": "SIBKATULLA AL ISLAM",
    "sub": "22/04/2026",
    "topic": "Lie Groups and Lie Algebras (SE(3) and SO(3)) in Spatial Kinematics",
    "pres": "30/04/2026"
  },
  {
    "sl": 35,
    "code": "BWU/BAR/24/046",
    "name": "TURNA BERA",
    "sub": "22/04/2026",
    "topic": "Kinodynamic RRT Planning under Velocity and Acceleration Constraints",
    "pres": "30/04/2026"
  },
  {
    "sl": 36,
    "code": "BWU/BAR/24/047",
    "name": "KUNTAL MANDAL",
    "sub": "22/04/2026",
    "topic": "Semantic SLAM: Integrating Mask R-CNN Object Boundaries into Point Maps",
    "pres": "30/04/2026"
  },
  {
    "sl": 37,
    "code": "BWU/BAR/24/048",
    "name": "SUDIP DAS",
    "sub": "22/04/2026",
    "topic": "Simulated Annealing for Travelling Salesperson Inspection Route Sizing",
    "pres": "30/04/2026"
  },
  {
    "sl": 38,
    "code": "BWU/BAR/24/049",
    "name": "RAJARSHEE BERA",
    "sub": "22/04/2026",
    "topic": "Reciprocal Velocity Obstacles (RVO) for Decentralized Collision Avoidance",
    "pres": "30/04/2026"
  },
  {
    "sl": 39,
    "code": "BWU/BAR/24/050",
    "name": "KAZI WASIM AKRAM",
    "sub": "22/04/2026",
    "topic": "Dubins Car and Reeds-Shepp Paths for Forward and Reverse Car Navigation",
    "pres": "30/04/2026"
  },
  {
    "sl": 40,
    "code": "BWU/BAR/24/052",
    "name": "GAUSUL AZAM SK",
    "sub": "22/04/2026",
    "topic": "Linear Quadratic Regulator (LQR) for Inverted Pendulum Balancing Robots",
    "pres": "30/04/2026"
  },
  {
    "sl": 41,
    "code": "BWU/BAR/24/053",
    "name": "MASUDUL ALAM",
    "sub": "22/04/2026",
    "topic": "Sliding Mode Control (SMC) for Robust Disturbance Rejection in Robots",
    "pres": "30/04/2026"
  },
  {
    "sl": 42,
    "code": "BWU/BAR/24/054",
    "name": "SUBHAM KUMBHAKAR",
    "sub": "22/04/2026",
    "topic": "Convex Hull Algorithms (Graham Scan, Quickhull) for Robot Footstep Planning",
    "pres": "30/04/2026"
  },
  {
    "sl": 43,
    "code": "BWU/BAR/24/055",
    "name": "ARITRIK DEV",
    "sub": "22/04/2026",
    "topic": "Kalman Consensus Filters for Distributed Sensor Networks on Drone Fleets",
    "pres": "30/04/2026"
  },
  {
    "sl": 44,
    "code": "BWU/BAR/24/056",
    "name": "KRISH BISHWAKARMA",
    "sub": "22/04/2026",
    "topic": "Deep Deterministic Policy Gradient (DDPG) for Robotic Manipulation Tasks",
    "pres": "30/04/2026"
  },
  {
    "sl": 45,
    "code": "BWU/BAR/24/057",
    "name": "BARNALI MANDAL",
    "sub": "22/04/2026",
    "topic": "FastSLAM Algorithm: Factored Particle Representations for Landmark Maps",
    "pres": "30/04/2026"
  },
  {
    "sl": 46,
    "code": "BWU/BAR/24/058",
    "name": "ROHAN KAR",
    "sub": "22/04/2026",
    "topic": "Nonlinear Least Squares using Levenberg-Marquardt Optimization",
    "pres": "30/04/2026"
  },
  {
    "sl": 47,
    "code": "BWU/BAR/24/059",
    "name": "ROHON DAS",
    "sub": "22/04/2026",
    "topic": "Coverage Path Planning (CPP): Boustrophedon Cellular Decomposition",
    "pres": "30/04/2026"
  },
  {
    "sl": 48,
    "code": "BWU/BAR/24/062",
    "name": "DEBABRATA DEY",
    "sub": "22/04/2026",
    "topic": "Homotopy Class Planning for Multi-Route Exploration in Dense Obstacles",
    "pres": "30/04/2026"
  },
  {
    "sl": 49,
    "code": "BWU/BAR/24/063",
    "name": "PRAGYANSHU SAGAR GIRI",
    "sub": "22/04/2026",
    "topic": "Differential Dynamic Programming (DDP) for Complex Multi-Contact Locomotion",
    "pres": "30/04/2026"
  },
  {
    "sl": 50,
    "code": "BWU/BAR/24/065",
    "name": "MAHAPRASHAD KARMAKAR",
    "sub": "22/04/2026",
    "topic": "Visual Servoing: Image-Based (IBVS) vs Position-Based (PBVS) Control",
    "pres": "30/04/2026"
  },
  {
    "sl": 51,
    "code": "BWU/BAR/24/066",
    "name": "Mohit Kumar",
    "sub": "22/04/2026",
    "topic": "H-Infinity Robust Control Synthesis for Uncertain Robotic Actuation",
    "pres": "30/04/2026"
  },
  {
    "sl": 52,
    "code": "BWU/BAR/24/069",
    "name": "Biswajit Chakraborty",
    "sub": "22/04/2026",
    "topic": "Octree Ray-Casting using Bresenham's 3D Algorithm for Voxel Clearing",
    "pres": "30/04/2026"
  },
  {
    "sl": 53,
    "code": "BWU/BAR/24/070",
    "name": "Disha Mandal",
    "sub": "22/04/2026",
    "topic": "Multi-Sensor Fusion: LiDAR-Inertial-Camera Odometry (LVI-SAM)",
    "pres": "30/04/2026"
  },
  {
    "sl": 54,
    "code": "BWU/BAR/24/071",
    "name": "Dipan Paul",
    "sub": "22/04/2026",
    "topic": "Actor-Critic Soft Actor-Critic (SAC) for Energy-Aware Quadruped Gaiting",
    "pres": "30/04/2026"
  },
  {
    "sl": 55,
    "code": "BWU/BAR/24/072",
    "name": "Sagar Sk",
    "sub": "22/04/2026",
    "topic": "Topological Map Building and Place Recognition using NetVLAD Embeddings",
    "pres": "30/04/2026"
  },
  {
    "sl": 56,
    "code": "BWU/BAR/24/073",
    "name": "Sayan Basak",
    "sub": "22/04/2026",
    "topic": "Future Directions in Differentiable Physics Engines for Robotic Optimization",
    "pres": "30/04/2026"
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
    tbody.innerHTML = `<tr><td colspan="7" class="td-empty">No matching records found. Try modifying your search keywords.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(r => `
    <tr>
      <td class="td-sl">${String(r.sl).padStart(2, '0')}</td>
      <td class="td-code"><span class="code-pill">${r.code}</span></td>
      <td class="td-name">${r.name}</td>
      <td class="td-sub">${r.sub}</td>
      <td class="td-topic">${r.topic}</td>
      <td class="td-date">${r.pres}</td>
      <td>
        <button class="table-btn-submit" onclick="openSubmitModal('${subjectCode}', '${r.code}')">Submit</button>
      </td>
    </tr>
  `).join('');
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
    countEl.innerHTML = `Showing <strong>${data.length}</strong> of 280 topic allocations`;
  }

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="td-empty">No matching topics found across all subjects.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(r => `
    <tr>
      <td class="td-sl">${String(r.sl).padStart(2, '0')}</td>
      <td class="td-sub-badge"><span class="sub-tag ${r.subjectKey}">${r.subjectName}</span></td>
      <td class="td-code"><span class="code-pill">${r.code}</span></td>
      <td class="td-name">${r.name}</td>
      <td class="td-topic">${r.topic}</td>
      <td class="td-date">${r.pres}</td>
      <td>
        <button class="table-btn-submit" onclick="openSubmitModal('${r.subjectCode}', '${r.code}')">Submit</button>
      </td>
    </tr>
  `).join('');
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

  if (target && typeof target.querySelectorAll === 'function') {
    const cards = target.querySelectorAll('.subject-card, .topic-card');
    cards.forEach(c => { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; });
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

function openSubmitModal(subjectCode, rollCode) {
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
    if (subjSelect) subjSelect.value = subjectCode;
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
  onModalRollInput();
}
window.onModalSubjectChange = onModalSubjectChange;

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
