// Synthesized stone-age sounds using Web Audio API — no external files needed

let audioCtx: AudioContext | null = null;

function ctx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

// --- Utility ---
function noise(duration: number, gain: number): { node: AudioBufferSourceNode; gainNode: GainNode } {
  const ac = ctx();
  const bufferSize = ac.sampleRate * duration;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const g = ac.createGain();
  g.gain.value = gain;
  src.connect(g);
  return { node: src, gainNode: g };
}

// --- Stone tap / bone click ---
export function playStoneClick() {
  const ac = ctx();
  const t = ac.currentTime;

  // Short percussive hit
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, t);
  osc.frequency.exponentialRampToValueAtTime(200, t + 0.06);

  const g = ac.createGain();
  g.gain.setValueAtTime(0.15, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.08);

  // Add a tiny noise burst for texture
  const { node: n, gainNode: ng } = noise(0.04, 0.08);
  ng.gain.setValueAtTime(0.08, t);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  ng.connect(ac.destination);
  n.start(t);
  n.stop(t + 0.04);
}

// --- Whoosh (section transition) ---
export function playWhoosh() {
  const ac = ctx();
  const t = ac.currentTime;

  const { node: n, gainNode: ng } = noise(0.5, 0.1);
  ng.gain.setValueAtTime(0.001, t);
  ng.gain.linearRampToValueAtTime(0.1, t + 0.15);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

  // Bandpass filter for "airy" whoosh
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(500, t);
  bp.frequency.exponentialRampToValueAtTime(2000, t + 0.25);
  bp.frequency.exponentialRampToValueAtTime(300, t + 0.5);
  bp.Q.value = 1.5;

  ng.connect(bp).connect(ac.destination);
  n.start(t);
  n.stop(t + 0.5);
}

// --- Fire crackling ambient loop ---
let fireInterval: ReturnType<typeof setInterval> | null = null;
let fireGain: GainNode | null = null;

export function startFireAmbient() {
  if (fireInterval) return;
  const ac = ctx();
  fireGain = ac.createGain();
  fireGain.gain.value = 0.04;
  fireGain.connect(ac.destination);

  const crackle = () => {
    const t = ac.currentTime;
    const dur = 0.02 + Math.random() * 0.06;
    const { node: n, gainNode: ng } = noise(dur, 0.03 + Math.random() * 0.04);
    ng.gain.setValueAtTime(ng.gain.value, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + dur);

    const hp = ac.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1000 + Math.random() * 3000;

    ng.connect(hp).connect(fireGain!);
    n.start(t);
    n.stop(t + dur);
  };

  // Random crackles at varying intervals
  fireInterval = setInterval(() => {
    crackle();
    // Sometimes double-crackle
    if (Math.random() > 0.6) setTimeout(crackle, 20 + Math.random() * 40);
  }, 60 + Math.random() * 120);

  // Also add a low rumble base
  const rumble = ac.createOscillator();
  rumble.type = "sawtooth";
  rumble.frequency.value = 60;
  const rg = ac.createGain();
  rg.gain.value = 0.012;
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 100;
  rumble.connect(rg).connect(lp).connect(fireGain);
  rumble.start();

  // Store for cleanup
  (fireInterval as any).__rumble = rumble;
  (fireInterval as any).__rumbleGain = rg;
}

export function stopFireAmbient() {
  if (!fireInterval) return;
  const rumble = (fireInterval as any).__rumble as OscillatorNode | undefined;
  if (rumble) {
    try { rumble.stop(); } catch {}
  }
  clearInterval(fireInterval);
  fireInterval = null;
  if (fireGain) {
    fireGain.disconnect();
    fireGain = null;
  }
}

export function isFirePlaying() {
  return fireInterval !== null;
}

