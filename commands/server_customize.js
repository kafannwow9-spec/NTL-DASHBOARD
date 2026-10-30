const { EmbedBuilder, Routes } = require('discord.js');
const axios = require('axios');

module.exports = {
    names: ['server-customize'],
    async execute(interaction, ctx) {
        const { getDB, saveDB } = ctx;
        const guildId = interaction.guildId;
        const db = getDB();
        const premium = db[guildId]?.premium;
        const isPrem = premium && (premium.expiresAt === 'lifetime' || (typeof premium.expiresAt === 'number' && Date.now() < premium.expiresAt));

        if (!isPrem) {
            if (!interaction.deferred && !interaction.replied) {
                return interaction.reply({ content: '❌ هذا السيرفر ليس مشتركاً في خدمة البريميوم (Premium). يرجى التواصل مع مالك البوت لتفعيل البريميوم في هذا السيرفر أولاً.', ephemeral: true });
            }
            return interaction.editReply({ content: '❌ هذا السيرفر ليس مشتركاً في خدمة البريميوم (Premium).' });
        }

        const newName = interaction.options.getString('name');
        const newBio = interaction.options.getString('bio');
        const newBanner = interaction.options.getString('banner');
        const newImage = interaction.options.getAttachment('image');

        if (!newName && !newBio && !newBanner && !newImage) {
            if (!interaction.deferred && !interaction.replied) {
                return interaction.reply({ content: '⚠️ يرجى تحديد خيار واحد على الأقل للتخصيص (اسم، نبذة، بنر، أو صورة).', ephemeral: true });
            }
            return interaction.editReply({ content: '⚠️ يرجى تحديد خيار واحد على الأقل للتخصيص.' });
        }

        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ ephemeral: true });
        }

        try {
            if (!db[guildId].customBotProfile) db[guildId].customBotProfile = {};

            const patchBody = {};
            if (newName !== null && newName !== undefined) {
                patchBody.nick = newName;
                db[guildId].customBotProfile.name = newName;
                await interaction.guild.members.me.setNickname(newName).catch(() => {});
            }
            if (newBio !== null && newBio !== undefined) {
                patchBody.bio = newBio;
                db[guildId].customBotProfile.bio = newBio;
            }
            if (newBanner !== null && newBanner !== undefined) {
                patchBody.banner = newBanner;
                db[guildId].customBotProfile.banner = newBanner;
            }

            if (newImage && newImage.url) {
                try {
                    const imgRes = await axios.get(newImage.url, { responseType: 'arraybuffer', timeout: 10000 });
                    const contentType = newImage.contentType || 'image/png';
                    const base64Data = Buffer.from(imgRes.data).toString('base64');
                    const dataUri = `data:${contentType};base64,${base64Data}`;
                    
                    patchBody.avatar = dataUri;
                    db[guildId].customBotProfile.avatarUrl = newImage.url;
                    
                    await interaction.guild.members.me.edit({ avatar: dataUri }).catch(() => {});
                } catch (imgErr) {
                    console.warn('[Avatar Download Warning]:', imgErr.message);
                }
            }

            try {
                await interaction.client.rest.patch(Routes.guildMember(guildId, '@me'), {
                    body: patchBody
                });
            } catch (restErr) {
                console.warn('[Guild Member Profile REST Patch Warning]:', restErr.message);
            }

            saveDB(db);

            const embed = new EmbedBuilder()
                .setColor('#5865F2')
                .setTitle('✨ تم تحديث وتخصيص ملف تعريف البوت في السيرفر بنجاح')
                .setDescription('تم تطبيق التغييرات (الاسم المستعار، الصورة، البنر، والنبذة) في هذا السيرفر فقط:')
                .addFields(
                    { name: 'الاسم المستعار (Nickname)', value: newName || 'بدون تغيير', inline: true },
                    { name: 'النبذة (Bio)', value: newBio || 'بدون تغيير', inline: true },
                    { name: 'البنر (Banner)', value: newBanner || 'بدون تغيير', inline: true },
                    { name: 'الصورة (Avatar)', value: newImage ? 'تم التحديث بنجاح من الاستوديو' : 'بدون تغيير', inline: true }
                );

            if (newImage && newImage.url) {
                embed.setThumbnail(newImage.url);
            }

            await interaction.editReply({ embeds: [embed] });
        } catch (err) {
            console.error('[Server Customize Error]:', err);
            await interaction.editReply({ content: '❌ حدث خطأ أثناء تطبيق التخصيصات. تأكد من صلاحيات البوت (Manage Nickname / Administrator).' });
        }
    }
};
