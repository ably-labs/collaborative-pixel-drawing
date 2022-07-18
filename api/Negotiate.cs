using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using Microsoft.Azure.WebJobs.Extensions.WebPubSub;

namespace AblyLabs.PubSub
{
    public class Negotiate
    {
        [FunctionName(nameof(Negotiate))]
        public WebPubSubConnection Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestMessage req,
            [WebPubSubConnection(Hub = "PixelArtDrawing",  UserId = "{Query.clientId}")] WebPubSubConnection connection,
            ILogger log)
        {
            return connection;
        }
    }
}
