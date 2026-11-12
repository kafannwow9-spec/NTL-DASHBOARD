const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    names: ['activate-premium'],
    async execute(interaction, ctx) {
        const { getDB, saveDB } = ctx;
        const ownerId = interaction.client.application?.owner?.ownerId || interaction.client.application?.owner?.id || '1179133837930938470';
        
        if (interaction.user.id !== ownerId && interaction.user.id !== '1179133837930938470') {
            return interaction.reply({ content: '❌ هذا الأمر مخصص لمالك البوت فقط!', ephemeral: true });
        }

        const serverId = interaction.options.getString('server_id');
        const action = interaction.options.getString('action') || 'activate';
        const duration = interaction.options.getString('duration') || 'lifetime';

        const db = getDB();
        if (!db[serverId]) db[serverId] = { panels: {}, tickets: {}, counter: 0 };

        if (action === 'deactivate') {
            db[serverId].premium = null;
            saveDB(db);
            return interaction.reply({ content: `✅ تم إلغاء تفعيل البريميوم بنجاح عن السيرفر: \`${serverId}\``, ephemeral: true });
        } else {
            const expiresAt = duration === '30days' ? Date.now() + 30 * 86400000 : (duration === '7days' ? Date.now() + 7 * 86400000 : 'lifetime');
            db[serverId].premium = { expiresAt, activatedAt: Date.now() };
            saveDB(db);
            return interaction.reply({ content: `✅ تم تفعيل البريميوم بنجاح للسيرفر: \`${serverId}\` (المدة: ${duration === '30days' ? '30 يوم' : (duration === '7days' ? '7 أيام' : 'مدى الحياة')})! 🎉`, ephemeral: true });
        }
    }
};
