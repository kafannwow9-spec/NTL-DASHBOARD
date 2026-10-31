const { Client, GatewayIntentBits } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');

// البيانات الخاصة بمشروعك
const SUPABASE_URL = 'https://hxufdckcamwizvibevry.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dWZkY2tjYW13aXp2aWJldnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNTg3MDQsImV4cCI6MjA5NDkzNDcwNH0.qGDsPj5RZUB8iWeyw62ALyj1n5faD6LPHQl8DQt1ibA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// التوكن مدمج مباشرة في الكود
const TOKEN = 'MTUwOTY3MTI0OTg0Njk5MjkyNw.GIZN72.AZkVhVcilM85xLcN-YVEAGQiPeTToTBFzwhiSY';

// إنشاء عميل الديسكورد
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let messagesSentCount = 0;

client.once('ready', () => {
  console.log(`✅ البوت الثاني شغال باسم: ${client.user.tag}`);
  console.log('✅ تم الاتصال بـ Supabase بنجاح!');
  setInterval(syncWithSupabase, 30000);

  syncGuildsWithSupabase();
  setInterval(syncGuildsWithSupabase, 120000);
});

client.on('guildCreate', syncGuildsWithSupabase);
client.on('guildDelete', async (guild) => {
  try {
    await supabase.from('bot_guilds').delete().eq('id', guild.id);
  } catch (err) {
    console.error('❌ [Supabase Guild Delete Error]:', err.message);
  }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }
});

async function syncGuildsWithSupabase() {
  if (!client.isReady()) return;

  try {
    const guildsData = client.guilds.cache.map(guild => ({
      id: guild.id,
      name: guild.name,
      icon: guild.iconURL({ extension: 'png' }),
      member_count: guild.memberCount,
      updated_at: new Date()
    }));

    if (guildsData.length > 0) {
      await supabase.from('bot_guilds').upsert(guildsData);
    }
  } catch (err) {
    console.error('❌ [Supabase Guilds Sync Error]:', err.message);
  }
}

async function syncWithSupabase() {
  if (!client.isReady()) return;

  try {
    // 1. رفع الإحصائيات لـ Supabase للبوت الثاني
    await supabase.from('bot_stats').upsert({
      id: 'second_bot',
      bot_name: client.user.tag,
      guilds_count: client.guilds.cache.size,
      messages_count: messagesSentCount,
      uptime: Math.floor(client.uptime / 1000) + ' ثانية',
      updated_at: new Date()
    });

    // 2. فحص الرسائل المطلوبة من الداشبورد
    const { data: pending } = await supabase
      .from('pending_messages')
      .select('*')
      .eq('status', 'pending');

    if (pending && pending.length > 0) {
      for (const item of pending) {
        try {
          const channel = await client.channels.fetch(item.channel_id);
          if (channel) {
            await channel.send(item.message);
            messagesSentCount++;
            await supabase.from('pending_messages').update({ status: 'sent' }).eq('id', item.id);
          }
        } catch (err) {
          await supabase.from('pending_messages').update({ status: 'failed' }).eq('id', item.id);
        }
      }
    }
  } catch (err) {
    console.error('❌ [Supabase Sync Error]:', err.message);
  }
}

// تشغيل البوت بالسيرفر
if (TOKEN) {
  client.login(TOKEN).catch((err) => {
    console.error('❌ فشل تسجيل دخول البوت الثاني:', err.message);
  });
}

module.exports = { client };
