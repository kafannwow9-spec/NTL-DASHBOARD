// commands/setup_ticket.js — تم استخراجه من index.js
const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    names: ["setup_ticket"],
    async execute(interaction, ctx) {
        const { db, saveDB } = ctx;

        const isEphem = interaction.options.getBoolean('ephemeral') ?? true;
        if (!db[interaction.guildId]) db[interaction.guildId] = {};
        db[interaction.guildId].setup_ephemeral = isEphem;
        saveDB(db);
        const menu = new StringSelectMenuBuilder().setCustomId('main_setup_menu').setPlaceholder('اختر من القائمة المنسدلة...')
            .addOptions(
                { label: 'انشاء بانل', value: 'create_panel', emoji: { id: '1516365643379773490' } },
                { label: 'اعدادات البانل', value: 'panel_settings', emoji: { id: '1516395313752182914' } },
                { label: 'حذف بانل', value: 'delete_panel', emoji: { id: '1516357693328330782' } }
            );
        await interaction.reply({ content: '**اعدادات التكت يمكنك تسطيب التكت من الازرار <a:Gear:1516391965422387380>**', components: [new ActionRowBuilder().addComponents(menu)], ephemeral: isEphem });
    }
};
