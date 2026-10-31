// commands/forum.js — تم استخراجه من index.js
const { ChannelType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    names: ["forum"],
    async execute(interaction, ctx) {
        const { isGuildPremium, ensureGuildData, getDB, saveDB } = ctx;

        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'script') {
            const categoryChannel = interaction.options.getChannel('category');
            const interval = parseInt(interaction.options.getString('interval') || '60');
            const status = interaction.options.getBoolean('status') ?? true;

            if (interval === 1 && !isGuildPremium(interaction.guildId)) {
                return interaction.reply({ content: '❌ **خيار "دقيقة واحدة" مخصص لمشتركي بريميوم فقط!**', ephemeral: true });
            }

            ensureGuildData(interaction.guildId);
            const db = getDB();
            if (!db[interaction.guildId].forumScript) db[interaction.guildId].forumScript = {};
            
            const fData = db[interaction.guildId].forumScript;
            fData.enabled = status;
            fData.categoryId = categoryChannel ? categoryChannel.id : null;
            fData.interval = interval;
            fData.lastPost = fData.lastPost || 0;

            if (!status) {
                saveDB(db);
                return interaction.reply({ content: '✅ **تم تعطيل نظام المنتدى للسكربتات بنجاح.**', ephemeral: true });
            }

            await interaction.deferReply({ ephemeral: true });

            try {
                // Create or find forum channel
                let forumChannel = interaction.guild.channels.cache.find(c => c.type === ChannelType.GuildForum && c.name.includes('ntl-scripts'));
                if (!forumChannel) {
                    forumChannel = await interaction.guild.channels.create({
                        name: '📜-ntl-scripts',
                        type: ChannelType.GuildForum,
                        parent: categoryChannel ? categoryChannel.id : null,
                        topic: 'نظام نشر السكربتات التلقائي من بوت NTL',
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [
                                    PermissionFlagsBits.SendMessages,
                                    PermissionFlagsBits.CreatePublicThreads,
                                    PermissionFlagsBits.CreatePrivateThreads,
                                    PermissionFlagsBits.SendMessagesInThreads,
                                    PermissionFlagsBits.AddReactions
                                ],
                                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                            }
                        ]
                    });
                } else if (categoryChannel) {
                    await forumChannel.setParent(categoryChannel.id).catch(() => {});
                }
                fData.channelId = forumChannel.id;
                fData.threads = fData.threads || {};

                async function fetchGameImage(gameName) {
                    try {
                        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';
                        const res = await axios.get(`https://scriptblox.com/api/script/search?q=${encodeURIComponent(gameName)}&page=1`, { 
                            headers: { 'User-Agent': userAgent },
                            timeout: 6000
                        }).catch(() => null);

                        const scripts = res?.data?.result?.scripts || [];
                        for (const s of scripts) {
                            if (s.game?.imageUrl && typeof s.game.imageUrl === 'string' && s.game.imageUrl.length > 5) {
                                return s.game.imageUrl.startsWith('http') ? s.game.imageUrl : `https://scriptblox.com${s.game.imageUrl}`;
                            }
                            if (s.image && typeof s.image === 'string' && s.image.length > 5) {
                                return s.image.startsWith('http') ? s.image : `https://scriptblox.com${s.image}`;
                            }
                        }
                    } catch (e) {}

                    const fallbackMap = {
                        'Blox Fruits': 'https://scriptblox.com/images/games/bloxfruits.png',
                        'Brookhaven RP': 'https://scriptblox.com/images/games/brookhaven.png',
                        'Adopt Me!': 'https://scriptblox.com/images/games/adoptme.png',
                        'Murder Mystery 2': 'https://scriptblox.com/images/games/mm2.png',
                        'Pet Simulator 99': 'https://scriptblox.com/images/games/ps99.png',
                        'Doors': 'https://scriptblox.com/images/games/doors.png',
                        'BedWars': 'https://scriptblox.com/images/games/bedwars.png',
                        'Arsenal': 'https://scriptblox.com/images/games/arsenal.png',
                        'King Legacy': 'https://scriptblox.com/images/games/kinglegacy.png',
                        'Bee Swarm Simulator': 'https://scriptblox.com/images/games/beeswarm.png',
                        'Jailbreak': 'https://scriptblox.com/images/games/jailbreak.png',
                        'Piggy': 'https://scriptblox.com/images/games/piggy.png',
                        'Royale High': 'https://scriptblox.com/images/games/royalehigh.png',
                        'Natural Disaster Survival': 'https://scriptblox.com/images/games/naturaldisaster.png',
                        'Pls Donate': 'https://scriptblox.com/images/games/plsdonate.png'
                    };
                    return fallbackMap[gameName] || null;
                }

                // Create threads for each game if they don't exist
                const SCRIPT_FORUM_GAMES = [
                    { name: 'Blox Fruits', fame: 'famous', description: 'Explore the vast seas and find mysterious fruits.', emoji: '🔥' },
                    { name: 'Brookhaven RP', fame: 'famous', description: 'Live in a luxury home and hang out with friends.', emoji: '🏠' },
                    { name: 'Adopt Me!', fame: 'famous', description: 'Raise pets and decorate your home.', emoji: '🥚' },
                    { name: 'Murder Mystery 2', fame: 'famous', description: 'Solve the mystery and catch the murderer.', emoji: '🔪' },
                    { name: 'Pet Simulator 99', fame: 'famous', description: 'Collect pets and earn coins.', emoji: '🐱' },
                    { name: 'Doors', fame: 'medium', description: 'Find your way through a haunted hotel.', emoji: '🚪' },
                    { name: 'BedWars', fame: 'medium', description: 'Defend your bed and destroy others.', emoji: '🛏️' },
                    { name: 'Arsenal', fame: 'medium', description: 'Fast-paced shooter with various weapons.', emoji: '🔫' },
                    { name: 'King Legacy', fame: 'medium', description: 'Action-adventure inspired by One Piece.', emoji: '👑' },
                    { name: 'Bee Swarm Simulator', fame: 'medium', description: 'Grow your own swarm of bees.', emoji: '🐝' },
                    { name: 'Jailbreak', fame: 'low', description: 'Live the life of a criminal or police officer.', emoji: '🚔' },
                    { name: 'Piggy', fame: 'low', description: 'Escape the killer in this horror game.', emoji: '🐷' },
                    { name: 'Royale High', fame: 'low', description: 'Dress up and go to school.', emoji: '🏰' },
                    { name: 'Natural Disaster Survival', fame: 'low', description: 'Survive various natural disasters.', emoji: '🌪️' },
                    { name: 'Pls Donate', fame: 'low', description: 'Donate and receive Robux.', emoji: '💸' }
                ];

                for (const game of SCRIPT_FORUM_GAMES) {
                    const threadName = `${game.emoji} ${game.name}`;
                    let thread = forumChannel.threads.cache.find(t => t.name === threadName);
                    if (!thread) {
                        const gameImg = await fetchGameImage(game.name);
                        const embed = new EmbedBuilder()
                            .setTitle(`🎮 **${game.name}**`)
                            .setDescription(`${game.description}\n\n-# سيتم نشر سكربتات جديدة لهذا الماب هنا تلقائياً كل **${interval}** دقيقة.`)
                            .setColor(0x2b2d31);
                        
                        if (gameImg) {
                            embed.setImage(gameImg);
                            embed.setThumbnail(gameImg);
                        }

                        thread = await forumChannel.threads.create({
                            name: threadName,
                            message: {
                                embeds: [embed]
                            }
                        });
                    }
                    fData.threads[game.name] = thread.id;
                }

                saveDB(db);
                return interaction.editReply({ content: `✅ **تم تفعيل نظام المنتدى بنجاح!**\nروم المنتدى: <#${forumChannel.id}>\nالمدة الزمنية: ${interval} دقيقة.` });
            } catch (err) {
                console.error('[Forum Script Setup Error]:', err);
                return interaction.editReply({ content: `❌ **حدث خطأ أثناء إعداد المنتدى:** ${err.message}` });
            }
        }
    }
};
