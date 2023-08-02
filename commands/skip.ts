import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { banidos, meMama } from "../utils/fuck_rabelao";

import { bot } from "../index";
import { canModifyQueue } from "../utils/queue";
import { i18n } from "../utils/i18n";

export default {
  data: new SlashCommandBuilder().setName("skip").setDescription(i18n.__("skip.description")),
  execute(interaction: ChatInputCommandInteraction) {
    const queue = bot.queues.get(interaction.guild!.id);
    const guildMemer = interaction.guild!.members.cache.get(interaction.user.id);
    const { username } = guildMemer?.user!;

    if (banidos.includes(username)) return interaction.reply(meMama).catch(console.error);

    if (!queue) return interaction.reply(i18n.__("skip.errorNotQueue")).catch(console.error);

    if (!canModifyQueue(guildMemer!)) return i18n.__("common.errorNotChannel");

    queue.player.stop(true);

    interaction.reply({ content: i18n.__mf("skip.result", { author: interaction.user.id }) }).catch(console.error);
  }
};
