let webSocket;
const hubName = "pixelartdrawing";
const groupName = "pixelartdrawing";
const hoverPositionMessage = "hover"; // x, y positions
const clickPositionMessage = "click"; // x, y positions
const changeColorPaletteMessage = "color-palette"; // paletteId , colors
const resetMessage = "reset";
let ackId = 0;

async function connectAzureWebPubSub(user) {
  
  const isConnected = webSocket?.readyState === WebSocket.OPEN;
  if (!isConnected) {
    let tokenResponse = await fetch(`/api/CreateTokenRequest?clientId=${user.id}`);
    let urlData = await tokenResponse.json();
    webSocket = new WebSocket(urlData.url,'json.webpubsub.azure.v1');
    webSocket.onopen = () => {
      console.log("Connected 🎉");
      select("#connectButton").elt.innerText = "Disconnect";
    };
    webSocket.onclose = event => {
      console.log(`Disconnected 😿, code=${event.code}`);
      select("#connectButton").elt.innerText = "Connect";
    };
    webSocket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch (data.messageType) {
        case hoverPositionMessage:
          setUserPosition(data.clientId, data.x, data.y);
          break;
        case clickPositionMessage:
          clickCell(data.x, data.y);
            break;
        case changeColorPaletteMessage:
          handleChangeColorPalette(data.paletteId, data.colors);
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
