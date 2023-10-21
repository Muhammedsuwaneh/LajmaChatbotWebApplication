using AutoMapper;
using Lajma.Backend.Base;
using Lajma.Backend.Context;
using Lajma.Backend.Dtos;
using Lajma.Backend.Models;
using Microsoft.EntityFrameworkCore;
using OpenAI_API;
using OpenAI_API.Chat;
using System;
using System.Linq;

namespace Lajma.Backend.Services
{
    public class QueryService : IQueryService
    {
        private ApplicationDbContext context;
        private static IConfiguration? config { get; set; }
        private static IMapper? mapper { get; set; }

        public QueryService(ApplicationDbContext _context, IConfiguration _config, IMapper _mapper)
        {
            config = _config;
            mapper = _mapper;
            context = _context;
        }

        public ApiResponse<List<ChatHistoryDto>> GetChatHistoryService(int userId)
        {
            try
            {
                var chatHistory = context.ChatHistories
                    .Include(c => c.Chats)
                    .Where(c => c.UserId == userId)
                    .OrderByDescending(c => c.HistoryDate)
                    .ToList();

                var chatHistoryDto = chatHistory.Select(mapper.Map<ChatHistory, ChatHistoryDto>).ToList();

                return new ApiResponse<List<ChatHistoryDto>>(chatHistoryDto, "chat history retrieved", string.Empty, 200);

            }
            catch (Exception ex)
            {
                return new ApiResponse<List<ChatHistoryDto>>(null, ex.Message, string.Empty, 500);
            }
        }

        public async Task<ApiResponse<ChatHistoryDto>> GetQueryResponse(QueryDto query, int userId)
        {
            try
            {
                DotNetEnv.Env.Load(); // load env file
                var Api_Token = Environment.GetEnvironmentVariable("API_TOKEN");
                var open_ai = new OpenAIAPI(new APIAuthentication(Api_Token));

                // generate response
                var conversation = open_ai.Chat.CreateConversation();
                conversation.Model = "gpt-3.5-turbo";
                conversation.AppendUserInput(query.Query);

                var response = await conversation.GetResponseFromChatbotAsync();

                if (response == null) throw new Exception("oops something went wrong");

                var currentDateTime = DateTime.Now.ToString();

                var chatDto = new ChatDto
                {
                    Id = query.QueryId,
                    Query = query.Query,
                    Response = response,
                    QueryDate = currentDateTime
                };

                // check if current chat history exist
                var existingChatHistory = context.ChatHistories.Include(c => c.Chats).SingleOrDefault(c => c.Id == query.HistoryId);

                if(existingChatHistory != null)
                {
                    // update chat history
                    var chat = mapper.Map<ChatDto, Chat>(chatDto);

                    existingChatHistory.Chats.Add(chat);
                    context?.SaveChangesAsync();

                    var chatHistoryDto = mapper.Map<ChatHistory, ChatHistoryDto>(existingChatHistory);
                    return new ApiResponse<ChatHistoryDto>(chatHistoryDto, "response successfully generated", string.Empty, 200);
                }

                else
                {
                    // new chat history
                    var chatHistoryDto = new ChatHistoryDto 
                    {
                        Id = query.HistoryId,
                        Title = (query.Query.Length > 30) ? query.Query.Substring(0, 30) + "..." : query.Query,
                        UserId = userId,
                        HistoryDate = currentDateTime,
                        Chats = new List<ChatDto> { chatDto }  
                    };

                    var chatHistory = mapper.Map<ChatHistoryDto, ChatHistory>(chatHistoryDto);

                    // save chat history 
                    context.Add(chatHistory);
                    context.SaveChanges();


                    return new ApiResponse<ChatHistoryDto>(chatHistoryDto, "response successfully generated", string.Empty, 200);
                }
            }
            catch (Exception)
            {
                return new ApiResponse<ChatHistoryDto>(null, "oops something went wrong", string.Empty, 500);
            }
        }

        public ApiResponse<string> DeleteQueryHistoryService(string queryId, int userId)
        {
            try
            {
                var queryHistory = context.ChatHistories.Include(c => c.Chats).SingleOrDefault(c => c.Id == queryId && c.UserId == userId);

                if (queryHistory == null) return new ApiResponse<string>(string.Empty, "query history not found", string.Empty, 404);

                context.ChatHistories.Remove(queryHistory);
                context.SaveChanges();

                return new ApiResponse<string>(queryId, "oops something went wrong", string.Empty, 200);
            }
            catch (Exception)
            {
                return new ApiResponse<string>(string.Empty, "oops something went wrong", string.Empty, 404); 
            }
        }
    }
}

