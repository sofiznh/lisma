/**
 * Special Gift Web for Sofi
 * Interactive Mini-Game, Fun Questions, & Maroon Memories Page
 */

// ==========================================
// 1. SOUND SYNTHESIZER & MUSIC GENERATOR
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.musicPlaying = false;
    this.musicTimer = null;
    this.musicStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playCatch() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.05;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.18);
    });
  }

  playDodge() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + i * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.4);
    });
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    const melody = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.5, d: 0.35 }
    ];
    let time = this.ctx.currentTime;
    melody.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, time);

      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + note.d);
      time += note.d * 0.9;
    });
  }

  playChimeHarp() {
    if (!this.enabled) return;
    this.init();
    const harpNotes = [440, 554.37, 659.25, 880, 1108.73, 1318.5]; // A major nostalgic harp
    const now = this.ctx.currentTime;
    harpNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = now + idx * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.2, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.8);
    });
  }

  // Soft Nostalgic Lo-Fi Chords Music Loop
  toggleBackgroundMusic(onStateChange) {
    this.init();
    if (this.musicPlaying) {
      this.stopBackgroundMusic();
      if (onStateChange) onStateChange(false);
    } else {
      this.startBackgroundMusic();
      if (onStateChange) onStateChange(true);
    }
  }

  startBackgroundMusic() {
    if (this.musicPlaying) return;
    this.musicPlaying = true;
    this.musicStep = 0;

    // Nostalgic Progression: Cmaj7 - Am7 - Fmaj7 - G6
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00]  // G6
    ];

    const playNextBeat = () => {
      if (!this.musicPlaying) return;

      const chord = chordProgressions[Math.floor(this.musicStep / 4) % chordProgressions.length];
      const noteIndex = this.musicStep % chord.length;
      const freq = chord[noteIndex];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      // Warm vintage Rhodes-like tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);

      this.musicStep++;
      this.musicTimer = setTimeout(playNextBeat, 450); // ~66 BPM
    };

    playNextBeat();
  }

  stopBackgroundMusic() {
    this.musicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

const sfx = new SoundFX();

// Audio toggle in Stage 1 & 2
const soundBtn = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const soundText = document.getElementById('sound-text');

if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    sfx.init();
    sfx.enabled = !sfx.enabled;
    if (sfx.enabled) {
      soundIcon.textContent = '🔊';
      soundText.textContent = 'Audio ON';
      sfx.playPop();
    } else {
      soundIcon.textContent = '🔇';
      soundText.textContent = 'Audio MUTE';
    }
  });
}


// ==========================================
// 2. STAGE 1: MINI-GAME (TANGKAP RISOL MAYO)
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreCounter = document.getElementById('score-counter');
const startOverlay = document.getElementById('game-start-overlay');
const btnStartGame = document.getElementById('btn-start-game');
const winOverlay = document.getElementById('game-win-overlay');
const btnNextToQuiz = document.getElementById('btn-next-to-quiz');

let animationFrameId = null;
let gameRunning = false;
let score = 0;
const targetScore = 5;

function resizeCanvas() {
  if (!canvas) return;
  const container = canvas.parentElement;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

window.addEventListener('resize', () => {
  resizeCanvas();
  if (player && canvas) {
    player.y = canvas.height - player.height - 15;
    player.x = Math.min(player.x, canvas.width - player.width);
  }
});

const player = {
  width: 96,
  height: 22,
  x: 0,
  y: 0,
  targetX: 0,
  
  draw() {
    ctx.save();
    ctx.shadowColor = 'rgba(255, 116, 149, 0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = '#FFE5EC';
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, 12);
    ctx.fill();

    ctx.fillStyle = '#FF7495';
    ctx.beginPath();
    ctx.roundRect(this.x + 8, this.y + 4, this.width - 16, this.height - 8, 8);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖 Piring Sofi', this.x + this.width / 2, this.y + this.height / 2 + 1);

    ctx.restore();
  }
};

// Preload Head Image from sofi.png
const headImg = new Image();
headImg.src = 'sofi.png';

