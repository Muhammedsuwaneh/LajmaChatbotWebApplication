namespace Lajma.Backend.Base
{
    public class ApiResponse<T> : IApiResponse<T>
    {
        public T? ResponseObject { get; set; }
        public string? message { get; set; }
        public string? token { get; set; }
        public int status { get; set; }

        public ApiResponse() { }
        public ApiResponse(T? ResponseObject, string message = "", string token = "", int status = 0)
        {
            this.ResponseObject = ResponseObject;
            this.message = message; 
            this.token = token; 
            this.status = status; 
        }
    }
}
