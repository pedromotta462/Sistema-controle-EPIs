export class SendMailerDto {
    readonly from?: string;
    readonly to: string[];
    readonly subject: string;
    readonly html: string;
    readonly text?: string;
}

export class SendMailerSupportDto {
    readonly from?: string;
    readonly subject: string;
    readonly text: string;
}
