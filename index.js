const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");

const TOKEN = "your bot token";
const CLIENT_ID = "1311724301744996352";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log("Slash command registered.");
  } catch (err) {
    console.log(err);
  }
})();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("ready", () => {
  console.log("Bot is online!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong! 🟢");
  }
});

client.login(TOKEN);