class FallingHead {
  constructor() {
    this.width = 54;
    this.height = 54;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = -60;
    this.speedY = 2.0 + Math.random() * 1.5;
    this.rotation = (Math.random() - 0.5) * 0.3;
    this.wobble = Math.random() * Math.PI * 2;
    this.caught = false;
  }

  update() {
    this.y += this.speedY;
    this.wobble += 0.05;
    this.x += Math.sin(this.wobble) * 0.8;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation + Math.sin(this.wobble) * 0.08);

    // Glowing halo
    ctx.shadowColor = 'rgba(255, 116, 149, 0.45)';
    ctx.shadowBlur = 10;

    // Draw circular cropped face from sofi.png
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (headImg.complete && headImg.naturalWidth > 0) {
      // Crop top head portion from sofi.png (1024x1536)
      ctx.drawImage(headImg, 80, 50, 864, 864, -this.width / 2, -this.height / 2, this.width, this.height);
    } else {
      ctx.fillStyle = '#FF7495';
      ctx.fill();
    }
    ctx.restore();

    // Cute pink circular border
    ctx.strokeStyle = '#FF7495';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, this.width / 2 - 1.5, 0, Math.PI * 2);
    ctx.stroke();

    // Cute tiny sparkle on top
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨', 0, -this.height / 2 + 2);

    ctx.restore();
  }
}

class Particle {
  constructor(x, y, text = null) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = text ? -2.5 : (Math.random() - 0.5) * 5;
    this.alpha = 1;
    this.color = ['#FFD166', '#FF7495', '#06D6A0', '#118AB2'][Math.floor(Math.random() * 4)];
    this.size = Math.random() * 5 + 3;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.025;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    if (this.text) {
      ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#E84A74';
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

let risols = [];
let particles = [];
let spawnTimer = 0;

function spawnRisol() {
  risols.push(new FallingHead());
}

function updatePlayerPosition(clientX) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const relX = clientX - rect.left;
  player.targetX = relX - player.width / 2;
  player.targetX = Math.max(0, Math.min(canvas.width - player.width, player.targetX));
}

if (canvas) {
  canvas.addEventListener('mousemove', (e) => {
    updatePlayerPosition(e.clientX);
  });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updatePlayerPosition(e.touches[0].clientX);
      e.preventDefault();
    }
  }, { passive: false });
}

window.addEventListener('keydown', (e) => {
  if (!gameRunning) return;
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    player.targetX = Math.max(0, player.targetX - 35);
  } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    player.targetX = Math.min(canvas.width - player.width, player.targetX + 35);
  }
});

function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.x += (player.targetX - player.x) * 0.25;
  player.draw();

  spawnTimer++;
  if (spawnTimer % 65 === 0 && risols.length < 3) {
    spawnRisol();
  }

  for (let i = risols.length - 1; i >= 0; i--) {
    const r = risols[i];
    r.update();
    r.draw();

    const isColliding = 
      r.y + r.height >= player.y &&
      r.y + r.height <= player.y + player.height + 15 &&
      r.x + r.width >= player.x &&
      r.x <= player.x + player.width;

    if (isColliding && !r.caught) {
      r.caught = true;
      score++;
      scoreCounter.textContent = score;
      sfx.playCatch();

      particles.push(new Particle(player.x + player.width / 2, player.y - 10, '+1 Wajah Cantik Sofi! ✨'));
      for (let p = 0; p < 8; p++) {
        particles.push(new Particle(r.x + r.width / 2, player.y));
      }

      risols.splice(i, 1);

      if (score >= targetScore) {
        onGameWin();
        return;
      }
      continue;
    }

    if (r.y > canvas.height + 40) {
      risols.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

function startGame() {
  sfx.init();
  sfx.playPop();
  resizeCanvas();
  player.x = canvas.width / 2 - player.width / 2;
  player.targetX = player.x;
  player.y = canvas.height - player.height - 18;
  score = 0;
  scoreCounter.textContent = '0';
  risols = [];
  particles = [];
  spawnTimer = 0;
  gameRunning = true;

  startOverlay.classList.add('opacity-0', 'pointer-events-none');
  winOverlay.classList.add('opacity-0', 'pointer-events-none');

  spawnRisol();
  gameLoop();
}

if (btnStartGame) {
  btnStartGame.addEventListener('click', startGame);
}

function onGameWin() {
  gameRunning = false;
  cancelAnimationFrame(animationFrameId);
  sfx.playSuccess();

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });

  winOverlay.classList.remove('opacity-0', 'pointer-events-none');
}

