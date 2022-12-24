interface Error {
    name: string,
    message: string,
    stack?: string
}

class ErrorHandler extends Error{
    statusCode: any;
    constructor(message: string,statusCode: number){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

export default ErrorHandler