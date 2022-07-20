using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using IO.Ably;

namespace AblyLabs.PubSub
{
    public class ChangeColorPalette
    {
        private IRestClient _ablyClient;

        public ChangeColorPalette(IRestClient ablyClient)
        {
            _ablyClient = ablyClient;
        }

        [FunctionName(nameof(ChangeColorPalette))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "ChangeColorPalette/{paletteId}")] HttpRequestMessage req,
            string paletteId,
            ILogger log)
        {
            string[] colors;
            switch (paletteId)
            {
                case "CGA1":
                    // https://lospec.com/palette-list/cga-palette-1-high
                    colors = new [] {"#fff", "#55ffff", "#ff55ff", "#000"};
                    break;
                case "CGA0":
                    // https://lospec.com/palette-list/cga-palette-0-high
                    colors = new [] {"#ffff55", "#55ff55", "#ff5555", "#000"};
                    break;
                case "GAMEBOY":
                    // https://lospec.com/palette-list/kirokaze-gameboy
                    colors = new [] {"#e2f3e4", "#94e344", "#46878f", "#332c50"};
                    break;
                default:
                    colors = new [] {"#fff", "#55ffff", "#ff5555", "#000"};
                    break;
            }
            var channel = HttpUtility.ParseQueryString(req.RequestUri.Query)["channel"];
            if (channel != null)
            {
                await _ablyClient.Channels.Get(channel).PublishAsync(
                    "color-palette",
                    new {
                        paletteId = paletteId,
                        colors = colors,
                    });
            }

            return new OkObjectResult(colors);
        }
    }
}
