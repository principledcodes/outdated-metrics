import Progress from 'cli-progress'

export class ProgressBar {
  bar: Progress.SingleBar | null

  constructor (silent = false) {
    this.bar = !silent
      ? new Progress.SingleBar({}, Progress.Presets.shades_classic)
      : null
  }

  start (total: number, startValue: number): void {
    this.bar?.start(total, startValue)
  }

  increment (step?: number): void {
    this.bar?.increment(step)
  }

  stop (): void {
    this.bar?.stop()
  }
}
