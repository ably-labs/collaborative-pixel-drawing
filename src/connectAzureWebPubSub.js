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
      addUser(user.id, user.strokeColor);
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
              message.data.color,
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
      }
    };
    webSocket.onerror = (event) => {
      this.error = `WebSocket error ${event.message}`;
    };
  } else {
    webSocket.close();
    disconnectUser();
  }
}
