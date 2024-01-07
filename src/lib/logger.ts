export class Logger
{
    constructor(private readonly prefix: string) {}

    info(message: string, data: any = null)
    {
        const t = this.timestamp();

        if(data)
            console.log(`[${t}] ${this.prefix}: ${message}`, data);
        else
            console.log(`[${t}] ${this.prefix}: ${message}`);
    
    }

    timestamp()
    {
        const d = new Date();
        return d.toTimeString().split(' ')[0];
    }
}