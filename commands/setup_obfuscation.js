// commands/setup_obfuscation.js — تم استخراجه من index.js

module.exports = {
    names: ["setup_obfuscation"],
    async execute(interaction, ctx) {
        const { db, saveDB } = ctx;

        const channel = interaction.options.getChannel('channel');
        const status = interaction.options.getBoolean('status');
        
        if (!db[interaction.guildId]) db[interaction.guildId] = {};
        if (!db[interaction.guildId].obfuscation) db[interaction.guildId].obfuscation = { enabled: false, channelId: null };
        
        if (channel) db[interaction.guildId].obfuscation.channelId = channel.id;
        if (status !== null) db[interaction.guildId].obfuscation.enabled = status;
        
        saveDB(db);
        
        const state = db[interaction.guildId].obfuscation.enabled ? 'مفعل ✅' : 'معطل ❌';
        const chanName = db[interaction.guildId].obfuscation.channelId ? `<#${db[interaction.guildId].obfuscation.channelId}>` : 'غير محدد';
        
        await interaction.reply({ 
            content: `**<:Yea:1516534090751279257> | تم تحديث إعدادات التشفير:**\n**الحالة:** ${state}\n**الروم:** ${chanName}`, 
            ephemeral: true 
        });
    }
};
