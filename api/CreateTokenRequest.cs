using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Azure.Messaging.WebPubSub;
using System.Net;

namespace AblyLabs.PubSub
{
    public class CreateTokenRequest
    {
        [FunctionName(nameof(CreateTokenRequest))]
        public async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "CreateTokenRequest/{hubName}/{groupName}/{clientId}")] HttpRequestMessage req,
            string hubName,
            string groupName,
            string clientId,
            ILogger log)
        {
            var webPubSubService = new WebPubSubServiceClient(
                Environment.GetEnvironmentVariable("WebPubSubConnectionString"),
                hubName);
            var clientUri = await webPubSubService.GetClientAccessUriAsync(
                TimeSpan.FromMinutes(30),
                clientId,
                new[] { 
                    $"webpubsub.joinLeaveGroup.{groupName}",
                    $"webpubsub.sendToGroup.{groupName}"
                    }
                );

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(clientUri.ToString())
            };
        }
    }
}
