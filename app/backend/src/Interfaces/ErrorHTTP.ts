import ICustomError from './ICustomError';

class ErrorHTTP extends Error implements ICustomError {
  private _statusCode?: number;
  constructor(code: number, message: string) {
    super(message);
    this._statusCode = code;
  }

  get statusCode() {
    return this._statusCode;
  }
}

export default ErrorHTTP;
