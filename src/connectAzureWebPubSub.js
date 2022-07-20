let webSocket;
const hubName = "pixelarthub";
const groupName = "pixelartgroup";
const hoverPositionMessage = "hover"; // x, y positions
const clickPositionMessage = "click"; // clientId, x, y positions
const changeColorPaletteMessage = "color-palette"; // paletteId , colors
const joinedMessage = "joined"; // clientId
const resetMessage = "reset";

async function connectAzureWebPubSub(user) {
  const isConnected = webSocket?.readyState === WebSocket.OPEN;
  if (!isConnected) {
    let tokenResponse = await fetch(
      `/api/CreateTokenRequest/${hubName}/${groupName}/${user.id}`
    );
    let clientUrl = await tokenResponse.text();
    webSocket = new WebSocket(clientUrl, "json.webpubsub.azure.v1");
    webSocket.onopen = () => {
      console.log("Connected 🎉");
      select("#connectButton").elt.innerText = "Disconnect";
      webSocket.send(
        JSON.stringify({
          type: "joinGroup",
          group: groupName,
        })
      );
      webSocket.send(
        JSON.stringify({
          type: "sendToGroup",
          group: groupName,
          noEcho: true,
          data: {
            messageType: joinedMessage,
            clientId: user.id,
            color: user.strokeColor,
          }
        })
      );
    };
    webSocket.onclose = (event) => {
      console.log(`Disconnected 😿, code=${event.code}`);
      select("#connectButton").elt.innerText = "Connect";
    };
    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "message") {
        switch (message.data.messageType) {
          case hoverPositionMessage:
            setUserPosition(
              message.data.clientId,
              message.data.x,
              message.data.y
            );
            break;
          case clickPositionMessage:
            clickCell(message.data.x, message.data.y);
            break;
          case changeColorPaletteMessage:
            handleChangeColorPalette(
              message.data.paletteId,
              message.data.colors
            );
            break;
          case resetMessage:
            resetGrid();
            break;
          case joinedMessage:
            addUser(message.data.clientId, message.data.color);
            break;
          default:
            break;
        }
      } else if (message.type === "system") {
        // users who join?
        let abc = message;
      }
    };
    webSocket.onerror = (event) => {
      this.error = `WebSocket error ${event.message}`;
    };

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
