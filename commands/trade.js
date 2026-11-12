// commands/trade.js — تم استخراجه من index.js
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    names: ["trade"],
    async execute(interaction, ctx) {
        const { ensureGuildData, getDB, saveDB } = ctx;

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ هذا الأمر مخصص للإدارة فقط.', ephemeral: true });
        }
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'setup') {
            const enabled = interaction.options.getBoolean('enabled');
            const channel = interaction.options.getChannel('channel');
            const logChannel = interaction.options.getChannel('log_channel');

            ensureGuildData(interaction.guildId);
            const db = getDB();
            if (!db[interaction.guildId].trade) db[interaction.guildId].trade = {};
            
            db[interaction.guildId].trade.enabled = enabled;
            if (channel) db[interaction.guildId].trade.channelId = channel.id;
            if (logChannel) db[interaction.guildId].trade.logChannelId = logChannel.id;
            saveDB(db);

            return interaction.reply({
                content: `✅ **تم تحديث إعدادات نظام التبادل بنجاح!**\n` +
                         `• **الحالة:** ${enabled ? 'مفعل ✅' : 'معطل ❌'}\n` +
                         `• **روم التبادل:** ${db[interaction.guildId].trade.channelId ? `<#${db[interaction.guildId].trade.channelId}>` : 'غير محدد'}\n` +
                         `• **روم السجلات:** ${db[interaction.guildId].trade.logChannelId ? `<#${db[interaction.guildId].trade.logChannelId}>` : 'غير محدد'}`,
                ephemeral: true
            });
        }
    }
};