if (btnNextToQuiz) {
  btnNextToQuiz.addEventListener('click', () => {
    sfx.playPop();
    const stageGame = document.getElementById('stage-game');
    const stageQuiz = document.getElementById('stage-quiz');

    stageGame.classList.add('stage-fade-exit');

    setTimeout(() => {
      stageGame.classList.add('hidden');
      stageQuiz.classList.remove('hidden');
      stageQuiz.classList.add('flex', 'stage-fade-active');

      setTimeout(() => {
        document.getElementById('input-q1').focus();
      }, 400);
    }, 400);
  });
}


// ==========================================
// 3. STAGE 2: KUIS 2 PERTANYAAN INTERAKTIF
// ==========================================
const formQ1 = document.getElementById('form-q1');
const inputQ1 = document.getElementById('input-q1');
const q1Error = document.getElementById('q1-error');
const btnSubmitQ1 = document.getElementById('btn-submit-q1');
const quizQ1 = document.getElementById('quiz-q1');
const quizQ2 = document.getElementById('quiz-q2');
const dotQ1 = document.getElementById('dot-q1');
const dotQ2 = document.getElementById('dot-q2');

let q1Attempts = 0;

if (formQ1) {
  formQ1.addEventListener('submit', (e) => {
    e.preventDefault();
    sfx.init();

    const answer = inputQ1.value.trim().toLowerCase();
    const isCorrect = 
      answer.includes('risol') && 
      (answer.includes('mayo') || answer.includes('mayonaise') || answer.includes('mayonais'));

    if (isCorrect) {
      sfx.playSuccess();
      q1Error.classList.add('hidden');
      inputQ1.classList.remove('border-rose-400');
      inputQ1.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
      inputQ1.disabled = true;
      btnSubmitQ1.disabled = true;
      btnSubmitQ1.innerHTML = '✨ JAWABAN TEPAT! RISOL MAYO POLL MANTAB! 🥟';
      btnSubmitQ1.className = 'w-full bg-emerald-500 text-white font-fredoka font-bold text-lg py-3 rounded-2xl shadow-lg';

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.55 }
      });

      dotQ1.className = 'w-3 h-3 rounded-full bg-emerald-500 transition-all duration-300';
      dotQ2.className = 'w-3 h-3 rounded-full bg-pink-500 transition-all duration-300 animate-pulse';

      setTimeout(() => {
        quizQ1.classList.add('hidden');
        quizQ2.classList.remove('hidden');
        quizQ2.classList.add('stage-fade-active');
      }, 1200);

    } else {
      sfx.playWrong();
      q1Attempts++;

      formQ1.classList.remove('animate-shake');
      void formQ1.offsetWidth;
      formQ1.classList.add('animate-shake');

      inputQ1.classList.add('border-rose-400', 'focus:ring-rose-200');

      const hints = [
        'Waduh, belum tepat! Masa kamu lupa sih sama danus legendaris Sofi? 😜',
        'Masih kurang pas! Clue: Gorengan gurih berbalut tepung roti isi saus creamy... 🤤',
        'Hampir! Pikirkan kata dengan awalan "Risol..." yang ada saus putih gurihnya! 💡',
        'Bocoran dikit deh: Jawabannya adalah "Risol Mayo"! Yuk ketik sekarang! 🥟'
      ];
      const hintIdx = Math.min(q1Attempts - 1, hints.length - 1);
      q1Error.textContent = hints[hintIdx];
      q1Error.classList.remove('hidden');
    }
  });
}

