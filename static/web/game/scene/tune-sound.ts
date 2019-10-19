import { ISound } from "./sound";
import * as Tune from "tune";
import * as Tone from "tone";
import { config } from "../../config/config"

const BASE_NOTE = 'C4';
const BASE_NOTE_PATH = '/c4.mp3';

export class TuneSound implements ISound {

  // TODO: Tune type
  tune: any;
  // TODO: Tone type
  piano: any;
  context: AudioContext;

  constructor() {
        this.tune = new Tune();
        this.tune.loadScale(config.s_tuneScale);
        this.tune.mode.output = 'MIDI';
        this.piano = new Tone.Sampler({
          [BASE_NOTE]: BASE_NOTE_PATH
        });
        this.piano.toMaster();
        this.context = new AudioContext();
  }

  start(id: number): void {
    if (id) {
      this.piano.triggerAttack(BASE_NOTE);
      this.piano.pitch = this.tune.note(id-this.tune.scale.length)-this.tune.key;
    }
  }

  stop(id: number): void {
    // TODO: implement stop
  }

  stop_all(): void {
    // TODO: implement stop all
  }


}
