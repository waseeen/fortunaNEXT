import { Client, GatewayIntentBits, Invite, REST } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join } from 'path';
import { Button, SlashCommand } from '../types';
import { Collection } from 'discord.js';
const intents =
  GatewayIntentBits.Guilds +
  GatewayIntentBits.GuildMembers +
  GatewayIntentBits.GuildModeration +
  GatewayIntentBits.GuildEmojisAndStickers +
  GatewayIntentBits.GuildIntegrations +
  GatewayIntentBits.GuildWebhooks +
  GatewayIntentBits.GuildInvites +
  GatewayIntentBits.GuildVoiceStates +
  GatewayIntentBits.GuildPresences +
  GatewayIntentBits.GuildMessages +
  GatewayIntentBits.GuildMessageReactions +
  GatewayIntentBits.GuildMessageTyping +
  GatewayIntentBits.DirectMessages +
  GatewayIntentBits.DirectMessageReactions +
  GatewayIntentBits.DirectMessageTyping +
  GatewayIntentBits.MessageContent +
  GatewayIntentBits.GuildScheduledEvents +
  GatewayIntentBits.AutoModerationConfiguration +
  GatewayIntentBits.AutoModerationExecution;
export const client = new Client({ intents: intents });

client.slashCommands = new Collection<string, SlashCommand>();
client.buttons = new Collection<string, Button>();
client.invites = new Collection<string, Invite>();

export const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

const handlersDir = join(__dirname, '../handlers');
readdirSync(handlersDir).forEach((handler) => {
  if (!handler.endsWith('.js')) return;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require(`${handlersDir}/${handler}`)(client);
});

export const startBot = async (): Promise<void> => {
  await client.login(process.env.BOT_TOKEN);
};