// PERTANYAAN 2: DYNAMIC BUTTON CANTIK VS JELEK
const btnCantik = document.getElementById('btn-cantik');
const btnJelek = document.getElementById('btn-jelek');
const jelekTease = document.getElementById('jelek-tease');
const q2ButtonsArea = document.getElementById('q2-buttons-area');

let cantikScale = 1.0;
let jelekScale = 1.0;
let jelekClicks = 0;

const teaseTexts = [
  'Eits, kok mau pilih jelek sih? Nggak bisa dong! 🤨',
  'Mata kamu rabun ya? Coba lihat baik-baik lagi! 🧐',
  'Tombol "Jelek" lagi mogok, jangan dipaksa yaa! 🚫',
  'Dibilang nggak bisa, ngeyel banget deh! 😜',
  'Sudah takdir alam semesta bahwa Sofi itu... ✨CANTIK✨!',
  'Tuh kan tombol jeleknya kaburrr! Pencet Cantik aja! 🏃💨'
];

function handleJelekInteraction(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  sfx.playDodge();
  jelekClicks++;

  cantikScale += 0.38;
  btnCantik.style.transform = `scale(${cantikScale})`;
  btnCantik.classList.add('glow-cantik');

  jelekScale = Math.max(0.18, jelekScale - 0.18);

  const areaRect = q2ButtonsArea.getBoundingClientRect();
  const maxOffsetX = (areaRect.width / 2) - 50;
  const maxOffsetY = (areaRect.height / 2) - 40;

  const randomX = (Math.random() - 0.5) * maxOffsetX * 1.6;
  const randomY = (Math.random() - 0.5) * maxOffsetY * 1.4;

  btnJelek.style.transform = `translate(${randomX}px, ${randomY}px) scale(${jelekScale})`;

  const textIdx = Math.min(jelekClicks - 1, teaseTexts.length - 1);
  jelekTease.textContent = teaseTexts[textIdx];

  if (jelekClicks >= 5) {
    btnJelek.style.opacity = '0.12';
    btnJelek.style.pointerEvents = 'none';
    jelekTease.textContent = 'Tombol Jelek sudah musnah! Tinggal satu pilihan sejati: CANTIK! 💖';
  }
}

if (btnJelek) {
  btnJelek.addEventListener('mouseenter', handleJelekInteraction);
  btnJelek.addEventListener('click', handleJelekInteraction);
  btnJelek.addEventListener('touchstart', handleJelekInteraction, { passive: false });
}

// TRANSISI KE TAHAP 3: HALAMAN KENANGAN MAROON
if (btnCantik) {
  btnCantik.addEventListener('click', () => {
    sfx.playFanfare();

    // Grand confetti barrage!
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Reset ukuran tombol kembali ke normal (scale 1) agar teks terlihat jelas
    btnCantik.style.transform = 'scale(1)';
    btnCantik.innerHTML = '💖 100% FAKTA: SOFI CANTIK BANGET! 👑✨';
    btnCantik.disabled = true;
    if (btnJelek) {
      btnJelek.style.opacity = '0';
      btnJelek.style.pointerEvents = 'none';
      setTimeout(() => { btnJelek.style.display = 'none'; }, 200);
    }
    jelekTease.textContent = 'Pilihan yang sangat tepat dan terbukti kebenarannya! 🌟';

    // Transition to Maroon Stage 3
    setTimeout(() => {
      const stageQuiz = document.getElementById('stage-quiz');
      const stageMemories = document.getElementById('stage-memories');
      const bgDecorations = document.getElementById('bg-decorations');
      const soundToggleContainer = document.getElementById('sound-toggle-container');
      const pageBody = document.getElementById('page-body');

      stageQuiz.classList.add('stage-fade-exit');

      setTimeout(() => {
        // Hide Stage 1/2 elements
        stageQuiz.classList.add('hidden');
        if (bgDecorations) bgDecorations.classList.add('hidden');
        if (soundToggleContainer) soundToggleContainer.classList.add('hidden');

        // Apply aesthetic soft pink body background
        pageBody.className = 'bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 min-h-screen text-slate-800 font-quicksand overflow-x-hidden selection:bg-pink-300 selection:text-pink-900 transition-colors duration-1000';

        // Show Stage 3
        stageMemories.classList.remove('hidden');
        stageMemories.classList.add('flex', 'stage-fade-active');

        // Scroll smoothly to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Auto play Sal Priadi song
        setTimeout(() => {
          startMusic();
        }, 700);

      }, 600);

    }, 2200);
  });
}


