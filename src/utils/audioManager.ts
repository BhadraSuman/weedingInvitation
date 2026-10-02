// Ambient Cultural Audio Engine
// Supports dynamic MP3 track per template with Web Audio acoustic synthesizer fallback

export interface AudioTrackInfo {
  title: string;
  artist: string;
  url: string;
  theme?: string;
}

class WeddingAudioManager {
  private audioCtx: AudioContext | null = null;
  private isSynthesizing = false;
  private intervalId: number | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private listeners: ((playing: boolean, title: string) => void)[] = [];
  
  private currentTrack: AudioTrackInfo = {
    title: 'Auspicious Shehnai Melody',
    artist: 'Traditional Raag Bhairavi',
    url: 'https://amantrran.com/wp-content/uploads/2024/12/Tum-Prem-Ho-Reprise-Lyrical-Video-RadhaKrishn-MOhit-Lalwani-Surya-Raj-Kamal-Bharat-Kamal.mp3',
    theme: 'bengali'
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioEl(this.currentTrack.url);
      window.addEventListener('pagehide', () => this.stop());
      window.addEventListener('beforeunload', () => this.stop());
    }
  }

  private initAudioEl(url: string) {
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.src = '';
    }
    this.audioEl = new Audio(url);
    this.audioEl.loop = true;
    this.audioEl.preload = 'auto';

    this.audioEl.addEventListener('play', () => this.notify(true));
    this.audioEl.addEventListener('pause', () => this.notify(false));
    this.audioEl.addEventListener('ended', () => this.notify(false));
  }

  public setTrack(track: AudioTrackInfo, templateId?: string) {
    const theme = templateId || track.theme || 'bengali';
    const hasChanged = this.currentTrack.url !== track.url || this.currentTrack.theme !== theme;

    this.currentTrack = {
      ...track,
      theme
    };

    if (hasChanged && typeof window !== 'undefined') {
      const wasPlaying = this.isPlaying();
      this.initAudioEl(track.url);
      if (wasPlaying) {
        this.play().catch(() => {});
      }
    }
    this.notify(this.isPlaying());
  }

  public getTrack(): AudioTrackInfo {
    return this.currentTrack;
  }

  public subscribe(cb: (playing: boolean, title: string) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify(playing: boolean) {
    this.listeners.forEach(cb => cb(playing, this.currentTrack.title));
  }

  public async play(): Promise<boolean> {
    try {
      if (this.audioEl) {
        this.audioEl.volume = 0.6;
        await this.audioEl.play();
        return true;
      }
    } catch {
      // If external MP3 is blocked by browser policies or network, start tailored Web Audio synthesizer
      this.startAmbientThemeDrone(this.currentTrack.theme || 'bengali');
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

  public stop() {
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
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

  // Tailored Web Audio Synthesizer per cultural theme
  private startAmbientThemeDrone(theme: string) {
    if (this.isSynthesizing) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      this.isSynthesizing = true;
      this.notify(true);

      if (theme === 'birthday') {
        // Playful Music Box Chimes (C major arpeggios: C5, E5, G5, A5, C6)
        const notes = [523.25, 659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25];
        let idx = 0;
        const playChime = () => {
          if (!this.audioCtx || !this.isSynthesizing) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(notes[idx % notes.length], this.audioCtx.currentTime);
          idx++;

          gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.09, this.audioCtx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.4);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start();
          osc.stop(this.audioCtx.currentTime + 1.4);
        };
        playChime();
        this.intervalId = window.setInterval(playChime, 650);
      } else if (theme === 'annaprashan') {
        // Sweet Bansuri Flute Lullaby (Raag Desh / Pahadi: D4, F#4, A4, B4, D5)
        const notes = [293.66, 369.99, 440.00, 493.88, 587.33, 493.88];
        let idx = 0;
        const playFlute = () => {
          if (!this.audioCtx || !this.isSynthesizing) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[idx % notes.length], this.audioCtx.currentTime);
          idx++;

          gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.07, this.audioCtx.currentTime + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 3.2);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start();
          osc.stop(this.audioCtx.currentTime + 3.2);
        };
        playFlute();
        this.intervalId = window.setInterval(playFlute, 1800);
      } else if (theme === 'rangla_punjab') {
        // High-Energy 128 BPM Punjabi Dhol Beat (Dha-Ge-Na-Tin-Na)
        // Bass dhol boom (55 Hz - 110 Hz) with treble stick snap (440 Hz)
        let beatStep = 0;
        const playDhol = () => {
          if (!this.audioCtx || !this.isSynthesizing) return;
          const t = this.audioCtx.currentTime;

          // Bass Dhol Drum
          const bassOsc = this.audioCtx.createOscillator();
          const bassGain = this.audioCtx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(beatStep % 2 === 0 ? 82.41 : 65.41, t);
          bassOsc.frequency.exponentialRampToValueAtTime(38, t + 0.22);
          bassGain.gain.setValueAtTime(0.18, t);
          bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
          bassOsc.connect(bassGain);
          bassGain.connect(this.audioCtx.destination);
          bassOsc.start(t);
          bassOsc.stop(t + 0.25);

          // Treble Tilli Snap (on offbeats)
          if (beatStep % 2 !== 0 || beatStep === 3) {
            const snapOsc = this.audioCtx.createOscillator();
            const snapGain = this.audioCtx.createGain();
            snapOsc.type = 'square';
            snapOsc.frequency.setValueAtTime(340, t);
            snapOsc.frequency.exponentialRampToValueAtTime(140, t + 0.08);
            snapGain.gain.setValueAtTime(0.08, t);
            snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
            snapOsc.connect(snapGain);
            snapGain.connect(this.audioCtx.destination);
            snapOsc.start(t);
            snapOsc.stop(t + 0.09);
          }

          beatStep = (beatStep + 1) % 4;
        };
        playDhol();
        // 128 BPM is ~468ms per beat, quarter subdivisions ~234ms
        this.intervalId = window.setInterval(playDhol, 234);
      } else if (theme === 'shola') {
        // Santiniketan Meditative Esraj & Sitar Drone (Raag Bhairav / Bilawal in D & A)
        const strings = [293.66, 440.00, 587.33, 659.25, 880.00];
        let idx = 0;
        const playEsraj = () => {
          if (!this.audioCtx || !this.isSynthesizing) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(strings[idx % strings.length], this.audioCtx.currentTime);
          idx++;

          // Warm bowed acoustic filter
          const filter = this.audioCtx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(750, this.audioCtx.currentTime);

          gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.06, this.audioCtx.currentTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0005, this.audioCtx.currentTime + 4.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start();
          osc.stop(this.audioCtx.currentTime + 4.8);
        };
        playEsraj();
        this.intervalId = window.setInterval(playEsraj, 2800);
      } else if (theme === 'pot_katha') {
        // Earthen Folk Baul Dotara & Banshi Plucks (F, G, C, D)
        const dotaraPitches = [174.61, 196.00, 261.63, 293.66, 349.23];
        let dotaraIdx = 0;
        const playDotara = () => {
          if (!this.audioCtx || !this.isSynthesizing) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(dotaraPitches[dotaraIdx % dotaraPitches.length], this.audioCtx.currentTime);
          dotaraIdx++;

          gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start();
          osc.stop(this.audioCtx.currentTime + 1.2);
        };
        playDotara();
        this.intervalId = window.setInterval(playDotara, 850);
      } else if (theme === 'wedding_gazette') {
        // Vintage Gramophone Santoor & Warm Piano arpeggios
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
        let gIdx = 0;
        const playSantoor = () => {
          if (!this.audioCtx || !this.isSynthesizing) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[gIdx % notes.length], this.audioCtx.currentTime);
          gIdx++;

          gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0005, this.audioCtx.currentTime + 1.8);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start();
          osc.stop(this.audioCtx.currentTime + 1.8);
        };
        playSantoor();
        this.intervalId = window.setInterval(playSantoor, 1200);
      } else if (theme === 'vivah_express') {
        // Melodic Indian Railway Station Chime (E - G# - B - E chime)
        const chimeNotes = [329.63, 415.30, 493.88, 659.25];
        let cIdx = 0;
        const playChime = () => {
          if (!this.audioCtx || !this.isSynthesizing) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(chimeNotes[cIdx % chimeNotes.length], this.audioCtx.currentTime);
          cIdx++;

          gain.gain.setValueAtTime(0.09, this.audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0008, this.audioCtx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start();
          osc.stop(this.audioCtx.currentTime + 1.2);
        };
        playChime();
        this.intervalId = window.setInterval(playChime, 1400);
      } else {
        // Traditional Raag Bhairavi Shehnai & Tanpura Drone (C, E, G, B, D)
        const frequencies = [261.63, 329.63, 392.00, 493.88, 523.25, 587.33];
        let noteIndex = 0;
        const playDrone = () => {
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
        playDrone();
        this.intervalId = window.setInterval(playDrone, 2600);
      }
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
