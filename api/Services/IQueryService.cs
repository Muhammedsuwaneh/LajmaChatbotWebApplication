using Lajma.Backend.Base;
using Lajma.Backend.Dtos;

namespace Lajma.Backend.Services
{
    public interface IQueryService
    {
         ApiResponse<List<ChatHistoryDto>> GetChatHistoryService(int userId);
         Task<ApiResponse<ChatHistoryDto>> GetQueryResponse(QueryDto query, int userId);
         ApiResponse<string> DeleteQueryHistoryService(string queryId, int userId);
    }
}
