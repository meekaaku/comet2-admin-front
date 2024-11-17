class Logger {
	constructor(private readonly prefix: string) {}

	info(message: string, data: any = null) {
		this.message('info', message, data);
	}

	error(message: string, data: any = null) {
		this.message('error', message, data);
	}

	message(type: string, message: string, data: any = null) {
		const t = this.timestamp();
		const fn = type === 'error' ? console.error : console.log;

		if (data) fn(`[${t}] ${this.prefix}: ${message}`, data);
		else fn(`[${t}] ${this.prefix}: ${message}`);
	}

	timestamp() {
		const d = new Date();
		return d.toTimeString().split(' ')[0];
	}
}

export const logger = new Logger('[ comet ]');
