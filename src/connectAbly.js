let ably;
let channel;
const channelName = "pixel-art-drawing";
const coordinatesMessage = "coordinate"; // x, y positions with min and max values.
const clickMessage = "click"; // true or false
let clientId;

async function connectAbly() {
  clientId = getRandomInt().toString();
  const isConnected = ably?.connection.state === "connected";
  if (!isConnected) {
    const clientOptions = {
      authUrl: `/api/CreateTokenRequest/${clientId}`,
      clientId: clientId,
      echoMessages: false,
    };
    ably = new Ably.Realtime.Promise(clientOptions);
    ably.connection.on("connected", () => {
      console.log("Connected 🎉");
      select("#connectButton").elt.innerText = "Disconnect";
      channel = ably.channels.get(channelName);
      channel.presence.subscribe('enter', member => {
        addUser(member.clientId);
      });
      channel.presence.enter();
      channel.subscribe(coordinatesMessage, (message) => {
        setUserPosition(message.clientId, message.data.x, message.data.y);
      });
      channel.subscribe(clickMessage, (message) => {
        clickCell(message.data.x, message.data.y);
      });
    });
    ably.connection.on("closed", () => {
      console.log("Disconnected 😿");
      select("#connectButton").elt.innerText = "Connect";
    });
    
  } else {
    ably.close();
  }
}

function getRandomInt() {
  const min = Math.ceil(1000);
  const max = Math.floor(9999);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
