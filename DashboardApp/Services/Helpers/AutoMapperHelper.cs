using DashboardApp.DTO;
using DashboardApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;

namespace DashboardApp.Services.Helpers
{
    public static class AutoMapperHelper //: Profile
    {
        public static User Convert(UserDto userDTO)
        {
            Mapper.CreateMap<UserDto, User>();
            return Mapper.Map<UserDto, User>(userDTO);
        }

        public static UserDto Convert(User user)
        {
            Mapper.CreateMap<User, UserDto>();
            return Mapper.Map<User, UserDto>(user);
        }
        public static IEnumerable<UserDto> Convert(IEnumerable<User> users)
        {
            Mapper.CreateMap<User, UserDto>();
            return Mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(users); ;
        }
    }
}