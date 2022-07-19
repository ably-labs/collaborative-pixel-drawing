using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.WebJobs.Extensions.WebPubSub;
using Microsoft.Azure.WebPubSub.Common;

namespace AblyLabs.PubSub
{
    public class EventHandler
    {
        [FunctionName(nameof(EventHandler))]
        public async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestMessage req,
            [WebPubSub(Hub = "{query.hubName}")] IAsyncCollector<WebPubSubAction> actions,
            ILogger log)
        {
            // https://github.com/benc-uk/chatr/blob/main/api/eventHandler/index.js
            if (req.Method.Method == "GET") 
            {
                var response = req.CreateResponse();
                response.Headers.Add("webhook-allowed-origin", req.Headers.GetValues("webhook-request-origin").FirstOrDefault());
                return response;
            }

            // POST event
            var userId = req.Headers.GetValues("ce-userid").FirstOrDefault();
            var eventName = req.Headers.GetValues("ce-eventname").FirstOrDefault();

            var data = req.Content.ReadAsAsync<dynamic>();
            if (data.messageType)
            
            var data = BinaryData.FromObjectAsJson(
            new {
                messageType = "",

            });
            var action = WebPubSubAction.CreateSendToAllAction(data, WebPubSubDataType.Json);
            await actions.AddAsync(action);

            return new AcceptedResult();
        }
    }
}
