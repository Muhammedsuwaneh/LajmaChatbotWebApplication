using AutoMapper;
using Lajma.Backend.Base;
using Lajma.Backend.Context;
using Lajma.Backend.Dtos;
using Lajma.Backend.Encryption;
using Lajma.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Lajma.Backend.Services
{
    public class ApplicationUserService : IApplicationUserService
    {
        private static ApplicationDbContext? context { get; set; }
        private static IConfiguration? config { get; set; }
        private static IMapper mapper;
        private EmailService emailService;

        public ApplicationUserService(ApplicationDbContext _context, IConfiguration _config, IMapper _mapper)
        {
            context = _context;
            config = _config;
            mapper = _mapper;
            emailService = new EmailService();
        }

        public ApiResponse<ApplicationUserDto> UserAuthenticationService(ApplicationUserAuthDto userAuth)
        {
            try
            {
                ApplicationUser _user = context.ApplicationUsers.FirstOrDefault(user => user.Email == userAuth.Email && user.Password == Encrypt.GenerateMD5HashedPassword(userAuth.Password));

                if (_user != null)
                {
                    var user = mapper.Map<ApplicationUser, ApplicationUserDto>(_user);
                    var token = Encrypt.GenerateSessionToken(_user, config);
                    var successfulAuthenticationResponse =
                        new ApiResponse<ApplicationUserDto>(user, "authentication was successful", token, 200);

                    return successfulAuthenticationResponse;
                }

                var userNotFoundResponse = new ApiResponse<ApplicationUserDto>(null, "authentication was unsuccessful. please check your credentials and try again", string.Empty, 400);

                return userNotFoundResponse;

            }
            catch (Exception ex)
            {
                return new ApiResponse<ApplicationUserDto>(null, ex.Message, string.Empty, 500);
            }
        }

        public ApiResponse<ApplicationUserDto> UserRegisterationService(ApplicationUserDto user)
        {
            try
            {
                ApplicationUser User = context.ApplicationUsers.FirstOrDefault(u => u.Username == user.Username || u.Email == user.Email);

                if (User != null)
                {
                    return new ApiResponse<ApplicationUserDto>
                    {
                        ResponseObject = null,
                        token = null,
                        message = "Oops! user exist. Please check entered credentials",
                        status = 500,
                    };
                }

                user.Password = Encrypt.GenerateMD5HashedPassword(user.Password);
                user.DateJoined = DateTime.Now.ToString();

                var appUser = mapper.Map<ApplicationUserDto, ApplicationUser>(user);

                context.Add(appUser);
                context.SaveChanges();

                var token = Encrypt.GenerateSessionToken(appUser, config); // get token
                emailService.SendEmail(user.Email, user.Username); // send email

                return new ApiResponse<ApplicationUserDto>
                {
                    ResponseObject = user,
                    token = token,
                    message = "Account created",
                    status = 201,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<ApplicationUserDto>
                {
                    ResponseObject = null,
                    token = null,
                    message = "oops! something went wrong: " + ex.Message,
                    status = 500,
                };
            }
        }

        public ApiResponse<ApplicationUserDto> GetUserInfoService(int id)
        {
            var user = context?.ApplicationUsers.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return new ApiResponse<ApplicationUserDto>
                {
                    ResponseObject = null,
                    message = "use not found",
                    token = null,
                    status = 401
                };
            }

            user.Password = Encrypt.DecryptPassword(user.Password);
            var userDto = mapper.Map<ApplicationUser, ApplicationUserDto>(user);

            return new ApiResponse<ApplicationUserDto>
            {
                ResponseObject = userDto,
                message = "request successful",
                token = null,
                status = 200
            };
        }

        public ApiResponse<int> DeleteUserAccountService(int id)
        {
           try
           {
                var _user = context?.ApplicationUsers.FirstOrDefault(t => t.Id == id);

                if (_user == null)
                {
                    return new ApiResponse<int>
                    {
                        ResponseObject = 0,
                        message = "not found",
                        token = null,
                        status = 401
                    };
                }

                var userQueries = context.ChatHistories.Include(c => c.Chats).Where(c => c.UserId == id).ToList();

                if(userQueries != null && userQueries.Count > 0)
                {
                    // delete all user's queries
                    foreach(var query in userQueries)
                    {
                        context.ChatHistories.Remove(query);
                    }
                }

                // delete user account info
                context?.ApplicationUsers.Remove(_user);
                context?.SaveChanges();

                return new ApiResponse<int>
                {
                    ResponseObject = id,
                    message = "account deleted",
                    token = null,
                    status = 200
                };

            }catch(Exception ex)
            {
                return new ApiResponse<int>
                {
                    ResponseObject = -1,
                    message = "oops something went wrong: " + ex.Message,
                    token = null,
                    status = 500
                };
            }
        }

        public ApiResponse<ApplicationUserDto> UpdateUserAccountService(ApplicationUserDto updatedUser, int id)
        {
            try
            {
                var user = context?.ApplicationUsers.FirstOrDefault(u => u.Id == id);

                if (user == null)
                {
                    return new ApiResponse<ApplicationUserDto>
                    {
                        ResponseObject = null,
                        message = "error. user not found",
                        token = null,
                        status = 401
                    };
                }

                user.Username = updatedUser.Username;
                user.Email = updatedUser.Email;
                user.Avatar = updatedUser.Avatar;
                user.Password = Encrypt.GenerateMD5HashedPassword(updatedUser.Password);
                context?.SaveChangesAsync();

                return new ApiResponse<ApplicationUserDto>
                {
                    ResponseObject = updatedUser,
                    message = "profile info updated",
                    token = null,
                    status = 200
                };

            } catch(Exception ex)
            {
                return new ApiResponse<ApplicationUserDto>
                {
                    ResponseObject = null,
                    message = "oops something went wrong: " + ex.Message,
                    token = null,
                    status = 500
                };
            }
        }
    }
}