// ==========================================
// 4. STAGE 3: MUSIC PLAYER (SAL PRIADI)
// ==========================================
const btnPlayMusic = document.getElementById('btn-play-music');
const vinylDisk = document.getElementById('vinyl-disk');
const equalizerBars = document.getElementById('equalizer-bars');
const musicIndicatorDot = document.getElementById('music-indicator-dot');
const playIcon = document.getElementById('play-icon');
const playText = document.getElementById('play-text');
const localAudio = document.getElementById('local-audio') || new Audio('lagu.mp3');

let ytPlayer = null;
let ytReady = false;
let isMusicActive = false;
let hasLocalAudio = false;

// Check if user provided local lagu.mp3
if (localAudio) {
  localAudio.addEventListener('canplaythrough', () => {
    hasLocalAudio = true;
  });
  localAudio.addEventListener('error', () => {
    hasLocalAudio = false;
  });
}

// YouTube IFrame Player API callback
window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('yt-player', {
    height: '200',
    width: '200',
    videoId: 'kE25Y8e0RUo', // Sal Priadi - Ada titik-titik di ujung doa (Official)
    playerVars: {
      playsinline: 1,
      controls: 0,
      disablekb: 1,
      loop: 1,
      playlist: 'kE25Y8e0RUo'
    },
    events: {
      onReady: () => {
        ytReady = true;
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) {
          isMusicActive = true;
          updateMusicUI(true);
        } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
          isMusicActive = false;
          updateMusicUI(false);
        }
      }
    }
  });
};

function updateMusicUI(isPlaying) {
  if (isPlaying) {
    vinylDisk.classList.add('spinning-vinyl');
    equalizerBars.classList.remove('hidden');
    equalizerBars.classList.add('flex');
    musicIndicatorDot.className = 'absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border border-white animate-ping';
    playIcon.textContent = '⏸️';
    playText.textContent = 'Jeda Musik';
  } else {
    vinylDisk.classList.remove('spinning-vinyl');
    equalizerBars.classList.add('hidden');
    equalizerBars.classList.remove('flex');
    musicIndicatorDot.className = 'absolute -top-1 -right-1 w-3 h-3 rounded-full bg-slate-400 border border-white';
    playIcon.textContent = '▶️';
    playText.textContent = 'Putar Musik';
  }
}

// Local Audio for lagu.mp3 (uses the <audio id="local-audio"> element)
localAudio.loop = true;
localAudio.preload = 'auto';

localAudio.addEventListener('play', () => {
  isMusicActive = true;
  updateMusicUI(true);
});
localAudio.addEventListener('pause', () => {
  isMusicActive = false;
  updateMusicUI(false);
});
localAudio.addEventListener('ended', () => {
  isMusicActive = false;
  updateMusicUI(false);
});

function startMusic() {
  localAudio.play().then(() => {
    isMusicActive = true;
    updateMusicUI(true);
  }).catch((err) => {
    console.warn('Memutar lagu.mp3 gagal, mencoba fallback YouTube:', err);
    startYouTubeAudio();
  });
}

function pauseMusic() {
  if (!localAudio.paused) {
    localAudio.pause();
  }
  if (ytPlayer && ytReady) {
    try { ytPlayer.pauseVideo(); } catch(e) {}
  }
  sfx.stopBackgroundMusic();
  isMusicActive = false;
  updateMusicUI(false);
}

