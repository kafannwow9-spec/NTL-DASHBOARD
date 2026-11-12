// commands/video.js — تم استخراجه من index.js

module.exports = {
    names: ["video"],
    async execute(interaction, ctx) {
        const { db, saveDB } = ctx;

        const status = interaction.options.getString('downloader');
        const targetChannel = interaction.options.getChannel('channel');
        if (status === 'on') {
            db[interaction.guildId].videoDownloader = {
                enabled: true,
                channelId: targetChannel.id
            };
            saveDB(db);
            return interaction.reply({
                content: `<:Yea:1516534090751279257> |** تم تفعيل نظام تنزيل الفيديوهات بدون علامة مائية في روم <#${targetChannel.id}> **`,
                ephemeral: true
            });
        } else {
            db[interaction.guildId].videoDownloader = {
                enabled: false,
                channelId: null
            };
            saveDB(db);
            return interaction.reply({
                content: `<:No:1516534087161221233> |** تم إيقاف نظام تنزيل الفيديوهات بدون علامة مائية **`,
                ephemeral: true
            });
        }
    }
};
