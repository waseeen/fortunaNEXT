import { Client, Routes, SlashCommandBuilder } from 'discord.js';
import { PathLike, readdirSync } from 'fs';
import { SlashCommand } from '../types';
import { rest } from '../client';

import dotenv from 'dotenv';
dotenv.config();

module.exports = async (client: Client) => {
  const slashCommands: SlashCommandBuilder[] = [];

  const commandImport = (dir: PathLike): void => {
    readdirSync(dir).forEach((file) => {
      if (!file.endsWith('.js')) return;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const command: SlashCommand = require(`${dir}/${file}`).default;
      slashCommands.push(command.command);
      client.slashCommands.set(command.command.name, command);
    });
  };

  readdirSync(__dirname + '/../slashCommands').forEach((dir) => {
    commandImport(__dirname + '/../slashCommands/' + dir);
  });

  await rest
    .put(Routes.applicationCommands(process.env.BOT_CLIENT_ID!), {
      body: slashCommands.map((command) => command.toJSON()),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((data: any) => {
      console.log(`Slash commands loaded:${data.length}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
