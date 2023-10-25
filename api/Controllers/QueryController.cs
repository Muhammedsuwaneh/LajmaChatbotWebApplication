using AutoMapper;
using Lajma.Backend.Base;
using Lajma.Backend.Context;
using Lajma.Backend.Dtos;
using Lajma.Backend.Models;
using Lajma.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Lajma.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueryController : ControllerBase
    {
        private IQueryService queryService;

        public QueryController(ApplicationDbContext _context, IConfiguration config, IMapper mapper)
        {
            queryService = new QueryService(_context, config, mapper);        
        }

        [Authorize]
        [HttpGet("chat_history")]
        public IActionResult GetChatHistory()
        {
            try
            {
                // obtain user id from token
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    var userClaims = identity.Claims;

                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    if (Int32.TryParse(userId, out int _id))
                    {
                        var response = queryService.GetChatHistoryService(_id);

                        if (response.status == 200) return Ok(response);
                        else return BadRequest(response);

                    }
                    else throw new Exception("oops something went wrong");
                }
                else throw new Exception("oops something went wrong");
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<ApplicationUserDto>
                {
                    ResponseObject = null,
                    message = ex.Message,
                    token = null,
                    status = 500
                });
            }
        }

        [Authorize]
        [HttpPost("send_query")]
        [Produces("application/json")]
        public async Task<IActionResult> SendQuery(QueryDto query)
        {
            try
            {
                // obtain user id from token
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    var userClaims = identity.Claims;

                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    if (Int32.TryParse(userId, out int _id))
                    {
                        var response = await queryService.GetQueryResponse(query, _id);
                        if (response.status == 200) return Ok(response);
                        else return BadRequest(response);

                    }
                    else throw new Exception("oops something went wrong");
                }
                else throw new Exception("oops something went wrong");
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<ApplicationUserDto>
                {
                    ResponseObject = null,
                    message = ex.Message,
                    token = null,
                    status = 500
                });
            }
        }

        [Authorize]
        [HttpDelete("delete_query_history/{queryId}")]
        public IActionResult DeleteQueryHistory(string queryId)
        {
            try
            {
                // obtain user id from token
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    var userClaims = identity.Claims;

                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    if (Int32.TryParse(userId, out int _id))
                    {
                        var response = queryService.DeleteQueryHistoryService(queryId, _id);
                        if (response.status == 200) return Ok(response);
                        else return BadRequest(response);

                    }
                    else throw new Exception("oops something went wrong");
                }
                else throw new Exception("oops something went wrong");
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<string>
                {
                    ResponseObject = null,
                    message = ex.Message,
                    token = null,
                    status = 500
                });
            }
        }
    }
}
