// commands/hypesquad.js — تم استخراجه من index.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    names: ["hypesquad"],
    async execute(interaction, ctx) {
        const { client } = ctx;

        const token = interaction.options.getString('token');
        if (!client.hypesquadTokens) client.hypesquadTokens = new Map();
        client.hypesquadTokens.set(interaction.user.id, token);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('hs_1')
                .setLabel('Bravery')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1553466984862326936'),
            new ButtonBuilder()
                .setCustomId('hs_2')
                .setLabel('Brilliance')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('155346990046216262'),
            new ButtonBuilder()
                .setCustomId('hs_3')
                .setLabel('Balance')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1553466987349545101'),
            new ButtonBuilder()
                .setCustomId('hs_remove')
                .setLabel('إزالة الشارة')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('🗑️')
        );

        return await interaction.reply({
            content: '🛡️ **اختر بيت HypeSquad الذي تريد الانضمام إليه أو قم بإزالة الشارة:**',
            components: [row],
            ephemeral: true
        });
    }
};
