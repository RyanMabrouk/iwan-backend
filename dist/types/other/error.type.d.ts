export interface IError {
    message: string;
    detail: string;
    type: string;
    timestamp: number;
    errors?: IValidationErrors;
}
export interface IValidationErrors {
    [key: string]: string[];
}
