let webSocket;
const hubName = "PixelArtDrawing";
const hoverPositionMessage = "hover"; // x, y positions
const clickPositionMessage = "click"; // x, y positions
const changeColorPaletteMessage = "color-palette"; // paletteId , colors
const resetMessage = "reset";
let ackId = 0;

async function connectAzureWebPubSub(user) {
  
  const isConnected = webSocket?.readyState === WebSocket.OPEN;
  if (!isConnected) {
    let negotiateResponse = await fetch(`/api/Negotiate?clientId=${user.id}`);
    let negotiateUrl = await negotiateResponse.json();
    webSocket = new WebSocket(negotiateUrl.url,'json.webpubsub.azure.v1');
    webSocket.onopen = () => {
      console.log("Connected 🎉");
      select("#connectButton").elt.innerText = "Disconnect";
    };
    webSocket.onclose = event => {
      console.log(`Disconnected 😿, code=${event.code}`);
      select("#connectButton").elt.innerText = "Connect";
    };
    webSocket.onmessage = event => {
      switch (event.data.type) {
        case hoverPositionMessage:
          setUserPosition(event.data.clientId, event.data.x, event.data.y);
          break;
        case clickPositionMessage:
          clickCell(event.data.x, event.data.y);
            break;
        case changeColorPaletteMessage:
          handleChangeColorPalette(event.data.paletteId, event.data.colors);
          break;
        case resetMessage:
          resetGrid();
          break;
        default:
          break;
      }
    };
    webSocket.onerror = event => {
      this.error = `WebSocket error ${event.message}`
    }

    // ably.connection.on("connected", async () => {
    //   channel = await ably.channels.get(
    //     hubName,
    //     {
    //       params: { rewind: '2m' },
    //     });
    //   channel.presence.subscribe('enter', (member) => {
    //     addUser(member.clientId, member.data.color);
    //   });
    //   channel.presence.subscribe('leave', (member) => {
    //     removeUser(member.clientId);
    //   });
    //   await channel.presence.get((err, members) => {
    //     members.forEach(member => {
    //       if (member.data) {
    //         addUser(member.clientId, member.data.color);
    //       }
    //     });
    //   });
    //   channel.presence.enter({
    //     color: user.strokeColor,
    //   });
  
  } else {
    webSocket.close();
    disconnectUser();
  }
}
