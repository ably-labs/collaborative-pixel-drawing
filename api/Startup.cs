using System;
using AblyLabs.PubSub;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using IO.Ably;

[assembly: FunctionsStartup(typeof(Startup))]
namespace AblyLabs.PubSub
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var ablyApiKey = Environment.GetEnvironmentVariable("ABLY_APIKEY");
            var ablyClient = new AblyRest(ablyApiKey);
            builder.Services.AddSingleton<IRestClient>(ablyClient);
        }
    }
}
