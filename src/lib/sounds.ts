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
