export class ApiResponse {
    constructor(error = false, responseData = null, statusCode = null) {
      this.error = error;
      this.responseData = responseData;
      this.statusCode = statusCode;
    }
  }