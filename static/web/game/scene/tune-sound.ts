import {Dictionary, ISound} from "./sound"
import * as Tune from "tune"
import * as Tone from "tone"
import {config} from "../../config/config"

const BASE_NOTE = 'C4'
const BASE_NOTE_PATH = '/c4.mp3'
const MINIMUM_PLAY_LENGTH = 200;

export class TuneSound implements ISound {

    // TODO: Tune type
    tune: any
    // TODO: piano type
    pianos: Dictionary<any> = {};
    context: AudioContext

    notes: any = {};

    constructor() {
        this.tune = new Tune()
        this.tune.loadScale(config.s_tuneScale)
        this.tune.mode.output = 'MIDI'

        for (let note = 1; note < 139; note++) {
            this.pianos[note] = new Tone.Sampler({
                [BASE_NOTE]: BASE_NOTE_PATH
            })
            this.pianos[note].toMaster()
            this.pianos[note].pitch = this.tune.note(note - this.tune.scale.length) - this.tune.key
        }
        this.context = new AudioContext()
    }

    start(id: number, velocity?: number): void {
        if (this.pianos[id]) {
            this.pianos[id].triggerAttack(BASE_NOTE, null, velocity/100)
            window.clearTimeout(this.pianos[id].timeout)
        }
    }

    stop(id: number, velocity?: number): void {
        if (this.pianos[id]) {
            const playLength = (Date.now() - this.notes[id]) > MINIMUM_PLAY_LENGTH ? 0 : MINIMUM_PLAY_LENGTH
            this.pianos[id].timeout = setTimeout(() => this.pianos[id].triggerRelease(), playLength)
        }
    }

    stop_all(): void {
        for (let note in this.pianos) {
            this.pianos[note].triggerRelease();
        }
    }

    pause() {
        this.context.suspend();
    }

    resume() {
        this.context.suspend();
    }


}
