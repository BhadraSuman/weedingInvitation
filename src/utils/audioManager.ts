// Ambient Cultural Audio Engine
// Provides high-fidelity procedural Web Audio acoustic synthesizers per cultural template
// with seamless support for custom uploaded MP3 audio tracks.

export interface AudioTrackInfo {
  title: string;
  artist: string;
  url: string;
  theme?: string;
}

const GENERIC_PLACEHOLDER_MARKER = 'amantrran.com';

class WeddingAudioManager {
  private audioCtx: AudioContext | null = null;
  private isSynthesizing = false;
  private intervalIds: number[] = [];
  private audioEl: HTMLAudioElement | null = null;
  private listeners: ((playing: boolean, title: string) => void)[] = [];
  private bollywoodSubtrack: string = '01';
  
  private currentTrack: AudioTrackInfo = {
    title: 'Auspicious Shehnai Melody',
    artist: 'Traditional Raag Bhairavi',
    url: 'https://amantrran.com/wp-content/uploads/2024/12/Tum-Prem-Ho-Reprise-Lyrical-Video-RadhaKrishn-MOhit-Lalwani-Surya-Raj-Kamal-Bharat-Kamal.mp3',
    theme: 'bengali'
  };

  constructor() {
    if (typeof window !== 'undefined') {
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
    const isNewTheme = this.currentTrack.theme !== theme;
    const isNewUrl = this.currentTrack.url !== track.url;

    this.currentTrack = {
      ...track,
      theme
    };

    if ((isNewTheme || isNewUrl) && typeof window !== 'undefined') {
      const wasPlaying = this.isPlaying();
      this.stop();

      // Only initialize HTMLAudioElement if a genuine unique custom URL is provided
      if (track.url && !track.url.includes(GENERIC_PLACEHOLDER_MARKER)) {
        this.initAudioEl(track.url);
      } else {
        this.audioEl = null;
      }

      if (wasPlaying) {
        this.play().catch(() => {});
      }
    }
    this.notify(this.isPlaying());
  }

  public setBollywoodSubtrack(subtrackId: string) {
    this.bollywoodSubtrack = subtrackId;
    if (this.isPlaying() && (this.currentTrack.theme === 'bollywood_premiere' || !this.audioEl)) {
      this.stopAmbientDrone();
      this.startAmbientThemeDrone('bollywood_premiere');
    }
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

  private getAudioContext(): AudioContext {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public async play(): Promise<boolean> {
    const hasCustomUniqueUrl = this.currentTrack.url && 
      !this.currentTrack.url.includes(GENERIC_PLACEHOLDER_MARKER) &&
      this.currentTrack.url.trim().length > 0;

    if (hasCustomUniqueUrl) {
      try {
        if (!this.audioEl) {
          this.initAudioEl(this.currentTrack.url);
        }
        if (this.audioEl) {
          this.audioEl.volume = 0.6;
          await this.audioEl.play();
          this.stopAmbientDrone();
          this.notify(true);
          return true;
        }
      } catch {
        // Fall back to dedicated procedural synthesizer if custom URL fails to load
      }
    }

    // Direct authentic regional procedural soundscape
    this.startAmbientThemeDrone(this.currentTrack.theme || 'bengali');
    return true;
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

  // Clear all running interval loops
  private clearIntervals() {
    this.intervalIds.forEach(id => clearInterval(id));
    this.intervalIds = [];
  }

  private registerInterval(fn: () => void, ms: number) {
    if (typeof window === 'undefined') return;
    const id = window.setInterval(fn, ms);
    this.intervalIds.push(id);
  }

  // --- PROCEDURAL ACOUSTIC SOUNDSCAPES PER CULTURAL THEME ---
  private startAmbientThemeDrone(theme: string) {
    if (this.isSynthesizing) return;
    try {
      const ctx = this.getAudioContext();
      this.isSynthesizing = true;
      this.notify(true);

      if (theme === 'rangla_punjab') {
        // ----------------------------------------------------
        // 1. RANGLA PUNJAB: High-Energy 128 BPM Bhangra Dhol & Tumbi Riff
        // ----------------------------------------------------
        let beat = 0;
        const tumbiNotes = [329.63, 392.0, 440.0, 493.88, 659.25, 493.88, 440.0, 392.0];
        let tumbiIdx = 0;

        const playPunjabStep = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;

          // Bass Dhol Dagga (beats 0 and 2)
          if (beat === 0 || beat === 2) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            const startFreq = beat === 0 ? 82.41 : 65.41;
            osc.frequency.setValueAtTime(startFreq, t);
            osc.frequency.exponentialRampToValueAtTime(32, t + 0.28);

            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.28);
          }

          // Treble Tilli Stick Slap (beats 1, 3, and offbeats)
          if (beat % 2 !== 0 || beat === 3) {
            const snap = ctx.createOscillator();
            const snapGain = ctx.createGain();
            snap.type = 'triangle';
            snap.frequency.setValueAtTime(420, t);
            snap.frequency.exponentialRampToValueAtTime(140, t + 0.08);

            snapGain.gain.setValueAtTime(0.12, t);
            snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

            snap.connect(snapGain);
            snapGain.connect(ctx.destination);
            snap.start(t);
            snap.stop(t + 0.08);
          }

          // Iconic Punjabi Tumbi High Pluck Riff
          if (beat === 0 || beat === 2) {
            const tumbi = ctx.createOscillator();
            const tumbiGain = ctx.createGain();
            tumbi.type = 'sawtooth';
            tumbi.frequency.setValueAtTime(tumbiNotes[tumbiIdx % tumbiNotes.length], t);
            tumbiIdx++;

            const bandpass = ctx.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.setValueAtTime(900, t);
            bandpass.Q.setValueAtTime(4.0, t);

            tumbiGain.gain.setValueAtTime(0.14, t);
            tumbiGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

            tumbi.connect(bandpass);
            bandpass.connect(tumbiGain);
            tumbiGain.connect(ctx.destination);
            tumbi.start(t);
            tumbi.stop(t + 0.18);
          }

          beat = (beat + 1) % 4;
        };

        playPunjabStep();
        this.registerInterval(playPunjabStep, 234); // ~128 BPM quarter subdivisions
      } else if (theme === 'shola') {
        // ----------------------------------------------------
        // 2. SHOLA: 100% Pure Bengali Santiniketan Esraj & Tanpura Classical Drone
        // ----------------------------------------------------
        // Warm Tanpura Drone (Pa - Sa in D)
        const playTanpuraPaSa = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const dronePitches = [196.0, 261.63, 293.66]; // G3, C4, D4
          dronePitches.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, t);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(550, t);

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.03, t + 1.5 + i * 0.4);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 5.5);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(t);
            osc.stop(t + 5.5);
          });
        };
        playTanpuraPaSa();
        this.registerInterval(playTanpuraPaSa, 4800);

        // Santiniketan Esraj Bowed Melody (Raag Bilawal / Bhairav notes)
        const esrajNotes = [293.66, 369.99, 440.0, 493.88, 587.33, 493.88, 440.0];
        let esrajIdx = 0;
        const playEsrajPhrase = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(esrajNotes[esrajIdx % esrajNotes.length], t);
          esrajIdx++;

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, t);
          filter.Q.setValueAtTime(2.0, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.08, t + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 3.2);
        };
        playEsrajPhrase();
        this.registerInterval(playEsrajPhrase, 2600);
      } else if (theme === 'pot_katha') {
        // ----------------------------------------------------
        // 3. POT KATHA: Earthen Kalighat Baul Dotara, Khol & Flute
        // ----------------------------------------------------
        const dotaraFrems = [174.61, 261.63, 349.23, 261.63, 392.0, 349.23];
        let dotaraIdx = 0;
        const playBaulPattern = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;

          // Acoustic Dotara Pluck
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(dotaraFrems[dotaraIdx % dotaraFrems.length], t);
          dotaraIdx++;

          gain.gain.setValueAtTime(0.14, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.38);

          // Earthen Clay Khol Drum Accent on alternate beats
          if (dotaraIdx % 2 === 0) {
            const khol = ctx.createOscillator();
            const kholGain = ctx.createGain();
            khol.type = 'sine';
            khol.frequency.setValueAtTime(120, t);
            khol.frequency.exponentialRampToValueAtTime(45, t + 0.22);
            kholGain.gain.setValueAtTime(0.16, t);
            kholGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

            khol.connect(kholGain);
            kholGain.connect(ctx.destination);
            khol.start(t);
            khol.stop(t + 0.22);
          }
        };
        playBaulPattern();
        this.registerInterval(playBaulPattern, 420);
      } else if (theme === 'mithila') {
        // ----------------------------------------------------
        // 4. MITHILA: Maithili Vivah Geet Shehnai & Dholak
        // ----------------------------------------------------
        const maithiliNotes = [329.63, 392.0, 440.0, 523.25, 587.33, 523.25, 440.0];
        let mIdx = 0;
        const playMithilaShehnai = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const bandpass = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(maithiliNotes[mIdx % maithiliNotes.length], t);
          mIdx++;

          // Reedy Shehnai Timbre
          bandpass.type = 'bandpass';
          bandpass.frequency.setValueAtTime(1100, t);
          bandpass.Q.setValueAtTime(3.5, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.12, t + 0.35);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

          osc.connect(bandpass);
          bandpass.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 1.8);
        };
        playMithilaShehnai();
        this.registerInterval(playMithilaShehnai, 1500);
      } else if (theme === 'wedding_gazette') {
        // ----------------------------------------------------
        // 5. THE WEDDING GAZETTE: 1920s Broadsheet Vintage Gramophone & Santoor
        // ----------------------------------------------------
        const santoorNotes = [261.63, 329.63, 392.0, 523.25, 659.25, 523.25, 392.0];
        let gIdx = 0;
        const playSantoor = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(santoorNotes[gIdx % santoorNotes.length], t);
          gIdx++;

          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.0005, t + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 1.2);
        };
        playSantoor();
        this.registerInterval(playSantoor, 750);
      } else if (theme === 'bollywood_premiere') {
        // ----------------------------------------------------
        // 6. BOLLYWOOD PREMIERE: Grand Cinema Sangeet Score & Jukebox Rhythms
        // ----------------------------------------------------
        let bStep = 0;
        const sangeetBassNotes = [110.0, 130.81, 146.83, 164.81]; // A2, C3, D3, E3
        const leadNotes = [440.0, 523.25, 659.25, 587.33, 523.25];

        const playBollywoodScore = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;

          // Sangeet Punchy Bass Synth
          const bass = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bass.type = 'sawtooth';
          bass.frequency.setValueAtTime(sangeetBassNotes[bStep % sangeetBassNotes.length], t);

          const bassFilter = ctx.createBiquadFilter();
          bassFilter.type = 'lowpass';
          bassFilter.frequency.setValueAtTime(380, t);

          bassGain.gain.setValueAtTime(0.18, t);
          bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

          bass.connect(bassFilter);
          bassFilter.connect(bassGain);
          bassGain.connect(ctx.destination);
          bass.start(t);
          bass.stop(t + 0.24);

          // Lead Sangeet Hook
          if (bStep === 0 || bStep === 2) {
            const lead = ctx.createOscillator();
            const leadGain = ctx.createGain();
            lead.type = 'triangle';
            lead.frequency.setValueAtTime(leadNotes[(bStep + Math.floor(Math.random() * 2)) % leadNotes.length], t);

            leadGain.gain.setValueAtTime(0.12, t);
            leadGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

            lead.connect(leadGain);
            leadGain.connect(ctx.destination);
            lead.start(t);
            lead.stop(t + 0.45);
          }

          bStep = (bStep + 1) % 4;
        };
        playBollywoodScore();
        this.registerInterval(playBollywoodScore, 260); // 115-120 BPM Sangeet tempo
      } else if (theme === 'vivah_express') {
        // ----------------------------------------------------
        // 7. VIVAH EXPRESS: Indian Railways Melodic Chime & Train Rhythm
        // ----------------------------------------------------
        const chimeNotes = [329.63, 415.3, 493.88, 659.25]; // E4, G#4, B4, E5
        let cIdx = 0;
        const playStationChime = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(chimeNotes[cIdx % chimeNotes.length], t);
          cIdx++;

          gain.gain.setValueAtTime(0.16, t);
          gain.gain.exponentialRampToValueAtTime(0.0005, t + 1.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 1.4);
        };
        playStationChime();
        this.registerInterval(playStationChime, 850);
      } else if (theme === 'bengali') {
        // ----------------------------------------------------
        // 8. BENGALI: Auspicious Subho Bibaha Conch Shell (Shankh) & Shehnai
        // ----------------------------------------------------
        // Sacred Conch Shell (Shankh) Resonance (played every 8 seconds)
        const playShankh = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(240, t);
          osc.frequency.linearRampToValueAtTime(320, t + 1.2);
          osc.frequency.linearRampToValueAtTime(290, t + 2.8);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(650, t);
          filter.Q.setValueAtTime(4.0, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.14, t + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 3.0);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 3.0);
        };
        playShankh();
        this.registerInterval(playShankh, 7500);

        // Raag Bhairavi Shehnai wedding phrases
        const bhairaviNotes = [261.63, 277.18, 329.63, 349.23, 392.0, 415.3, 493.88, 523.25];
        let bIdx = 0;
        const playBengaliShehnai = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const bandpass = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(bhairaviNotes[bIdx % bhairaviNotes.length], t);
          bIdx++;

          bandpass.type = 'bandpass';
          bandpass.frequency.setValueAtTime(1050, t);
          bandpass.Q.setValueAtTime(3.0, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.09, t + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0005, t + 2.2);

          osc.connect(bandpass);
          bandpass.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 2.2);
        };
        playBengaliShehnai();
        this.registerInterval(playBengaliShehnai, 1900);
      } else if (theme === 'annaprashan') {
        // ----------------------------------------------------
        // 9. ANNAPRASHAN: Sweet Mukhe Bhaat Bansuri Flute Lullaby
        // ----------------------------------------------------
        const fluteNotes = [293.66, 369.99, 440.0, 493.88, 587.33, 493.88];
        let fIdx = 0;
        const playFlute = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(fluteNotes[fIdx % fluteNotes.length], t);
          fIdx++;

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.08, t + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 2.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 2.8);
        };
        playFlute();
        this.registerInterval(playFlute, 1700);
      } else if (theme === 'birthday') {
        // ----------------------------------------------------
        // 10. BIRTHDAY: Sparkling Celebration Music Box Bells
        // ----------------------------------------------------
        // "Happy Birthday To You" motif: G4, G4, A4, G4, C5, B4
        const bdayMelody = [392.0, 392.0, 440.0, 392.0, 523.25, 493.88, 392.0, 392.0, 440.0, 392.0, 587.33, 523.25];
        let bdayIdx = 0;
        const playMusicBox = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(bdayMelody[bdayIdx % bdayMelody.length], t);
          bdayIdx++;

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.11, t + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 1.2);
        };
        playMusicBox();
        this.registerInterval(playMusicBox, 500);
      } else if (theme === 'chibi_3d') {
        // ----------------------------------------------------
        // 11. CHIBI 3D: Upbeat Acoustic Ukulele & Wooden Marimba Pop
        // ----------------------------------------------------
        const ukeChords = [523.25, 659.25, 783.99, 880.0, 783.99, 659.25];
        let uIdx = 0;
        const playUkulele = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(ukeChords[uIdx % ukeChords.length], t);
          uIdx++;

          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.32);
        };
        playUkulele();
        this.registerInterval(playUkulele, 320);
      } else if (theme === 'south_indian') {
        // ----------------------------------------------------
        // 12. SOUTH INDIAN: Nadaswaram & Thavil Kalyana Melam
        // ----------------------------------------------------
        const nadaNotes = [440.0, 466.16, 554.37, 587.33, 659.25, 698.46, 880.0];
        let nIdx = 0;
        const playNadaswaram = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(nadaNotes[nIdx % nadaNotes.length], t);
          nIdx++;

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1400, t);
          filter.Q.setValueAtTime(4.5, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.12, t + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.65);
        };
        playNadaswaram();
        this.registerInterval(playNadaswaram, 450);
      } else {
        // ----------------------------------------------------
        // DEFAULT / BIHARI / ROYAL NORTH: Auspicious Shehnai & Tanpura Drone
        // ----------------------------------------------------
        const frequencies = [261.63, 329.63, 392.0, 493.88, 523.25, 587.33];
        let noteIndex = 0;
        const playDrone = () => {
          if (!this.isSynthesizing || !this.audioCtx) return;
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(frequencies[noteIndex % frequencies.length], t);
          noteIndex++;

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.08, t + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 3.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 3.8);
        };
        playDrone();
        this.registerInterval(playDrone, 2200);
      }
    } catch (e) {
      console.error("Web Audio synth not supported", e);
    }
  }

  private stopAmbientDrone() {
    this.isSynthesizing = false;
    this.clearIntervals();
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}

export const audioManager = new WeddingAudioManager();
