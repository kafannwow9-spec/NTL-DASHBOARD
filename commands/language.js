// commands/language.js — تم استخراجه من index.js
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    names: ["language"],
    async execute(interaction, ctx) {
        const { ensureGuildData, getDB, saveDB } = ctx;

        if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ هذا الأمر مخصص للإدارة فقط (Administrator).', ephemeral: true });
        }
        const chosenLang = interaction.options.getString('set');
        ensureGuildData(interaction.guildId);
        const db = getDB();
        if (!db[interaction.guildId]) db[interaction.guildId] = {};
        db[interaction.guildId].language = chosenLang;
        saveDB(db);

        if (chosenLang === 'en') {
            return interaction.reply({ content: '✅ **Bot language has been successfully set to English!**', ephemeral: true });
        } else if (chosenLang === 'es') {
            return interaction.reply({ content: '✅ **¡El idioma del bot se ha configurado correctamente en Español!**', ephemeral: true });
        } else {
            return interaction.reply({ content: '✅ **تم تغيير لغة البوت إلى العربية بنجاح!**', ephemeral: true });
        }
    }
};
