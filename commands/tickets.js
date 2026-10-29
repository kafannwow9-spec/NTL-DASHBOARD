// commands/tickets.js — تم استخراجه من index.js
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    names: ["tickets"],
    async execute(interaction, ctx) {
        const { ensureGuildData, getDB, saveDB } = ctx;

        ensureGuildData(interaction.guildId);
        const db = getDB();
        if (!db[interaction.guildId].staffTickets) {
            db[interaction.guildId].staffTickets = {};
        }

        const subcommand = interaction.options.getSubcommand(false);
        const targetUser = interaction.options.getUser('user') || interaction.user;

        if (subcommand === 'show' || !subcommand) {
            const count = db[interaction.guildId].staffTickets[targetUser.id] || 0;
            return await interaction.reply({
                content: `<:Ticket:1539415274741043230> |** لقد إستلم <@${targetUser.id}> \`${count}\` تذكرة**`
            });
        }

        if (subcommand === 'add') {
            if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                return await interaction.reply({
                    content: '**<:No:1516534087161221233> | هذا الأمر مخصص فقط للإدارة (Administrator)!**',
                    ephemeral: true
                });
            }
            const amount = interaction.options.getInteger('amount') || 1;
            const current = db[interaction.guildId].staffTickets[targetUser.id] || 0;
            const newCount = current + amount;
            db[interaction.guildId].staffTickets[targetUser.id] = newCount;
            saveDB(db);
            return await interaction.reply({
                content: `<:Yea:1516534090751279257> |** تمت إضافة \`${amount}\` تذكرة إلى <@${targetUser.id}>. المجموع الآن: \`${newCount}\` تذكرة.**`
            });
        }

        if (subcommand === 'remove') {
            if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                return await interaction.reply({
                    content: '**<:No:1516534087161221233> | هذا الأمر مخصص فقط للإدارة (Administrator)!**',
                    ephemeral: true
                });
            }
            const amount = interaction.options.getInteger('amount') || 1;
            const current = db[interaction.guildId].staffTickets[targetUser.id] || 0;
            const newCount = Math.max(0, current - amount);
            db[interaction.guildId].staffTickets[targetUser.id] = newCount;
            saveDB(db);
            return await interaction.reply({
                content: `<:Yea:1516534090751279257> |** تمت إزالة \`${amount}\` تذكرة من <@${targetUser.id}>. المجموع الآن: \`${newCount}\` تذكرة.**`
            });
        }

        if (subcommand === 'reset') {
            if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                return await interaction.reply({
                    content: '**<:No:1516534087161221233> | هذا الأمر مخصص فقط للإدارة (Administrator)!**',
                    ephemeral: true
                });
            }
            db[interaction.guildId].staffTickets[targetUser.id] = 0;
            saveDB(db);
            return await interaction.reply({
                content: `<:Yea:1516534090751279257> |** تم تصفير عدد تذاكر <@${targetUser.id}> بنجاح.**`
            });
        }
    }
};
