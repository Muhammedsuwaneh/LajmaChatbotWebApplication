using Lajma.Backend.Context;
using Lajma.Backend.Encryption;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Lajma.Backend.Base;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Lajma.Backend.Services;
using Lajma.Backend.Dtos;
using AutoMapper;

namespace EmployeeManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private ApplicationUserService applicationUserService;

        public ApplicationUserController(ApplicationDbContext _context, IConfiguration _config, IMapper _mapper)
        {
            applicationUserService = new ApplicationUserService(_context, _config, _mapper);
        }

        [HttpPost("authenticate")]
        [Produces("application/json")]
        public IActionResult AuthenticateApplicationUser(ApplicationUserAuthDto userAuth)
        {
            var response = applicationUserService.UserAuthenticationService(userAuth);

            if (response.status == 200) return Ok(response);
            else if (response.status == 400) return NotFound(response);
            else return BadRequest(response);
        }

        [HttpPost("register")]
        [Produces("application/json")]
        public IActionResult RegisterApplicationUser(ApplicationUserDto user)
        {
            var response = applicationUserService.UserRegisterationService(user);

            if (response.status == 201) return Ok(response);
            else return BadRequest(response);
        }

        [Authorize]
        [HttpGet("user/")]
        [Produces("application/json")]
        public IActionResult GetApplicationUser()
        {
            try
            {
                // obtain user id from token
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                        var userClaims = identity.Claims;

                        var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                        if (Int32.TryParse(userId, out int _id)) {

                            var response = applicationUserService.GetUserInfoService(_id);
                            if(response.status == 200) return Ok(response);
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
        [HttpPut("update/")]
        [Produces("application/json")]
        public IActionResult UpdateApplicationUser(ApplicationUserDto updatedUser)
        {
            try
            {
                // obtain user id from token
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {   
                    var userClaims = identity.Claims;
                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    
                    if(Int32.TryParse(userId, out int id))
                    {
                        var response = applicationUserService.UpdateUserAccountService(updatedUser, id);
                        if (response.status == 200) return Ok(response);
                        else if (response.status == 401) return NotFound(response);
                        else return BadRequest(response);
                    }
                    else throw new Exception("oops something went wrong");
                }

                else
                {
                    throw new Exception("oops something went wrong");
                }
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
        [HttpDelete("delete/")]
        [Produces("application/json")]
        public IActionResult DeleteApplicationUser()
        {
            // obtain user id from token
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                try
                {
                    var userClaims = identity.Claims;
                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    
                    if(Int32.TryParse(userId, out int _id))
                    {
                        var response = applicationUserService.DeleteUserAccountService(_id);
                        if (response.status == 200) return Ok(response);
                        else if (response.status == 401) return NotFound(response);
                        else return BadRequest(response);
                    }
                    else throw new Exception("oops something went wrong");
                }
                catch (Exception ex)
                {
                    return BadRequest(new ApiResponse<int>
                    {
                        ResponseObject = 0,
                        message = "oops something went wrong: " + ex.Message,
                        token = null,
                        status = 500
                    });
                }
            }
            else
            {
                return BadRequest(new ApiResponse<int>
                {
                    ResponseObject = 0,
                    message = "request rejected",
                    token = null,
                    status = 500
                });
            }
        }

        [HttpPost("forgot-password/{email}")]
        [Produces("application/json")]
        public IActionResult ForgotPassword(string email)
        {
            // send reset request
            var response = applicationUserService.ForgotPassword(email);

            if (response.status == 200) return Ok(response);
            else if (response.status == 400) return NotFound(response);
            else return BadRequest(response);
        }

        [HttpPost("validate-reset-password-token/{token}")]
        [Produces("application/json")]
        public IActionResult ConfirmToken(string token)
        {
            // check if token has expired
            return Ok();
        }


        [Authorize]
        [HttpPut("reset-password/")]
        [Produces("application/json")]
        public IActionResult ResetPassword(UserPasswordResetDto userPasswordResetDto)
        {
            // obtain user id from token
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                try
                {
                    var userClaims = identity.Claims;
                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    if (Int32.TryParse(userId, out int _id))
                    {
                        // send reset request
                        var response = applicationUserService.ResetPassword(_id, userPasswordResetDto.Password);
                        if (response.status == 200) return Ok(response);
                        else if (response.status == 400) return NotFound(response);
                        else return BadRequest(response);
                    }
                    else throw new Exception("oops something went wrong");
                }
                catch (Exception ex)
                {
                    return BadRequest(new ApiResponse<int>
                    {
                        ResponseObject = 0,
                        message = "oops something went wrong: " + ex.Message,
                        token = null,
                        status = 500
                    });
                }
            }
            else
            {
                return BadRequest(new ApiResponse<int>
                {
                    ResponseObject = 0,
                    message = "request rejected",
                    token = null,
                    status = 500
                });
            }
        }
    }
}
