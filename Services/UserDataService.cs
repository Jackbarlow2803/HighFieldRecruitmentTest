using HighfieldRecruitmentTest.Data;
using HighfieldRecruitmentTest.Interfaces;

namespace HighfieldRecruitmentTest.Services
{
    public class UserDataService : IUserDataService
    {
        public async Task<List<UserData>> GetAllUserDataAsync()
        {
            List<UserData> data = new List<UserData>();

            string endpointUrl = "https://recruitment.highfieldqualifications.com/api/test";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(endpointUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseData = await response.Content.ReadAsStringAsync();
                        data = UserData.FromJson(responseData);
                    }
                    else
                    {
                        throw new HttpRequestException($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }

            return data;
        }
    }

}
