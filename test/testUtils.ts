import { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from 'http';
import { Socket } from 'net';
import { Readable, Writable } from 'stream';

export class MockReq extends Readable implements IncomingMessage {

    constructor(public httpVersion: string = '2',
                public httpVersionMajor: number = 2,
                public httpVersionMinor: number = 2,
                public connection: any = {},
                public headers: any = {},
                public rawHeaders: string[] = ['headers'],
                public trailers: any = {},
                public rawTrailers: any = {},
                public method: string = 'GET',
                public url: string = 'url',
                public socket: any = {}) {
        super();
    }

    public setTimeout(msecs: number, callback: () => void): any {
        return 1;
    }

    public destroy(error?: Error): void {
        return;
    }
}

export class MockRes extends Writable implements ServerResponse {
    protected data: any;
    protected headers: any;
    constructor(public statusCode: number = 200,
                public statusMessage: string = 'ok',
                public headersSent: boolean = false,
                public sendDate: boolean = true,
                public finished: boolean = false,
                public upgrading: boolean = false,
                public chunkedEncoding: boolean = false,
                public shouldKeepAlive: boolean = false,
                public useChunkedEncodingByDefault: boolean = false,
                public connection: Socket = null) {
        super();
        this.data = '';
        this.headers = {};
    }

    // Extended base methods
    public writeContinue(): void {
        return;
    }

    public assignSocket(socket: Socket): void {
        return;
    }

    public detachSocket(socket: Socket): void {
        return;
    }

    public write(data: any, encoding?: any, cb?: any): boolean {
        this.data = data;
        return true;
    }

    public writeHead(statusCode: number, reasonPhrase?: any, headers?: any): void {
        return;
    }

    public setHeader(name: string, value: string | string[]): void {
        this.headers[name] = value;
        return;
    }
    public setTimeout(msecs: number, callback: () => void): this {
        return this;
    }

    public getHeader(name: string): any {
        return this.headers[name];
    }

    public getHeaders(): OutgoingHttpHeaders {
        return {};
    }

    public getHeaderNames(): string[] {
        return [''];
    }

    public hasHeader(name: string): boolean {
        return true;
    }

    public flushHeaders(): void {
        return;
    }

    public removeHeader(name: string): void {
        return;
    }
    public addTrailers(headers: any): void {
        return;
    }

    // Extended base methods
    public end(data?: any, encoding?: string | any, cb?: () => void): void {
        if (data) {
            this.write(data);
        }
        this.finished = true;
        return;
    }
}
