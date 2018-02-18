using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IdentityModel.Tokens.Jwt;
using DashboardApp.DTO;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using DashboardApp.Services.Helpers;

namespace DashboardApp.Services
{
    public class UsersController : ApiController
    {
        private IUserService _userService;
        public UsersController()
        {
            _userService = new UserService();
        }

        [AllowAnonymous]
        [HttpPost, Route("api/users/authenticate/")]
        public IHttpActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var key = Encoding.ASCII.GetBytes("Thequickbrownfoxjumpsoverthelazydog");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            var userDTO = AutoMapperHelper.Convert(user);
            userDTO.Token = tokenString;
            // return basic user info (without password) and token to store client side
            return Ok(userDTO);
        }

        [AllowAnonymous]
        [HttpPost, Route("api/users/register/")]
        public IHttpActionResult Register([FromBody]UserDto userDto)
        {
            // map dto to entity
            var user = AutoMapperHelper.Convert(userDto);
            try
            {
                // save 
                _userService.Create(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("api/users/getall/")]
        public IHttpActionResult GetAll()
        {
            var users = _userService.GetAll();
            var userDtos = AutoMapperHelper.Convert(users);
            return Ok(userDtos);
        }

        [HttpGet, Route("api/users/{id}/")] //("{id}")]
        public IHttpActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            var userDto = AutoMapperHelper.Convert(user);
            return Ok(userDto);
        }

        [HttpPut] //("{id}")]
        public IHttpActionResult Update(int id, [FromBody]UserDto userDto)
        {
            // map dto to entity and set id

            //var user = Mapper.Map<User>(userDto);
            var user = AutoMapperHelper.Convert(userDto);
            user.Id = id;

            try
            {
                // save 
                _userService.Update(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete] //("{id}")]
        public IHttpActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}
