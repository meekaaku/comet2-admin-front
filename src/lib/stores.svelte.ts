class Loader {
    loading: boolean = $state(false);
    startedByNavigating: boolean = $state(false);
    progress: number = $state(0);
    progressTimer: any = null;


    start(startedByNavigating: boolean = false) {
        this.startedByNavigating = startedByNavigating;
        if(this.loading) return;

        this.loading = true;
        this.progress = 0;
        this.progressTimer = setInterval(() => {
            // Slow down progress as it gets closer to 100
            const increment = Math.max(0.1, (100 - this.progress) / 20);
            this.progress += increment;
            if (this.progress >= 100) {
                this.progress = 0;
            }
        }, 100);
    }

    stop(startedByNavigating: boolean = false) {
        if(this.startedByNavigating != startedByNavigating) {
            return;
        }

        this.progress = 100;
        if(this.progressTimer){
            clearInterval(this.progressTimer);
            this.progressTimer = null;
            setTimeout(() => {
                this.progress = 0;
                this.loading = false;
            }, 500);
        }
    }
}

export const loader = new Loader();
