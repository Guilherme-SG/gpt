export interface UseCase {
    execute<ReturnType>(...args: any[]): Promise<ReturnType>;
}