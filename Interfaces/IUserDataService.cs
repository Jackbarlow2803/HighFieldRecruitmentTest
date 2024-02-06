using HighfieldRecruitmentTest.Data;

namespace HighfieldRecruitmentTest.Interfaces
{
    public interface IUserDataService
    {
        public Task<List<UserData>> GetAllUserDataAsync();
    }
}
