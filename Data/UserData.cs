using Newtonsoft.Json;

namespace HighfieldRecruitmentTest.Data
{
    public class UserData
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("firstName")]
        public string? FirstName { get; set; }

        [JsonProperty("lastName")]
        public string? LastName { get; set; }

        [JsonProperty("email")]
        public string? Email { get; set; }

        [JsonProperty("doB")]
        public DateTime DoB { get; set; } 
        
        [JsonProperty("favouriteColour")]
        public string? FavouriteColour { get; set; }

        public static List<UserData> FromJson(string json)
        {
            return JsonConvert.DeserializeObject<List<UserData>>(json);
        }
    }
}


