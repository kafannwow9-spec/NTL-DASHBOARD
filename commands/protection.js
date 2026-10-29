// commands/protection.js — تم استخراجه من index.js
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    names: ["protection"],
    async execute(interaction, ctx) {
        const { ensureGuildData, getDB, saveDB, getProtectionEmbedAndComponents } = ctx;

        if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: '❌ هذا الأمر مخصص للمسؤولين فقط (Administrator).', ephemeral: true });
        
        const whitelistCh = interaction.options.getChannel('whitelist_channel');
        const removeWhitelistCh = interaction.options.getChannel('remove_whitelist');
        const whitelistCat = interaction.options.getChannel('whitelist_category');
        const removeCat = interaction.options.getChannel('remove_category');
        const linkPunish = interaction.options.getString('link_punishment');
        const warnMsg = interaction.options.getString('warn_message');
        const warnDur = interaction.options.getInteger('warn_duration');
        
        ensureGuildData(interaction.guildId);
        const db = getDB();
        let changesMade = [];
        
        if (whitelistCh) {
            if (!db[interaction.guildId].protection.links.exemptedChannels.includes(whitelistCh.id)) {
                db[interaction.guildId].protection.links.exemptedChannels.push(whitelistCh.id);
                changesMade.push(`✅ تم إضافة الروم <#${whitelistCh.id}> إلى قائمة المستثنيات.`);
            } else {
                changesMade.push(`⚠️ الروم <#${whitelistCh.id}> موجود مسبقاً في قائمة المستثنيات.`);
            }
        }

        if (removeWhitelistCh) {
            if (db[interaction.guildId].protection.links.exemptedChannels.includes(removeWhitelistCh.id)) {
                db[interaction.guildId].protection.links.exemptedChannels = db[interaction.guildId].protection.links.exemptedChannels.filter(id => id !== removeWhitelistCh.id);
                changesMade.push(`✅ تم إزالة الروم <#${removeWhitelistCh.id}> من قائمة المستثنيات.`);
            } else {
                changesMade.push(`⚠️ الروم <#${removeWhitelistCh.id}> غير موجود في قائمة المستثنيات.`);
            }
        }

        if (whitelistCat) {
            if (!db[interaction.guildId].protection.links.exemptedCategories.includes(whitelistCat.id)) {
                db[interaction.guildId].protection.links.exemptedCategories.push(whitelistCat.id);
                changesMade.push(`✅ تم استثناء الكاتاجوري **${whitelistCat.name}** بالكامل (أي روم فيه أو يتم إنشاؤه مسموح بالروابط).`);
            } else {
                changesMade.push(`⚠️ الكاتاجوري **${whitelistCat.name}** موجود مسبقاً في قائمة المستثنيات.`);
            }
        }

        if (removeCat) {
            if (db[interaction.guildId].protection.links.exemptedCategories.includes(removeCat.id)) {
                db[interaction.guildId].protection.links.exemptedCategories = db[interaction.guildId].protection.links.exemptedCategories.filter(id => id !== removeCat.id);
                changesMade.push(`✅ تم إزالة الكاتاجوري **${removeCat.name}** من قائمة المستثنيات.`);
            } else {
                changesMade.push(`⚠️ الكاتاجوري **${removeCat.name}** غير موجود في قائمة المستثنيات.`);
            }
        }

        if (linkPunish) {
            db[interaction.guildId].protection.links.punishment = linkPunish;
            const pLabel = linkPunish === 'none' ? 'بدون عقوبة (حذف فقط)' : linkPunish;
            changesMade.push(`✅ تم تعيين عقوبة الروابط إلى: **${pLabel}**`);
        }

        if (warnMsg) {
            db[interaction.guildId].protection.links.warnMessage = warnMsg;
            changesMade.push(`✅ تم تخصيص نص رسالة التحذير بنجاح.`);
        }

        if (warnDur !== null && warnDur !== undefined) {
            db[interaction.guildId].protection.links.warnDuration = warnDur;
            changesMade.push(`✅ تم ضبط مدة بقاء رسالة التحذير إلى **${warnDur} ثواني**.`);
        }

        saveDB(db);

        if (changesMade.length > 0) {
            return interaction.reply({ content: changesMade.join('\n'), ephemeral: true });
        }

        const isEphem = interaction.options.getBoolean('ephemeral') ?? false;
        const data = getProtectionEmbedAndComponents(interaction.guildId);
        const reply = await interaction.reply({ ...data, ephemeral: isEphem, fetchReply: true });
        if (!isEphem) { db[interaction.guildId].protectionMessageId = reply.id; saveDB(db); }
    }
};
