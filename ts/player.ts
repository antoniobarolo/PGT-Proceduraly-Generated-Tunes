class Player {
	private nextTime: number;

	public constructor() {
		this.nextTime = -1;
	}

	public playSample(sample: AudioBuffer, time: number): void {
		const source = audioContext.createBufferSource();
		source.buffer = sample;
		source.connect(audioContext.destination);
		source.start(time);
	}

	public playSession(session: Session): void {
		const currentTime = audioContext.currentTime;

		if (this.nextTime < 0)
			audioContext.resume().catch(console.error);

		const startTime = ((this.nextTime < currentTime) ? (currentTime + 0.075) : this.nextTime);

		this.nextTime = startTime + session.duration;

		session.play(this, startTime);
	}
}