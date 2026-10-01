// Ambient Bengali Shehnai / Santoor / Flute synthesized acoustic generator
// plus external MP3 fallback

class WeddingAudioManager {
  private audioCtx: AudioContext | null = null;
  private isSynthesizing = false;
  private intervalId: number | null = null;
  private isMuted = false;
  private audioEl: HTMLAudioElement | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  constructor() {
    // Royalty-free Indian classical flute / shehnai melody URL
    this.audioEl = new Audio('https://amantrran.com/wp-content/uploads/2024/12/Tum-Prem-Ho-Reprise-Lyrical-Video-RadhaKrishn-MOhit-Lalwani-Surya-Raj-Kamal-Bharat-Kamal.mp3');
    this.audioEl.loop = true;
    this.audioEl.preload = 'auto';

    this.audioEl.addEventListener('play', () => this.notify(true));
    this.audioEl.addEventListener('pause', () => this.notify(false));
    this.audioEl.addEventListener('ended', () => this.notify(false));
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify(playing: boolean) {
    this.listeners.forEach(cb => cb(playing));
  }

  // Play audio when user opens the envelope
  public async play(): Promise<boolean> {
    try {
      if (this.audioEl) {
        this.audioEl.volume = 0.6;
        await this.audioEl.play();
        return true;
      }
    } catch {
      console.warn("External MP3 blocked or failed, falling back to Web Audio soothing synthesizer.");
      this.startAmbientDrone();
      return true;
    }
    return false;
  }

  public pause() {
    if (this.audioEl && !this.audioEl.paused) {
      this.audioEl.pause();
    }
    this.stopAmbientDrone();
    this.notify(false);
  }

  public toggle(): boolean {
    if (this.isPlaying()) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public isPlaying(): boolean {
    if (this.audioEl && !this.audioEl.paused) return true;
    return this.isSynthesizing;
  }

  // Fallback Web Audio API synthesizer for serene Raag Bhairav / Yaman drone
  private startAmbientDrone() {
    if (this.isSynthesizing) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      this.isSynthesizing = true;
      this.notify(true);

      // Play soft Tanpura / Flute pentatonic notes in Raag Yaman: C, E, G, B, D
      const frequencies = [261.63, 329.63, 392.00, 493.88, 523.25, 587.33];
      let noteIndex = 0;

      const playNote = () => {
        if (!this.audioCtx || !this.isSynthesizing) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequencies[noteIndex % frequencies.length], this.audioCtx.currentTime);
        noteIndex++;

        gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, this.audioCtx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 4.5);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 4.5);
      };

      playNote();
      this.intervalId = window.setInterval(playNote, 2800);
    } catch (e) {
      console.error("Web Audio synth not supported", e);
    }
  }

  private stopAmbientDrone() {
    this.isSynthesizing = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}

export const audioManager = new WeddingAudioManager();