// --- Mammoth stampede: deep rumbling thuds ---
export function playStampede() {
  const ac = ctx();
  const t = ac.currentTime;
  for (let i = 0; i < 8; i++) {
    const when = t + i * 0.4 + Math.random() * 0.15;
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(50 + Math.random() * 30, when);
    osc.frequency.exponentialRampToValueAtTime(25, when + 0.3);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.2, when);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.35);
    osc.connect(g).connect(ac.destination);
    osc.start(when);
    osc.stop(when + 0.35);
    // Impact noise
    const { node: n, gainNode: ng } = noise(0.08, 0.12);
    ng.gain.setValueAtTime(0.12, when);
    ng.gain.exponentialRampToValueAtTime(0.001, when + 0.08);
    ng.connect(ac.destination);
    n.start(when);
    n.stop(when + 0.08);
  }
}

// --- Fire burst: roaring flame sweep ---
export function playFireBurst() {
  const ac = ctx();
  const t = ac.currentTime;
  const { node: n, gainNode: ng } = noise(1.5, 0.15);
  ng.gain.setValueAtTime(0.001, t);
  ng.gain.linearRampToValueAtTime(0.15, t + 0.2);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(300, t);
  bp.frequency.exponentialRampToValueAtTime(3000, t + 0.3);
  bp.frequency.exponentialRampToValueAtTime(200, t + 1.5);
  bp.Q.value = 0.8;
  ng.connect(bp).connect(ac.destination);
  n.start(t);
  n.stop(t + 1.5);
}

// --- Prophecy: eerie tonal chime ---
export function playProphecy() {
  const ac = ctx();
  const t = ac.currentTime;
  const freqs = [220, 330, 440, 550];
  freqs.forEach((f, i) => {
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.value = f;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.001, t + i * 0.3);
    g.gain.linearRampToValueAtTime(0.06, t + i * 0.3 + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.3 + 2);
    osc.connect(g).connect(ac.destination);
    osc.start(t + i * 0.3);
    osc.stop(t + i * 0.3 + 2);
  });
}

// --- Ghost painting: soft ethereal wind ---
export function playGhostWind() {
  const ac = ctx();
  const t = ac.currentTime;
  const { node: n, gainNode: ng } = noise(3, 0.04);
  ng.gain.setValueAtTime(0.001, t);
  ng.gain.linearRampToValueAtTime(0.04, t + 1);
  ng.gain.linearRampToValueAtTime(0.04, t + 2);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 3);
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 600;
  ng.connect(lp).connect(ac.destination);
  n.start(t);
  n.stop(t + 3);
}

// --- War drums: rhythmic tribal beats ---
export function playWarDrums() {
  const ac = ctx();
  const t = ac.currentTime;
  const pattern = [0, 0.25, 0.5, 0.75, 1.0, 1.15, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.15, 3.5, 3.75];
  pattern.forEach((beat, i) => {
    const when = t + beat;
    const isAccent = i % 4 === 0;
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(isAccent ? 80 : 120, when);
    osc.frequency.exponentialRampToValueAtTime(40, when + 0.15);
    const g = ac.createGain();
    g.gain.setValueAtTime(isAccent ? 0.2 : 0.1, when);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.18);
    osc.connect(g).connect(ac.destination);
    osc.start(when);
    osc.stop(when + 0.18);
    // Hit noise
    const { node: n2, gainNode: ng2 } = noise(0.04, isAccent ? 0.1 : 0.05);
    ng2.gain.setValueAtTime(ng2.gain.value, when);
    ng2.gain.exponentialRampToValueAtTime(0.001, when + 0.04);
    ng2.connect(ac.destination);
    n2.start(when);
    n2.stop(when + 0.04);
  });
}

// --- Ancient credits: deep gong ---
export function playGong() {
  const ac = ctx();
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(110, t);
  osc.frequency.exponentialRampToValueAtTime(55, t + 3);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.15, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 3);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 3);
  // Shimmer overtone
  const osc2 = ac.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.value = 220;
  const g2 = ac.createGain();
  g2.gain.setValueAtTime(0.05, t);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 2);
  osc2.connect(g2).connect(ac.destination);
  osc2.start(t);
  osc2.stop(t + 2);
}
