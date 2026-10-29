// commands/setup_suggestion.js — تم استخراجه من index.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    names: ["setup_suggestion"],
    async execute(interaction, ctx) {
        const { db, saveDB } = ctx;

        const ch = interaction.options.getChannel('channel'), title = interaction.options.getString('title'), desc = interaction.options.getString('description'), url = interaction.options.getString('image_url'), useIcon = interaction.options.getBoolean('use_server_icon') ?? false;
        db[interaction.guildId].suggestions = { channelId: ch.id, title, description: desc, imageUrl: url, useServerIcon: useIcon };
        saveDB(db);
        const em = new EmbedBuilder().setColor('#12a524').setTitle(title).setDescription(desc);
        if (url) em.setImage(url);
        else if (useIcon) { const icon = interaction.guild.iconURL({ size: 1024 }); if (icon) em.setImage(icon); }
        const r = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('publish_suggestion_prompt_btn').setLabel('نشر إقتراح').setEmoji('1517591602049056829').setStyle(ButtonStyle.Success));
        await ch.send({ embeds: [em], components: [r] });
        await interaction.reply({ content: '✅ تم إنشاء لوحة نظام الاقتراحات بنجاح!', ephemeral: true });
    }
};
