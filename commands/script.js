// commands/script.js — تم استخراجه من index.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports = {
    names: ["script"],
    async execute(interaction, ctx) {
        const { ensureGuildData, getDB, saveDB, ContainerBuilder } = ctx;

        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'setup') {
            const channel = interaction.options.getChannel('channel');
            const prefix = interaction.options.getString('prefix') || 'سكربت';

            ensureGuildData(interaction.guildId);
            const db = getDB();
            if (!db[interaction.guildId]) db[interaction.guildId] = {};
            db[interaction.guildId].scriptSystem = {
                enabled: true,
                channelId: channel.id,
                prefix: prefix
            };
            saveDB(db);

            const container = new ContainerBuilder()
                .setAccentColor(0x57f287)
                .addTextDisplayComponents((td) =>
                    td.setContent(
                        `### 📜 **إعداد نظام البحث عن السكربتات**\n` +
                        `- **الروم المحدد:** <#${channel.id}>\n` +
                        `- **البريفيكس المستخدم:** \`${prefix}\`\n` +
                        `- **الحالة الحالية:** \`مفعل ✅\`\n\n` +
                        `- يمكنك استخدام زر التغيير بالأسفل لتشغيل أو تعطيل النظام في أي وقت.`
                    )
                )
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId(`script_sys_enable_${channel.id}`)
                            .setLabel('تشغيل')
                            .setEmoji('1516534090751279257')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId(`script_sys_disable_${channel.id}`)
                            .setLabel('تعطيل')
                            .setEmoji('1516534087161221233')
                            .setStyle(ButtonStyle.Danger)
                    )
                );

            return await interaction.reply({
                components: [container.toJSON()],
                flags: [MessageFlags.IsComponentsV2],
                ephemeral: true
            }).catch(() => {});
        }
    }
};
