export declare class TwilioService {
    private readonly client;
    constructor();
    sendVerificationCode(phoneNumber: string, code: string): Promise<void>;
}
