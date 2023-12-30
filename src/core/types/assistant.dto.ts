// Input type for investor endpoint
export type InvestorDto = {
    content: string;
    threadId?: string;
    fileIds?: string[];
}