using AutoMapper;
using Lajma.Backend.Dtos;
using Lajma.Backend.Models;
using System;

namespace Lajma.Backend.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApplicationUser, ApplicationUserDto>();
            CreateMap<ApplicationUserDto, ApplicationUser>();
            CreateMap<ChatHistory, ChatHistoryDto>();
            CreateMap<ChatHistoryDto, ChatHistory>();
            CreateMap<Chat, ChatDto>();
            CreateMap<ChatDto, Chat>();
            CreateMap<ChatHistory, ChatHistoryDto>().ForMember(history => history.Id, opt => opt.ToString());
            CreateMap<ChatHistoryDto, ChatHistory>().ForMember(history => history.Id, opt => opt.ToString());
        }
    }
}
