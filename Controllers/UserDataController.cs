using HighfieldRecruitmentTest.Data;
using HighfieldRecruitmentTest.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HighfieldRecruitmentTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserDataController : ControllerBase
    {
        private readonly ILogger<UserDataController> _logger;

        private readonly IUserDataService _userDataService;
        public UserDataController(ILogger<UserDataController> logger, IUserDataService userDataService)
        {
            _logger = logger;
            _userDataService = userDataService;
        }

        [HttpGet(Name = "GetUserData")]
        public async Task<IEnumerable<UserData>> Get()
        {

            var userData = await _userDataService.GetAllUserDataAsync();

            return userData;
        }

    }
}

