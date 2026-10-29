// commands/ai.js — تم استخراجه من index.js
const { PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    names: ["ai"],
    async execute(interaction, ctx) {
        const { isGuildPremium, db, saveDB } = ctx;

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ هذا الأمر مخصص للإدارة فقط (Administrator).', ephemeral: true });
        }

        const isPremium = isGuildPremium(interaction.guildId);
        if (!isPremium) {
            const btn = new ButtonBuilder()
                .setEmoji('1511327391669026916')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/hBvzFrqQP2');
            const row = new ActionRowBuilder().addComponents(btn);
            return interaction.reply({
                content: `**<:Premium:1520486329316671689> | ليس لديك بريميوم للشراء توجه إلى الدعم**`,
                components: [row],
                ephemeral: true
            });
        }

        // Ensure guild has DB and AI config initialized
        if (!db[interaction.guildId]) db[interaction.guildId] = {};
        const aiData = db[interaction.guildId].ai || {
            name: 'غير محدد',
            avatar: 'غير محدد',
            status: 'غير متصل',
            channelId: null,
            categoryId: null,
            trainingType: null,
            knowledge: [],
            autoTrainedData: ''
        };
        db[interaction.guildId].ai = aiData;
        saveDB(db);

        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle('إعدادات الذكاء الاصطناعي')
            .setDescription(
                `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${aiData.name}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** ${aiData.avatar === 'غير محدد' ? 'غير محدد' : `[انقر لعرض الصورة](${aiData.avatar})`}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${aiData.status}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** ${aiData.channelId ? `<#${aiData.channelId}>` : 'غير محدد'}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**كاتاجوري المساعد 📁 :** ${aiData.categoryId ? `<#${aiData.categoryId}>` : 'غير محدد'}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**نوع التدريب <:training:1521452247270293524> :** ${aiData.trainingType === 'auto' ? 'تدريب تلقائي (نفسه)' : (aiData.trainingType === 'manual' ? 'تدريب يدوي' : 'غير محدد')}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**مفتاح Gemini API الخاص 🔑 :** ${aiData.geminiApiKey ? 'مسجل ✅ (خاص بالسيرفر)' : 'غير مسجل (يستخدم الافتراضي)'}`
            );

        const uId = interaction.user.id;
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`ai_set_name_${uId}`).setLabel('اسم الذكاء الاصطناعي').setEmoji('1516365639760085033').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`ai_set_avatar_${uId}`).setLabel('صورة الذكاء الاصطناعي').setEmoji('1516575747425439975').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`ai_set_status_${uId}`).setLabel('تعديل حالة الذكاء').setEmoji('1521449964591517807').setStyle(ButtonStyle.Secondary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`ai_set_channel_${uId}`).setLabel('روم الكلام مع الـai').setEmoji('1516365641823551528').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`ai_set_category_${uId}`).setLabel('تحديد كاتاجوري').setEmoji('📁').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`ai_train_prompt_${uId}`).setLabel('تدريب الذكاء الاصطناعي').setEmoji('1521452247270293524').setStyle(ButtonStyle.Danger)
        );

        const row3 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`ai_ticket_panels_${uId}`).setLabel('ذكاء التذاكر / AI بالتذاكر').setEmoji('🎫').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`ai_set_gemini_key_${uId}`).setLabel('مفتاح Gemini API').setEmoji('🔑').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`ai_gemini_guide_${uId}`).setLabel('شرح المفتاح').setEmoji('📖').setStyle(ButtonStyle.Secondary)
        );

        await interaction.reply({ embeds: [embed], components: [row1, row2, row3] });
    }
};
