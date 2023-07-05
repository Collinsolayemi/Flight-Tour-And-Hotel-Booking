export declare class MailService {
    private transporter;
    constructor();
    send(options: {
        to: string;
        subject: string;
        text: string;
    }): Promise<boolean>;
}