function startYouTubeAudio() {
  if (ytPlayer && ytReady) {
    try {
      ytPlayer.playVideo();
      isMusicActive = true;
      updateMusicUI(true);
      return;
    } catch(err) {
      console.warn('YT playback error, falling back to synth', err);
    }
  }
  // Fallback to soothing synthesized melody
  sfx.startBackgroundMusic();
  isMusicActive = true;
  updateMusicUI(true);
}

function toggleSong() {
  if (isMusicActive) {
    pauseMusic();
  } else {
    startMusic();
  }
}

if (btnPlayMusic) {
  btnPlayMusic.addEventListener('click', () => {
    sfx.init();
    toggleSong();
  });
}


// ==========================================
// 5. STAGE 3: INTERACTIVE ENVELOPE & MODAL
// ==========================================
const envelopeWrapper = document.getElementById('envelope-wrapper');
const letterModal = document.getElementById('letter-modal');
const letterModalCard = document.getElementById('letter-modal-card');
const btnCloseLetter = document.getElementById('btn-close-letter');
const btnCloseLetterBottom = document.getElementById('btn-close-letter-bottom');

function openLetter() {
  sfx.playChimeHarp();

  // Trigger 3D envelope flap open
  envelopeWrapper.classList.add('envelope-open');

  // Gold celebration sparkles
  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#FF7495', '#FFE5EC', '#FFD166', '#FF85A1', '#FFF0F3']
  });

  // Open modal with smooth slide up
  setTimeout(() => {
    letterModal.classList.remove('hidden');
    letterModal.classList.add('flex');
    setTimeout(() => {
      letterModalCard.classList.remove('scale-95');
      letterModalCard.classList.add('scale-100');
    }, 50);
  }, 650);
}

function closeLetter() {
  sfx.playPop();
  letterModalCard.classList.remove('scale-100');
  letterModalCard.classList.add('scale-95');
  setTimeout(() => {
    letterModal.classList.add('hidden');
    letterModal.classList.remove('flex');
    envelopeWrapper.classList.remove('envelope-open');
  }, 250);
}

if (envelopeWrapper) {
  envelopeWrapper.addEventListener('click', openLetter);
}
if (btnCloseLetter) {
  btnCloseLetter.addEventListener('click', closeLetter);
}
if (btnCloseLetterBottom) {
  btnCloseLetterBottom.addEventListener('click', closeLetter);
}
if (letterModal) {
  letterModal.addEventListener('click', (e) => {
    if (e.target === letterModal) {
      closeLetter();
    }
  });
}


// ==========================================
// 6. PHOTO LIGHTBOX MODAL
// ==========================================
const photoCards = document.querySelectorAll('.polaroid-card');
const photoModal = document.getElementById('photo-modal');
const photoModalImg = document.getElementById('photo-modal-img');
const photoModalCaption = document.getElementById('photo-modal-caption');
const btnClosePhoto = document.getElementById('btn-close-photo');

function openPhotoModal(imgSrc, caption = '') {
  try { sfx.playPop(); } catch (e) {}
  if (!photoModal || !photoModalImg) return;
  
  photoModalImg.src = imgSrc;
  if (photoModalCaption) {
    photoModalCaption.textContent = caption;
    if (caption) {
      photoModalCaption.classList.remove('hidden');
    } else {
      photoModalCaption.classList.add('hidden');
    }
  }

  photoModal.classList.remove('hidden');
  photoModal.classList.add('flex');
  photoModal.style.display = 'flex';
}

function closePhotoModal() {
  if (!photoModal) return;
  photoModal.classList.add('hidden');
  photoModal.classList.remove('flex');
  photoModal.style.display = 'none';
}

photoCards.forEach(card => {
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    const img = card.querySelector('img');
    const caption = card.getAttribute('data-caption') || '';
    if (img) {
      openPhotoModal(img.currentSrc || img.src, caption);
    }
  });
});

if (btnClosePhoto) {
  btnClosePhoto.addEventListener('click', (e) => {
    e.stopPropagation();
    closePhotoModal();
  });
}

if (photoModal) {
  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal || e.target.id === 'photo-modal') {
      closePhotoModal();
    }
  });
}

// Close with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePhotoModal();
  }
});

// Initial setup
window.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
});
