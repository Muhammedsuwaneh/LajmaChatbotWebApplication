using Lajma.Backend.Base;
using Lajma.Backend.Models;
using Lajma.Backend.Dtos;

namespace Lajma.Backend.Services
{
    public interface IApplicationUserService
    {

       ApiResponse<ApplicationUserDto> UserAuthenticationService(ApplicationUserAuthDto userAuth);

       ApiResponse<ApplicationUserDto> UserRegisterationService(ApplicationUserDto user);

       ApiResponse<ApplicationUserDto> GetUserInfoService(int id);

       ApiResponse<int> DeleteUserAccountService(int id);
       ApiResponse<ApplicationUserDto> UpdateUserAccountService(ApplicationUserDto updatedUser, int id);
    }
}
