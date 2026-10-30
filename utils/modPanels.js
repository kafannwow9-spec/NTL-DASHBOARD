// utils/modPanels.js — رسائل الإشراف بنظام Components V2
// (رسالة الشرح، نتيجة الإسكات مع زر الإعفاء، ورسالة الإعفاء)

const IS_COMPONENTS_V2 = 1 << 15; // MessageFlags.IsComponentsV2

const EMOJI = {
    time: '<:time:1525620369879339168>',
    ban: '<:Bann:1556246670671609887>',
    exemption: '<:exemption:1556254572333506660>',
    exemptionId: '1556254572333506660'
};

const text = (content) => ({ type: 10, content });
const bar = () => ({ type: 14, divider: true, spacing: 1 });
const container = (components) => ({ type: 17, components });

// عنوان كل أمر + إيموجيه + أمثلة الاستخدام (يُرسل الشرح لهذه الأوامر الأربعة فقط)
const HELP = {
    timeout: { title: 'إسكات', emoji: EMOJI.time, examples: (s, u) => [`${s} <@${u}> 1m`, `${s} <@${u}> 1h`, `${s} <@${u}> 1d`, `${s} <@${u}> 1w`] },
    untimeout: { title: 'إلغاء الإسكات', emoji: EMOJI.time, examples: (s, u) => [`${s} <@${u}>`] },
    ban: { title: 'حظر', emoji: EMOJI.ban, examples: (s, u) => [`${s} <@${u}> مخالفة القوانين`, `${s} <@${u}>`] },
    unban: { title: 'إلغاء الحظر', emoji: EMOJI.ban, examples: (s, u) => [`${s} ${u}`] }
};

function buildModHelpPayload(cmdKey, cmd, authorId) {
    const h = HELP[cmdKey];
    if (!h) return null;
    const shortcuts = (cmd.shortcuts && cmd.shortcuts.length) ? cmd.shortcuts : [cmdKey];

    const mentions = [
        ...(cmd.allowedRoles || []).map(id => `<@&${id}>`),
        ...(cmd.allowedUsers || []).filter(u => /^\d+$/.test(u)).map(id => `<@${id}>`)
    ];
    const allowedText = mentions.length ? mentions.join(' ') : 'الصلاحيات الافتراضية بالسيرفر';

    return {
        flags: IS_COMPONENTS_V2,
        allowedMentions: { parse: [] }, // بدون أي إشعار للمنشن
        components: [container([
            text(`# أوامر الامر \`${h.title}\` ${h.emoji}`),
            bar(),
            text(`**__الإختصارات:__**\n> ${shortcuts.join(', ')}`),
            bar(),
            text(`**__الرتب التي يمكنها استخدام الأمر:__**\n> ${allowedText}`),
            bar(),
            text(`**__أمثلة استخدام بلاختصارات:__**\n${h.examples(shortcuts[0], authorId).map(e => `> ${e}`).join('\n')}`),
            bar()
        ])]
    };
}

// نتيجة الإسكات: نص + شريط + زر "إعفاء الشخص"
function buildTimeoutPayload(targetId, endTimestamp, executorId) {
    return {
        flags: IS_COMPONENTS_V2,
        allowedMentions: { parse: [] },
        components: [container([
            text(`${EMOJI.time} — **تم إسكات الـ<@${targetId}> لمدة <t:${endTimestamp}:R>**`),
            bar(),
            {
                type: 1,
                components: [{
                    type: 2,
                    style: 2,
                    label: 'إعفاء الشخص',
                    emoji: { id: EMOJI.exemptionId },
                    custom_id: `untimeout_${targetId}_${executorId}`
                }]
            }
        ])]
    };
}

// بعد الضغط على الزر: تتغير الرسالة ويختفي الزر
function buildExemptedPayload(targetId, executorUsername) {
    return {
        flags: IS_COMPONENTS_V2,
        allowedMentions: { parse: [] },
        components: [container([
            text(`${EMOJI.exemption} — تم الإعفاء عن الـ<@${targetId}> بواسطة \`${executorUsername}\``)
        ])]
    };
}

module.exports = { buildModHelpPayload, buildTimeoutPayload, buildExemptedPayload };
