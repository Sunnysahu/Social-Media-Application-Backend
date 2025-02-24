class apiError {
  constructor(statusCode, error = [], message = "Something went wrong!!!") {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }
}
class apiResponse {
  constructor(statusCode, response = {}, message = "Something went wrong!!!") {
    this.statusCode = statusCode;
    this.response = response;
    this.message = message;
  }
}

export { apiError, apiResponse };
