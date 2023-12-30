export interface IPage {
    goto(url: string, options?: any): Promise<any>;
    evaluate(pageFunction: Function, ...args: any[]): Promise<any>;
}

export interface IElementHandle {
    $eval(selector: string, pageFunction: Function, ...args: any[]): Promise<any>;
}

export interface BrowserService {
    launch(): Promise<void>;
    newPage(options: any): Promise<any>;
    close(): Promise<void>;
    scrollPageToBottom(page: IPage): Promise<void>;
}