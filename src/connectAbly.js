let ably;
let channel;
const channelName = "pixel-art-drawing";
const hoverPositionMessage = "hover"; // x, y positions
const clickPositionMessage = "click"; // x, y positions
const changeColorPaletteMessage = "color-palette"; // paletteId , colors
const resetMessage = "reset";

async function connectAbly(user) {
    const isConnected = ably?.connection.state === "connected";
    if (!isConnected) {
        const clientOptions = {
            authUrl: `/api/CreateTokenRequest/${user.id}`,
            echoMessages: false,
        };
        ably = new Ably.Realtime.Promise(clientOptions);
        ably.connection.on("connected", async () => {
            console.log("Connected 🎉");
            document.getElementById("connectButton").innerText = "Disconnect";
            channel = await ably.channels.get(channelName, {
                params: { rewind: "2m" },
            });
            channel.presence.subscribe("enter", (member) => {
                addUser(member.clientId, member.data.color);
            });
            channel.presence.subscribe("leave", (member) => {
                removeUser(member.clientId);
            });
            await channel.presence.get((err, members) => {
                members.forEach((member) => {
                    if (member.data) {
                        addUser(member.clientId, member.data.color);
                    }
                });
            });
            channel.presence.enter({
                color: user.strokeColor,
            });
            channel.subscribe(hoverPositionMessage, (message) => {
                setUserPosition(message.clientId, message.data.x, message.data.y);
            });
            channel.subscribe(clickPositionMessage, (message) => {
                clickCell(message.data.x, message.data.y);
            });
            channel.subscribe(changeColorPaletteMessage, (message) => {
                handleChangeColorPalette(message.data.paletteId, message.data.colors);
            });
            channel.subscribe(resetMessage, () => {
                resetGrid();
            });
        });
        ably.connection.on("closed", () => {
            console.log("Disconnected 😿");
            document.getElementById("connectButton").innerText = "Connect";
        });
    } else {
        ably.close();
        disconnectUser();
    }
}
