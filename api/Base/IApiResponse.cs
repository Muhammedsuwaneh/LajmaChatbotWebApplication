namespace Lajma.Backend.Base
{
    public interface IApiResponse<T>
    {
            public T? ResponseObject { get; set; }
            public string? message { get; set; }
            public string? token { get; set; }
            public int status { get; set; }
    }
}
