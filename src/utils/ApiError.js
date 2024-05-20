class ApiError extends Error {
  constructor(statusCode, message = "Something Went Wrong") {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.sucess = false;
    this.data = null;
  }
}
export { ApiError };
