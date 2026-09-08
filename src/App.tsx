import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Layers, 
  ShieldAlert, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle, 
  ListMusic, 
  RefreshCw, 
  AlertTriangle, 
  Settings, 
  Lock,
  ChevronDown,
  Ticket,
  Shield,
  Lightbulb,
  Key,
  BookOpen,
  Music,
  Send,
  FileText,
  Menu,
  X,
  Edit3,
  Check,
  Sparkles,
  Copy,
  Radio,
  Users,
  Server,
  Bell,
  Terminal,
  Database,
  Activity,
  Code,
  ChevronRight,
  Languages
} from "lucide-react";

export interface ConsoleLogEntry {
  id: string;
  time: string;
  source: "CLIENT" | "SUPABASE" | "DISCORD_BOT" | "API_SERVER";
  type: "info" | "success" | "warn" | "error";
  title: string;
  message: string;
  details?: any;
}

interface GuildChannel {
  id: string;
  name: string;
}

interface GuildCategory {
  id: string;
  name: string;
}

interface GuildRole {
  id: string;
  name: string;
}

interface GuildInfo {
  id: string;
  name: string;
  icon: string;
  memberCount?: number;
  hasBot: boolean;
}

interface TicketPanel {
  id: string;
  name: string;
  channelId: string;
  categoryId: string;
  supportRoleId: string;
  title: string;
  description: string;
  color: string;
  buttonText: string;
  buttonEmoji: string;
  buttonStyle: "Primary" | "Success" | "Danger" | "Secondary";
  translationEnabled?: boolean;
  translationTitle?: string;
  translationDesc?: string;
}

interface SuggestionPanel {
  id: string;
  name: string;
  channelId: string;
  title: string;
  description: string;
  color: string;
  upvoteEmoji: string;
  downvoteEmoji: string;
  createThread: boolean;
  anonymous: boolean;
  translationEnabled?: boolean;
  translationTitle?: string;
  translationDesc?: string;
}

interface ProtectionItem {
  enabled: boolean;
  punishment: "kick" | "ban" | "timeout";
  punishmentDuration?: string;
  limit?: number;
  whitelistedRoles?: string[];
}

interface ProtectionSettings {
  permissions: ProtectionItem;
  roles: ProtectionItem;
  channels: ProtectionItem;
  bots: ProtectionItem;
  links: ProtectionItem;
  spam: ProtectionItem;
  massKick: ProtectionItem;
  massBan: ProtectionItem;
  webhooks: ProtectionItem;
  whitelistedRoles: string[];
}

interface AzkarSettings {
  enabled: boolean;
  channelId: string;
  intervalMinutes: number;
  categories: string[];
  color: string;
}

interface DeltaKeysSettings {
  enabled: boolean;
  channelId: string;
  keyDurationHours: number;
  autoDeleteMsg: boolean;
  bypassLink: string;
}

interface MusicSettings {
  enabled: boolean;
  channelId: string;
  djRoleId: string;
  defaultVolume: number;
  autoLeaveEmpty: boolean;
}

interface SimulatedTrack {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  requester: string;
}

const DEFAULT_TRACKS: SimulatedTrack[] = [
  {
    id: "t1",
    title: "Analog Horror Funk (6 7) - DJ Raulipues (Slowed + Reverb)",
    author: "Ezro ❤️",
    thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=120&auto=format&fit=crop&q=60",
    requester: "أحمد (احمد NTL)"
  },
  {
    id: "t2",
    title: "مهرجان مسجون حزين مين سمعني حمو الطيخا",
    author: "Mostafa Ali 🎤",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&auto=format&fit=crop&q=60",
    requester: "يوسف"
  }
];

export default function App() {
  // Navigation Active Tab
  const [activeTab, setActiveTab] = useState<"tickets" | "protection" | "suggestions" | "delta" | "azkar" | "music" | "broadcast" | "logs">("tickets");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Guild Selection State
  const [guilds, setGuilds] = useState<GuildInfo[]>([]);
  const [selectedGuildId, setSelectedGuildId] = useState<string>("");
  const [isLoadingGuilds, setIsLoadingGuilds] = useState(true);

  // Live Channels, Categories & Roles
  const [channels, setChannels] = useState<GuildChannel[]>([]);
  const [categories, setCategories] = useState<GuildCategory[]>([]);
  const [roles, setRoles] = useState<GuildRole[]>([]);
  const [guildStats, setGuildStats] = useState({ memberCount: 14, channelsCount: 5, categoriesCount: 3, rolesCount: 4 });
  const [hasBot, setHasBot] = useState(true);

  // Modular Settings State
  const [ticketPanels, setTicketPanels] = useState<TicketPanel[]>([
    {
      id: "panel-1",
      name: "الدعم الفني والشكاوى",
      channelId: "",
      categoryId: "",
      supportRoleId: "",
      title: "🎫 قسم الدعم الفني المباشر",
      description: "اضغط على الزر بالأسفل لفتح تكت تواصل مع فريق الدعم الفني والخدمات.",
      color: "#5865f2",
      buttonText: "إنشاء تكت دعم",
      buttonEmoji: "📩",
      buttonStyle: "Primary"
    }
  ]);

  const [suggestionPanels, setSuggestionPanels] = useState<SuggestionPanel[]>([
    {
      id: "sug-1",
      name: "اقتراحات السيرفر العامة",
      channelId: "",
      title: "💡 صندوق الاقتراحات والتطوير",
      description: "اكتب اقتراحك بالأسفل للتصويت عليه من قبل الأعضاء والإدارة.",
      color: "#f59e0b",
      upvoteEmoji: "👍",
      downvoteEmoji: "👎",
      createThread: true,
      anonymous: false
    }
  ]);

  const [protection, setProtection] = useState<ProtectionSettings>({
    permissions: { enabled: true, punishment: "kick" },
    roles: { enabled: true, punishment: "kick" },
    channels: { enabled: true, punishment: "kick" },
    bots: { enabled: true, punishment: "ban" },
    links: { enabled: false, punishment: "timeout", punishmentDuration: "1h" },
    spam: { enabled: true, punishment: "timeout", punishmentDuration: "10m" },
    massKick: { enabled: true, punishment: "ban", limit: 3 },
    massBan: { enabled: true, punishment: "ban", limit: 3 },
    webhooks: { enabled: true, punishment: "ban" },
    whitelistedRoles: []
  });

  const [azkar, setAzkar] = useState<AzkarSettings>({
    enabled: true,
    channelId: "",
    intervalMinutes: 30,
    categories: ["أذكار الصباح والمساء", "آيات قرآنية", "أدعية نبوية"],
    color: "#10b981"
  });

  const [deltaKeys, setDeltaKeys] = useState<DeltaKeysSettings>({
    enabled: true,
    channelId: "",
    keyDurationHours: 24,
    autoDeleteMsg: false,
    bypassLink: "http://13.250.130.150/api/bypass?url="
  });

  const [musicSettings, setMusicSettings] = useState<MusicSettings>({
    enabled: true,
    channelId: "",
    djRoleId: "",
    defaultVolume: 80,
    autoLeaveEmpty: true
  });

  // Direct Broadcast State
  const [broadcastChannelId, setBroadcastChannelId] = useState("");
  const [broadcastContent, setBroadcastContent] = useState("");
  const [broadcastType, setBroadcastType] = useState<"message" | "custom_embed">("message");
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastColor, setBroadcastColor] = useState("#5865F2");
  const [broadcastImage, setBroadcastImage] = useState("");
  const [broadcastFooter, setBroadcastFooter] = useState("");
  const [translationEnabled, setTranslationEnabled] = useState(false);
  const [translationTitle, setTranslationTitle] = useState("");
  const [translationDesc, setTranslationDesc] = useState("");

  // Saving / Feedback State
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Music Player Simulation State
  const [currentTrack, setCurrentTrack] = useState<SimulatedTrack | null>(DEFAULT_TRACKS[0]);
  const [queue, setQueue] = useState<SimulatedTrack[]>(DEFAULT_TRACKS.slice(1));
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(false);
  const [trackSeconds, setTrackSeconds] = useState(0);

  // Active Panel Modal / Editing Target
  const [editingPanelId, setEditingPanelId] = useState<string | null>(null);
  const [editingSugId, setEditingSugId] = useState<string | null>(null);

  // Live Terminal / Website Console State
  const [showConsoleDrawer, setShowConsoleDrawer] = useState(false);
  const [consoleFilter, setConsoleFilter] = useState<string>("ALL");
  const [supabaseAuditLogs, setSupabaseAuditLogs] = useState<any[]>([]);
  const [botViolations, setBotViolations] = useState<any[]>([]);

  const [consoleLogs, setConsoleLogs] = useState<ConsoleLogEntry[]>([
    {
      id: "init-1",
      time: new Date().toLocaleTimeString('ar-EG'),
      source: "CLIENT",
      type: "info",
      title: "🚀 تهيئة كونسول الموقع وتزامن Supabase",
      message: "نظام المراقبة المباشر للموقع يعمل الآن. سيتم عرض تفاصيل جميع الطلبات والاستجابات لحظياً."
    }
  ]);

  // Helper to add live console log
  const addConsoleLog = (
    source: "CLIENT" | "SUPABASE" | "DISCORD_BOT" | "API_SERVER",
    type: "info" | "success" | "warn" | "error",
    title: string,
    message: string,
    details?: any
  ) => {
    const newEntry: ConsoleLogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      time: new Date().toLocaleTimeString('ar-EG'),
      source,
      type,
      title,
      message,
      details
    };
    setConsoleLogs(prev => [newEntry, ...prev]);
  };

  // Logs Feed
  const [logs, setLogs] = useState<{ id: string; title: string; desc: string; time: string; user: string }[]>([
    {
      id: "log-1",
      title: "⚙️ تحديث إعدادات السيرفر عبر الداشبورد",
      desc: "تمت مزامنة وحدات التكتات والحماية بنجاح مع Supabase.",
      time: "منذ دقيقة",
      user: "مسؤول لوحة التحكم"
    }
  ]);

  // Show Toast Notification
  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch Audit Logs from Supabase
  const fetchAuditLogs = async (guildId: string) => {
    addConsoleLog("CLIENT", "info", "📜 استعلام سجلات التدقيق (Audit Logs)", `جاري جلب bot_logs من Supabase لسيرفر ID: ${guildId}...`);
    try {
      const res = await fetch(`/api/logs/${guildId}`);
      const data = await res.json();
      if (data.success) {
        setSupabaseAuditLogs(data.supabaseLogs || []);
        setBotViolations(data.botViolations || []);
        addConsoleLog("SUPABASE", "success", "✅ استجابة سجلات Supabase", `تم جلب ${data.supabaseLogs?.length || 0} سجل من Supabase و ${data.botViolations?.length || 0} مخالفة من البوت`, {
          botTag: data.botTag,
          botOnline: data.botOnline,
          logsCount: data.supabaseLogs?.length
        });
      }
    } catch (err: any) {
      addConsoleLog("API_SERVER", "error", "❌ خطأ جلب سجلات التدقيق", err.message);
    }
  };

  // 1. Fetch Guilds list on mount
  useEffect(() => {
    setIsLoadingGuilds(true);
    addConsoleLog("CLIENT", "info", "🌐 جلب قائمة السيرفرات", "جاري إرسال طلب GET إلى /api/guilds...");
    fetch("/api/guilds")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.guilds && data.guilds.length > 0) {
          setGuilds(data.guilds);
          setSelectedGuildId(data.guilds[0].id);
          addConsoleLog("SUPABASE", "success", "✅ استجابة السيرفرات من Supabase", `تم تحميل ${data.guilds.length} سيرفر بنجاح من Supabase.`, data.guilds);
        } else {
          // Fallback demo guild
          const defaultGuilds = [{ id: "123456789", name: "سيرفر NTL الرسمي", icon: "", hasBot: true }];
          setGuilds(defaultGuilds);
          setSelectedGuildId(defaultGuilds[0].id);
          addConsoleLog("CLIENT", "warn", "⚠️ تنبيه السيرفرات", "تم استخدام السيرفر الافتراضي.");
        }
      })
      .catch((err) => {
        console.error("Error fetching guilds:", err);
        addConsoleLog("API_SERVER", "error", "❌ خطأ في الاتصال", err.message);
      })
      .finally(() => setIsLoadingGuilds(false));
  }, []);

  // 2. Fetch Guild Settings & Channels whenever selectedGuildId changes
  useEffect(() => {
    if (!selectedGuildId) return;

    addConsoleLog("CLIENT", "info", "🌐 جلب إعدادات السيرفر", `طلب GET إلى /api/guild-settings/${selectedGuildId}...`);
    fetch(`/api/guild-settings/${selectedGuildId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHasBot(data.hasBot);
          if (data.stats) setGuildStats(data.stats);

          addConsoleLog("SUPABASE", "success", "✅ استجابة Supabase للإعدادات", `تم تحميل الإعدادات والقنوات (${data.channels?.length || 0} قناة) والرتب (${data.roles?.length || 0} رتبة) بنجاح.`, {
            hasBot: data.hasBot,
            stats: data.stats,
            settings: data.settings
          });

          addConsoleLog("DISCORD_BOT", data.hasBot ? "success" : "warn", "🤖 حالة البوت في السيرفر", data.hasBot ? "البوت متصل وموجود بالسيرفر ومستعد للعمل." : "البوت غير موجود بالسيرفر أو غير متصل.");

          // Update Channels, Categories, Roles
          const fetchedChannels: GuildChannel[] = data.channels || [];
          const fetchedCategories: GuildCategory[] = data.categories || [];
          const fetchedRoles: GuildRole[] = data.roles || [];

          setChannels(fetchedChannels);
          setCategories(fetchedCategories);
          setRoles(fetchedRoles);

          const defaultChannelId = fetchedChannels[0]?.id || "";
          const defaultCategoryId = fetchedCategories[0]?.id || "";
          const defaultRoleId = fetchedRoles[0]?.id || "";

          // Populate Settings
          const st = data.settings || {};

          // Panels
          if (st.panels && typeof st.panels === "object" && Object.keys(st.panels).length > 0) {
            const panelsArray: TicketPanel[] = Object.entries(st.panels).map(([pId, pObj]: [string, any]) => ({
              id: pId,
              name: pObj.name || `بانل ${pId}`,
              channelId: pObj.channelId || defaultChannelId,
              categoryId: pObj.categoryId || defaultCategoryId,
              supportRoleId: pObj.supportRoleId || defaultRoleId,
              title: pObj.title || "🎫 قسم الدعم الفني",
              description: pObj.description || "اضغط على الزر لفتح تكت جديد.",
              color: pObj.color || "#5865f2",
              buttonText: pObj.buttonText || "فتح تكت",
              buttonEmoji: pObj.buttonEmoji || "📩",
              buttonStyle: pObj.buttonStyle || "Primary"
            }));
            setTicketPanels(panelsArray);
          } else {
            setTicketPanels([
              {
                id: "panel-main",
                name: "بانل التكتات الرئيسي",
                channelId: defaultChannelId,
                categoryId: defaultCategoryId,
                supportRoleId: defaultRoleId,
                title: "🎫 قسم الدعم الفني والشكاوى",
                description: "اضغط على الزر بالأسفل لتواصل المباشر مع طاقم الدعم.",
                color: "#5865f2",
                buttonText: "إنشاء تكت دعم",
                buttonEmoji: "📩",
                buttonStyle: "Primary"
              }
            ]);
          }

          // Suggestions
          if (st.suggestions && typeof st.suggestions === "object") {
            if (Array.isArray(st.suggestions.panels)) {
              setSuggestionPanels(st.suggestions.panels);
            } else {
              setSuggestionPanels([
                {
                  id: "sug-main",
                  name: "بانل الاقتراحات",
                  channelId: st.suggestions.channelId || defaultChannelId,
                  title: st.suggestions.title || "💡 صندوق الاقتراحات والتطوير",
                  description: st.suggestions.description || "أرسل اقتراحك بالأسفل للتصويت عليه.",
                  color: "#f59e0b",
                  upvoteEmoji: "👍",
                  downvoteEmoji: "👎",
                  createThread: true,
                  anonymous: false
                }
              ]);
            }
          }

          // Protection
          if (st.protection) {
            setProtection((prev) => ({
              ...prev,
              ...st.protection
            }));
          }

          // Azkar
          if (st.azkar) {
            setAzkar((prev) => ({
              ...prev,
              channelId: st.azkar.channelId || defaultChannelId,
              ...st.azkar
            }));
          } else {
            setAzkar((prev) => ({ ...prev, channelId: defaultChannelId }));
          }

          // Delta Keys
          if (st.deltaKeys) {
            setDeltaKeys((prev) => ({
              ...prev,
              channelId: st.deltaKeys.channelId || defaultChannelId,
              ...st.deltaKeys
            }));
          } else {
            setDeltaKeys((prev) => ({ ...prev, channelId: defaultChannelId }));
          }

          // Music
          if (st.music) {
            setMusicSettings((prev) => ({
              ...prev,
              channelId: st.music.channelId || defaultChannelId,
              ...st.music
            }));
          } else {
            setMusicSettings((prev) => ({ ...prev, channelId: defaultChannelId }));
          }

          // Fetch Audit Logs
          fetchAuditLogs(selectedGuildId);
        }
      })
      .catch((err) => {
        console.error("Error fetching guild settings:", err);
        addConsoleLog("API_SERVER", "error", "❌ خطأ في استجابة إعدادات السيرفر", err.message);
      });
  }, [selectedGuildId]);

  // Save All Settings
  const handleSaveAll = async (broadcastPayload?: {
    channelId: string;
    type?: "broadcast" | "ticket_panel" | "suggestion_panel" | "azkar_now";
    panelId?: string;
    content?: string;
  }) => {
    if (!selectedGuildId) return;
    setIsSaving(true);

    // Format Ticket Panels Object
    const panelsObj: Record<string, any> = {};
    ticketPanels.forEach((p) => {
      panelsObj[p.id] = {
        ...p,
        buttons: p.buttons && p.buttons.length > 0 ? p.buttons : [{ name: p.buttonText || p.title || "فتح تذكرة", emoji: p.buttonEmoji || "📩", style: p.buttonStyle || "Primary" }],
        roles: p.roles || []
      };
    });

    // Format Suggestions Payload
    const suggestionsPayload = {
      panels: suggestionPanels,
      channelId: suggestionPanels[0]?.channelId || ""
    };

    const payload = {
      panels: panelsObj,
      suggestions: suggestionsPayload,
      azkar,
      protection,
      musicEnabled: musicSettings.enabled,
      music: musicSettings,
      deltaKeys,
      broadcastMessage: broadcastPayload
    };

    addConsoleLog("CLIENT", "info", "📤 إرسال حفظ التعديلات والمزامنة", `طلب POST إلى /api/save-guild-settings/${selectedGuildId}`, payload);

    try {
      const res = await fetch(`/api/save-guild-settings/${selectedGuildId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        addConsoleLog("SUPABASE", "success", "✅ استجابة الحفظ والمزامنة من Supabase", data.message, data.executionLog);
        
        if (data.executionLog?.broadcastDelivery) {
          const bLog = data.executionLog.broadcastDelivery;
          const isOk = bLog.status && bLog.status.includes("DELIVERED");
          addConsoleLog(
            "DISCORD_BOT",
            isOk ? "success" : "warn",
            "📢 نتيجة إرسال اللوحة / الإعلان المباشر عبر البوت",
            bLog.message || `حالة الإرسال: ${bLog.status} | روم ID: ${bLog.channelId}`,
            bLog
          );
        }

        showToast("✅ تم حفظ الإعدادات بنجاح ومزامنتها لحظياً عبر Supabase Realtime!", "success");
        setLogs((prev) => [
          {
            id: Date.now().toString(),
            title: "⚙️ حفظ وتطبيق إعدادات السيرفر",
            desc: "تم تحديث كافة الوحدات ومزامنتها فورياً.",
            time: "الآن",
            user: "مسؤول لوحة التحكم"
          },
          ...prev
        ]);
        fetchAuditLogs(selectedGuildId);
      } else {
        addConsoleLog("SUPABASE", "error", "❌ فشل حفظ التعديلات", data.error || "خطأ غير معروف", data);
        showToast("❌ حدث خطأ أثناء الحفظ في Supabase", "error");
      }
    } catch (err: any) {
      addConsoleLog("API_SERVER", "error", "❌ فشل الاتصال بالخادم عند الحفظ", err.message);
      showToast("فشل الاتصال بالخادم عند الحفظ: " + err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper Functions for Ticket Panels
  const handleCreateTicketPanel = () => {
    const newId = `panel-${Date.now()}`;
    const newPanel: TicketPanel = {
      id: newId,
      name: `بانل جديد (${ticketPanels.length + 1})`,
      channelId: channels[0]?.id || "",
      categoryId: categories[0]?.id || "",
      supportRoleId: roles[0]?.id || "",
      title: "🎫 قسم دعم جديد",
      description: "يرجى الضغط على الزر لفتح تكت تواصل معنا.",
      color: "#5865f2",
      buttonText: "فتح تكت",
      buttonEmoji: "📩",
      buttonStyle: "Primary"
    };
    setTicketPanels((prev) => [...prev, newPanel]);
    setEditingPanelId(newId);
    showToast("تم إنشاء بانل تكتات جديد! يمكنك تعديله وإرساله الآن.", "success");
  };

  const handleDeleteTicketPanel = (id: string) => {
    if (ticketPanels.length <= 1) {
      showToast("لا يمكن حذف البانل الوحيد المتبقي!", "error");
      return;
    }
    setTicketPanels((prev) => prev.filter((p) => p.id !== id));
    if (editingPanelId === id) setEditingPanelId(null);
    showToast("تم حذف البانل بنجاح.", "success");
  };

  // Helper Functions for Suggestion Panels
  const handleCreateSuggestionPanel = () => {
    const newId = `sug-${Date.now()}`;
    const newPanel: SuggestionPanel = {
      id: newId,
      name: `قناة اقتراحات (${suggestionPanels.length + 1})`,
      channelId: channels[0]?.id || "",
      title: "💡 صندوق الاقتراحات والتطوير",
      description: "أرسل اقتراحك بالأسفل للتصويت عليه من قبل الأعضاء.",
      color: "#f59e0b",
      upvoteEmoji: "👍",
      downvoteEmoji: "👎",
      createThread: true,
      anonymous: false
    };
    setSuggestionPanels((prev) => [...prev, newPanel]);
    setEditingSugId(newId);
    showToast("تم إنشاء بانل اقتراحات جديد!", "success");
  };

  const handleDeleteSuggestionPanel = (id: string) => {
    if (suggestionPanels.length <= 1) {
      showToast("لا يمكن حذف البانل الوحيد المتبقي!", "error");
      return;
    }
    setSuggestionPanels((prev) => prev.filter((p) => p.id !== id));
    if (editingSugId === id) setEditingSugId(null);
    showToast("تم حذف بانل الاقتراحات.", "success");
  };

  // Send Broadcast Message
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastChannelId || (!broadcastContent.trim() && !broadcastTitle.trim())) {
      showToast("يرجى اختيار الروم وتحديد محتوى الرسالة أو العنوان أولاً!", "error");
      return;
    }

    const payload: any = {
      channelId: broadcastChannelId,
      type: broadcastType,
      content: broadcastContent
    };

    if (broadcastType === "custom_embed") {
      payload.embedData = {
        type: "v2",
        title: broadcastTitle,
        description: broadcastContent,
        color: broadcastColor,
        img: broadcastImage,
        footer: broadcastFooter,
        translationEnabled: translationEnabled,
        translationTitle: translationTitle,
        translationDesc: translationDesc
      };
    }

    handleSaveAll(payload);

    setBroadcastContent("");
    setBroadcastTitle("");
    showToast("تم إرسال الرسالة / الإعلان إلى قائمة الانتظار للمزامنة اللحظية!", "success");
  };

  return (
    <div className="flex h-screen w-full bg-[#1e1f22] text-[#dbdee1] font-sans overflow-hidden dir-rtl" dir="rtl">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl border text-sm font-bold flex items-center gap-3 animate-bounce ${
          toastMessage.type === "success" 
            ? "bg-emerald-900/90 text-emerald-200 border-emerald-500/40" 
            : "bg-rose-900/90 text-rose-200 border-rose-500/40"
        }`}>
          {toastMessage.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-rose-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* 1. Primary Left Sidebar - Servers List */}
      <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-4 gap-3 border-l border-black/30 shrink-0 hidden sm:flex">
        {/* NTL Logo / Icon */}
        <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg hover:scale-105 transition-transform cursor-pointer">
          NTL
        </div>

        <div className="w-8 h-[2px] bg-[#35363c] rounded-full mx-auto my-1"></div>

        {/* Guilds Selection Icons */}
        <div className="flex-1 w-full overflow-y-auto space-y-2 px-3">
          {guilds.map((g) => {
            const isSelected = g.id === selectedGuildId;
            return (
              <button
                key={g.id}
                onClick={() => setSelectedGuildId(g.id)}
                className={`w-12 h-12 rounded-[24px] hover:rounded-2xl transition-all flex items-center justify-center text-xs font-bold border relative group cursor-pointer ${
                  isSelected 
                    ? "bg-[#5865f2] text-white border-white/20 rounded-2xl shadow-lg scale-105" 
                    : "bg-[#313338] text-gray-300 border-white/5 hover:bg-[#5865f2] hover:text-white"
                }`}
                title={g.name}
              >
                {g.icon ? (
                  <img src={g.icon} alt={g.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span>{g.name.slice(0, 3).toUpperCase()}</span>
                )}
                {isSelected && (
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-white rounded-l-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Secondary Navigation Sidebar (Dedicated Buttons Replacement for "Overview") */}
      <div className={`w-64 bg-[#2b2d31] flex flex-col shrink-0 border-l border-black/20 text-right ${mobileMenuOpen ? "fixed inset-y-0 right-0 z-40" : "hidden md:flex"}`}>
        
        {/* Guild Header Switcher */}
        <div className="h-14 border-b border-black/20 flex items-center justify-between px-4 font-bold text-white shadow-sm shrink-0 bg-[#2b2d31]">
          <div className="flex items-center gap-2 min-w-0">
            <Server className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="truncate text-sm font-bold text-slate-100">
              {guilds.find((g) => g.id === selectedGuildId)?.name || "اختر السيرفر"}
            </span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono border border-emerald-500/30">
            نشط
          </span>
        </div>

        {/* Navigation Modules Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-[#949ba4] px-3 mb-2 tracking-wider">
            قائمة وحدات التحكم والأنظمة
          </div>

          {/* Ticket Panels Navigation Button */}
          <button
            onClick={() => { setActiveTab("tickets"); setMobileMenuOpen(false); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "tickets" 
                ? "bg-[#5865f2] text-white shadow-md scale-[1.02]" 
                : "text-slate-300 hover:bg-[#35373c] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Ticket className="w-4 h-4 text-indigo-300" />
              <span>إدارة التكتات (Ticket Panels)</span>
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono">
              {ticketPanels.length}
            </span>
          </button>

          {/* Protection System Navigation Button */}
          <button
            onClick={() => { setActiveTab("protection"); setMobileMenuOpen(false); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "protection" 
                ? "bg-[#5865f2] text-white shadow-md scale-[1.02]" 
                : "text-slate-300 hover:bg-[#35373c] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>نظام الحماية (Protection)</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
              شامل
            </span>
          </button>

          {/* Suggestions System Navigation Button */}
          <button
            onClick={() => { setActiveTab("suggestions"); setMobileMenuOpen(false); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "suggestions" 
                ? "bg-[#5865f2] text-white shadow-md scale-[1.02]" 
                : "text-slate-300 hover:bg-[#35373c] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>نظام الاقتراحات (Suggestions)</span>
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono">
              {suggestionPanels.length}
            </span>
          </button>

          {/* Delta Bypass Keys Navigation Button */}
          <button
            onClick={() => { setActiveTab("delta"); setMobileMenuOpen(false); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "delta" 
                ? "bg-[#5865f2] text-white shadow-md scale-[1.02]" 
                : "text-slate-300 hover:bg-[#35373c] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>تخطي الدلتا (Delta Bypass)</span>
            </div>
          </button>

          {/* Azkar & Quran Navigation Button */}
          <button
            onClick={() => { setActiveTab("azkar"); setMobileMenuOpen(false); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "azkar" 
                ? "bg-[#5865f2] text-white shadow-md scale-[1.02]" 
                : "text-slate-300 hover:bg-[#35373c] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>الأذكار والقرآن (Azkar)</span>
            </div>
          </button>

          {/* Music System Navigation Button */}
          <button
            onClick={() => { setActiveTab("music"); setMobileMenuOpen(false); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "music" 
                ? "bg-[#5865f2] text-white shadow-md scale-[1.02]" 
                : "text-slate-300 hover:bg-[#35373c] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Music className="w-4 h-4 text-violet-400" />
              <span>مشغل الموسيقى (Music System)</span>
            </div>
            <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full font-mono">
              Lavalink
            </span>
          </button>

          {/* Broadcast & Direct Messages Navigation Button */}
          <button
            onClick={() => { setActiveTab("broadcast"); setMobileMenuOpen(false); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "broadcast" 
                ? "bg-[#5865f2] text-white shadow-md scale-[1.02]" 
                : "text-slate-300 hover:bg-[#35373c] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Send className="w-4 h-4 text-blue-400" />
              <span>إرسال إعلان (Broadcast)</span>
            </div>
          </button>

          {/* Activity Logs Navigation Button */}
          <button
            onClick={() => { setActiveTab("logs"); setMobileMenuOpen(false); }}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "logs" 
                ? "bg-[#5865f2] text-white shadow-md scale-[1.02]" 
                : "text-slate-300 hover:bg-[#35373c] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-rose-400" />
              <span>سجلات الأحداث (Audit Logs)</span>
            </div>
          </button>

        </div>

        {/* Global Save Action inside Navigation Sidebar */}
        <div className="p-3 bg-[#232428] border-t border-black/20 shrink-0 space-y-2">
          <button
            onClick={() => handleSaveAll()}
            disabled={isSaving}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Check className="w-4 h-4 text-white" />
            )}
            <span>{isSaving ? "جاري الحفظ والمزامنة..." : "حفظ جميع التعديلات"}</span>
          </button>
        </div>

      </div>

      {/* 3. Main Workspace / Content Display Area */}
      <div className="flex-1 bg-[#313338] flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="h-14 border-b border-black/20 flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#313338]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white p-1"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              {activeTab === "tickets" && <><Ticket className="w-5 h-5 text-indigo-400" /><span>إدارة بانلات التكتات</span></>}
              {activeTab === "protection" && <><Shield className="w-5 h-5 text-emerald-400" /><span>نظام الحماية الشامل للبوت</span></>}
              {activeTab === "suggestions" && <><Lightbulb className="w-5 h-5 text-amber-400" /><span>إدارة قنوات الاقتراحات</span></>}
              {activeTab === "delta" && <><Key className="w-5 h-5 text-cyan-400" /><span>إعدادات نظام تخطي الدلتا</span></>}
              {activeTab === "azkar" && <><BookOpen className="w-5 h-5 text-teal-400" /><span>نظام نشر الأذكار والآيات القرآنية</span></>}
              {activeTab === "music" && <><Music className="w-5 h-5 text-violet-400" /><span>مشغل وإعدادات الموسيقى</span></>}
              {activeTab === "broadcast" && <><Send className="w-5 h-5 text-blue-400" /><span>إرسال إعلان مباشر لرومات السيرفر</span></>}
              {activeTab === "logs" && <><FileText className="w-5 h-5 text-rose-400" /><span>سجلات البوت والنشاط اللحظي</span></>}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConsoleDrawer(!showConsoleDrawer)}
              className="px-3 py-1.5 bg-[#2b2d31] hover:bg-[#35373c] border border-white/10 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
              title="فتح كونسول الموقع المباشر"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">كونسول الموقع</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-[#2b2d31] px-3 py-1.5 rounded-xl border border-white/5">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>{guildStats.memberCount} عضو</span>
            </div>
            
            <button
              onClick={() => handleSaveAll()}
              disabled={isSaving}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>حفظ</span>
            </button>
          </div>
        </div>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">

          {/* ========================================================= */}
          {/* TAB 1: TICKETS (TICKET PANELS - PANEL BY PANEL)          */}
          {/* ========================================================= */}
          {activeTab === "tickets" && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#2b2d31] p-5 rounded-2xl border border-white/5">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-indigo-400" />
                    <span>إدارة تكتات السيرفر (بانل بانل)</span>
                  </h3>
                  <p className="text-xs text-[#949ba4] mt-1">
                    يمكنك إنشاء وتعديل وحذف كل بانل بشكل مستقل وإرسال رسالة البانل المخصصة لأي روم بالسيرفر.
                  </p>
                </div>

                <button
                  onClick={handleCreateTicketPanel}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>إنشاء بانل تكت جديد</span>
                </button>
              </div>

              {/* List of Ticket Panels (Panel by Panel Display) */}
              <div className="space-y-6">
                {ticketPanels.map((panel, idx) => {
                  const isEditing = editingPanelId === panel.id;
                  return (
                    <div key={panel.id} className="bg-[#2b2d31] rounded-2xl border border-white/5 overflow-hidden shadow-xl transition-all">
                      
                      {/* Panel Card Header */}
                      <div className="p-4 bg-[#232428] border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center font-bold text-xs font-mono">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-white">{panel.name}</h4>
                            <span className="text-[10px] text-[#949ba4] font-mono">ID: {panel.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingPanelId(isEditing ? null : panel.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              isEditing ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-[#35373c] text-slate-200 hover:bg-[#404249]"
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isEditing ? "إغلاق التعديل" : "تعديل البانل"}</span>
                          </button>

                          <button
                            onClick={() => {
                              if (!panel.channelId) {
                                showToast("يرجى تحديد روم إرسال البانل أولاً!", "error");
                                return;
                              }
                              handleSaveAll({
                                channelId: panel.channelId,
                                type: "ticket_panel",
                                panelId: panel.id,
                                content: `📩 **[لوحة التذاكر]**: ${panel.title}`
                              });
                            }}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>إرسال للروم</span>
                          </button>

                          <button
                            onClick={() => handleDeleteTicketPanel(panel.id)}
                            className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition cursor-pointer"
                            title="حذف البانل"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Panel Card Body (Embed Preview + Form Editor) */}
                      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Live Discord Embed Visualizer */}
                        <div className="space-y-3">
                          <span className="text-[11px] font-bold text-[#949ba4] uppercase font-mono tracking-wider">
                            معاينة شكل البانل بالديسكورد
                          </span>
                          
                          <div className="bg-[#313338] rounded-xl p-4 border-r-4 shadow-lg space-y-3" style={{ borderColor: panel.color }}>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{panel.title}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                              {panel.description}
                            </p>
                            
                            <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                              <button className="px-4 py-1.5 bg-[#5865f2] text-white rounded text-xs font-bold flex items-center gap-1.5 shadow">
                                <span>{panel.buttonEmoji}</span>
                                <span>{panel.buttonText}</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Editor Controls */}
                        {isEditing ? (
                          <div className="space-y-4 bg-[#1e1f22]/50 p-4 rounded-xl border border-white/5 text-xs">
                            
                            <div>
                              <label className="block text-slate-300 mb-1 font-semibold">اسم البانل بالداشبورد:</label>
                              <input
                                type="text"
                                value={panel.name}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, name: val } : p)));
                                }}
                                className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 font-semibold">روم إرسال البانل:</label>
                                <select
                                  value={panel.channelId}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, channelId: val } : p)));
                                  }}
                                  className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                                >
                                  {channels.map((c) => (
                                    <option key={c.id} value={c.id}>#{c.name}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-slate-300 mb-1 font-semibold">كاتيجوري التكتات:</label>
                                <select
                                  value={panel.categoryId}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, categoryId: val } : p)));
                                  }}
                                  className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                                >
                                  {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>📂 {cat.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 font-semibold">عنوان الإيمبد:</label>
                                <input
                                  type="text"
                                  value={panel.title}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, title: val } : p)));
                                  }}
                                  className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-slate-300 mb-1 font-semibold">رتبة الدعم الفني المسؤول:</label>
                                <select
                                  value={panel.supportRoleId}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, supportRoleId: val } : p)));
                                  }}
                                  className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                                >
                                  {roles.map((r) => (
                                    <option key={r.id} value={r.id}>@{r.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-slate-300 mb-1 font-semibold">الوصف / الرسالة:</label>
                              <textarea
                                rows={2}
                                value={panel.description}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, description: val } : p)));
                                }}
                                className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 font-semibold">نص الزر:</label>
                                <input
                                  type="text"
                                  value={panel.buttonText}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, buttonText: val } : p)));
                                  }}
                                  className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-slate-300 mb-1 font-semibold">إيموجي الزر:</label>
                                <input
                                  type="text"
                                  value={panel.buttonEmoji}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, buttonEmoji: val } : p)));
                                  }}
                                  className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Translation Button Section for Ticket Panel */}
                            <div className="mt-4 p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-indigo-300 flex items-center gap-2">
                                  <Languages className="w-4 h-4" />
                                  <span>زر الترجمة التلقائية</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, translationEnabled: !p.translationEnabled } : p)));
                                  }}
                                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${panel.translationEnabled ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"}`}
                                >
                                  {panel.translationEnabled ? "إزالة الزر" : "إضافة زر الترجمة"}
                                </button>
                              </div>
                              
                              {panel.translationEnabled && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <div>
                                    <label className="block text-slate-400 text-[10px] font-bold mb-1">العنوان المترجم (English):</label>
                                    <input
                                      type="text"
                                      value={panel.translationTitle || ""}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, translationTitle: val } : p)));
                                      }}
                                      className="w-full bg-[#1e1f22] border border-indigo-500/30 rounded-lg px-3 py-2 text-white focus:outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-400 text-[10px] font-bold mb-1">الوصف المترجم (English):</label>
                                    <textarea
                                      rows={2}
                                      value={panel.translationDesc || ""}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setTicketPanels((prev) => prev.map((p) => (p.id === panel.id ? { ...p, translationDesc: val } : p)));
                                      }}
                                      className="w-full bg-[#1e1f22] border border-indigo-500/30 rounded-lg px-3 py-2 text-white focus:outline-none"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                          </div>
                        ) : (
                          <div className="flex flex-col justify-center bg-[#1e1f22]/30 p-4 rounded-xl border border-white/5 space-y-2 text-xs text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-[#949ba4]">الروم المستهدف:</span>
                              <span className="font-bold text-indigo-400">#{channels.find((c) => c.id === panel.channelId)?.name || panel.channelId || "غير محدد"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#949ba4]">الكاتيجوري:</span>
                              <span className="font-bold text-slate-100">📂 {categories.find((c) => c.id === panel.categoryId)?.name || "افتراضي"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#949ba4]">رتبة الدعم:</span>
                              <span className="font-bold text-emerald-400">@{roles.find((r) => r.id === panel.supportRoleId)?.name || "الجميع"}</span>
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: PROTECTION SYSTEM (ALL PROTECTIONS ENABLED)       */}
          {/* ========================================================= */}
          {activeTab === "protection" && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              <div className="bg-[#2b2d31] p-5 rounded-2xl border border-white/5 space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>لوحة الحماية الشاملة وضبط الصلاحيات (Anti-Abuse)</span>
                </h3>
                <p className="text-xs text-[#949ba4] leading-relaxed">
                  قم بتفعيل خيارات الحماية لحماية السيرفر من التخريب، سحب الصلاحيات، مسح القنوات، إضافة البوتات الضارة، أو طرد الأعضاء بكثرة.
                </p>
              </div>

              {/* Grid of ALL Protections */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Protection Card Item 1 */}
                <div className="bg-[#2b2d31] p-4 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>حماية الصلاحيات</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={protection.permissions.enabled}
                        onChange={(e) => setProtection({ ...protection, permissions: { ...protection.permissions, enabled: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#949ba4]">منع إعطاء صلاحيات خطيرة أو سحب الإدارة بدون إذن.</p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#949ba4]">العقاب:</span>
                    <select
                      value={protection.permissions.punishment}
                      onChange={(e) => setProtection({ ...protection, permissions: { ...protection.permissions, punishment: e.target.value as any } })}
                      className="bg-[#1e1f22] border border-[#3f4147] rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="kick">طرد (Kick)</option>
                      <option value="ban">حظر (Ban)</option>
                      <option value="timeout">سحب رتب</option>
                    </select>
                  </div>
                </div>

                {/* Protection Card Item 2 */}
                <div className="bg-[#2b2d31] p-4 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span>حماية الرتب</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={protection.roles.enabled}
                        onChange={(e) => setProtection({ ...protection, roles: { ...protection.roles, enabled: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#949ba4]">منع تعديل أو حذف رتب السيرفر من غير المصرح لهم.</p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#949ba4]">العقاب:</span>
                    <select
                      value={protection.roles.punishment}
                      onChange={(e) => setProtection({ ...protection, roles: { ...protection.roles, punishment: e.target.value as any } })}
                      className="bg-[#1e1f22] border border-[#3f4147] rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="kick">طرد (Kick)</option>
                      <option value="ban">حظر (Ban)</option>
                    </select>
                  </div>
                </div>

                {/* Protection Card Item 3 */}
                <div className="bg-[#2b2d31] p-4 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>حماية القنوات</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={protection.channels.enabled}
                        onChange={(e) => setProtection({ ...protection, channels: { ...protection.channels, enabled: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#949ba4]">حظر وإلغاء مسح القنوات النصية والصوتية فوراً.</p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#949ba4]">العقاب:</span>
                    <select
                      value={protection.channels.punishment}
                      onChange={(e) => setProtection({ ...protection, channels: { ...protection.channels, punishment: e.target.value as any } })}
                      className="bg-[#1e1f22] border border-[#3f4147] rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="kick">طرد (Kick)</option>
                      <option value="ban">حظر (Ban)</option>
                    </select>
                  </div>
                </div>

                {/* Protection Card Item 4 */}
                <div className="bg-[#2b2d31] p-4 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-rose-400" />
                      <span>حماية البوتات الإضافية</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={protection.bots.enabled}
                        onChange={(e) => setProtection({ ...protection, bots: { ...protection.bots, enabled: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#949ba4]">طرد أي بوت جديد يتم إدخاله وحظر الشخص الذي قام بإدخاله.</p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#949ba4]">العقاب:</span>
                    <select
                      value={protection.bots.punishment}
                      onChange={(e) => setProtection({ ...protection, bots: { ...protection.bots, punishment: e.target.value as any } })}
                      className="bg-[#1e1f22] border border-[#3f4147] rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="ban">حظر مباشر (Ban)</option>
                      <option value="kick">طرد (Kick)</option>
                    </select>
                  </div>
                </div>

                {/* Protection Card Item 5 */}
                <div className="bg-[#2b2d31] p-4 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-cyan-400" />
                      <span>حماية الروابط الإعلانية</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={protection.links.enabled}
                        onChange={(e) => setProtection({ ...protection, links: { ...protection.links, enabled: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#949ba4]">حذف روابط الديسكورد والمواقع الخارجية تلقائياً.</p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#949ba4]">العقاب:</span>
                    <select
                      value={protection.links.punishment}
                      onChange={(e) => setProtection({ ...protection, links: { ...protection.links, punishment: e.target.value as any } })}
                      className="bg-[#1e1f22] border border-[#3f4147] rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="timeout">تايم أوت ساعتان</option>
                      <option value="kick">طرد</option>
                    </select>
                  </div>
                </div>

                {/* Protection Card Item 6 */}
                <div className="bg-[#2b2d31] p-4 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>حماية السپام والتكرار</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={protection.spam.enabled}
                        onChange={(e) => setProtection({ ...protection, spam: { ...protection.spam, enabled: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#949ba4]">منع تكرار الرسائل المزعجة والتاغات المتكررة.</p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#949ba4]">العقاب:</span>
                    <select
                      value={protection.spam.punishment}
                      onChange={(e) => setProtection({ ...protection, spam: { ...protection.spam, punishment: e.target.value as any } })}
                      className="bg-[#1e1f22] border border-[#3f4147] rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="timeout">تايم أوت 10 دقائق</option>
                      <option value="kick">طرد</option>
                    </select>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: SUGGESTIONS PANELS                                */}
          {/* ========================================================= */}
          {activeTab === "suggestions" && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#2b2d31] p-5 rounded-2xl border border-white/5">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    <span>إدارة قنوات الاقتراحات وإرسالها</span>
                  </h3>
                  <p className="text-xs text-[#949ba4] mt-1">
                    يمكنك إنشاء أكثر من وحدة اقتراحات وتحديد الروم المناسب لكل وحدة بشكل منفصل.
                  </p>
                </div>

                <button
                  onClick={handleCreateSuggestionPanel}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>إنشاء قناة اقتراحات جديدة</span>
                </button>
              </div>

              {/* Suggestions Cards List */}
              <div className="space-y-6">
                {suggestionPanels.map((sug, idx) => {
                  const isEditing = editingSugId === sug.id;
                  return (
                    <div key={sug.id} className="bg-[#2b2d31] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                      
                      <div className="p-4 bg-[#232428] border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center font-bold text-xs font-mono">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-white">{sug.name}</h4>
                            <span className="text-[10px] text-[#949ba4]">روم: #{channels.find((c) => c.id === sug.channelId)?.name || sug.channelId || "غير محدد"}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingSugId(isEditing ? null : sug.id)}
                            className="px-3 py-1.5 bg-[#35373c] hover:bg-[#404249] text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isEditing ? "إغلاق التعديل" : "تعديل الإعدادات"}</span>
                          </button>

                          <button
                            onClick={() => {
                              if (!sug.channelId) {
                                showToast("يرجى تحديد روم إرسال لوحة الاقتراحات أولاً!", "error");
                                return;
                              }
                              handleSaveAll({
                                channelId: sug.channelId,
                                type: "suggestion_panel",
                                panelId: sug.id,
                                content: `💡 **[صندوق الاقتراحات والتطوير]**: ${sug.title}`
                              });
                            }}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>إرسال للروم</span>
                          </button>

                          <button
                            onClick={() => handleDeleteSuggestionPanel(sug.id)}
                            className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Preview */}
                        <div className="space-y-3">
                          <span className="text-[11px] font-bold text-[#949ba4] uppercase font-mono">شكل رسالة الاقتراح</span>
                          <div className="bg-[#313338] rounded-xl p-4 border-r-4 border-amber-500 shadow space-y-3">
                            <h4 className="font-bold text-white text-sm">{sug.title}</h4>
                            <p className="text-xs text-slate-300">{sug.description}</p>
                            <div className="pt-2 border-t border-white/5 flex items-center gap-3 text-xs">
                              <span className="bg-[#1e1f22] px-2.5 py-1 rounded text-emerald-400 border border-white/5 font-bold">{sug.upvoteEmoji} 14</span>
                              <span className="bg-[#1e1f22] px-2.5 py-1 rounded text-rose-400 border border-white/5 font-bold">{sug.downvoteEmoji} 2</span>
                              {sug.createThread && <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">🧵 ثريد نقاش تلقائي</span>}
                            </div>
                          </div>
                        </div>

                        {/* Form */}
                        {isEditing && (
                          <div className="space-y-4 bg-[#1e1f22]/50 p-4 rounded-xl border border-white/5 text-xs">
                            <div>
                              <label className="block text-slate-300 mb-1 font-semibold">روم نشر الاقتراحات:</label>
                              <select
                                value={sug.channelId}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSuggestionPanels((prev) => prev.map((item) => (item.id === sug.id ? { ...item, channelId: val } : item)));
                                }}
                                className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                              >
                                {channels.map((c) => (
                                  <option key={c.id} value={c.id}>#{c.name}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-slate-300 mb-1 font-semibold">عنوان الإيمبد:</label>
                              <input
                                type="text"
                                value={sug.title}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSuggestionPanels((prev) => prev.map((item) => (item.id === sug.id ? { ...item, title: val } : item)));
                                }}
                                className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 font-semibold">إيموجي التاييد:</label>
                                <input
                                  type="text"
                                  value={sug.upvoteEmoji}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSuggestionPanels((prev) => prev.map((item) => (item.id === sug.id ? { ...item, upvoteEmoji: val } : item)));
                                  }}
                                  className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-slate-300 mb-1 font-semibold">إيموجي الرفض:</label>
                                <input
                                  type="text"
                                  value={sug.downvoteEmoji}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setSuggestionPanels((prev) => prev.map((item) => (item.id === sug.id ? { ...item, downvoteEmoji: val } : item)));
                                  }}
                                  className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Translation Button Section for Suggestion Panel */}
                            <div className="mt-4 p-3 bg-amber-500/5 rounded-xl border border-amber-500/20">
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-amber-300 flex items-center gap-2">
                                  <Languages className="w-4 h-4" />
                                  <span>زر الترجمة التلقائية</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSuggestionPanels((prev) => prev.map((s) => (s.id === sug.id ? { ...s, translationEnabled: !s.translationEnabled } : s)));
                                  }}
                                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${sug.translationEnabled ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"}`}
                                >
                                  {sug.translationEnabled ? "إزالة الزر" : "إضافة زر الترجمة"}
                                </button>
                              </div>
                              
                              {sug.translationEnabled && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <div>
                                    <label className="block text-slate-400 text-[10px] font-bold mb-1">العنوان المترجم (English):</label>
                                    <input
                                      type="text"
                                      value={sug.translationTitle || ""}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setSuggestionPanels((prev) => prev.map((s) => (s.id === sug.id ? { ...s, translationTitle: val } : s)));
                                      }}
                                      className="w-full bg-[#1e1f22] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-400 text-[10px] font-bold mb-1">الوصف المترجم (English):</label>
                                    <textarea
                                      rows={2}
                                      value={sug.translationDesc || ""}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setSuggestionPanels((prev) => prev.map((s) => (s.id === sug.id ? { ...s, translationDesc: val } : s)));
                                      }}
                                      className="w-full bg-[#1e1f22] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: DELTA BYPASS                                      */}
          {/* ========================================================= */}
          {activeTab === "delta" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-[#2b2d31] p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-cyan-400" />
                  <span>تخطي الدلتا ونظام المفاتيح (Delta Bypass Keys)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">روم إرسال التخطي / المفاتيح:</label>
                    <select
                      value={deltaKeys.channelId}
                      onChange={(e) => setDeltaKeys({ ...deltaKeys, channelId: e.target.value })}
                      className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                    >
                      {channels.map((c) => (
                        <option key={c.id} value={c.id}>#{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">مدة صلاحية المفتاح (بالساعات):</label>
                    <input
                      type="number"
                      value={deltaKeys.keyDurationHours}
                      onChange={(e) => setDeltaKeys({ ...deltaKeys, keyDurationHours: parseInt(e.target.value) || 24 })}
                      className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">رابط تخطي الدلتا المباشر (Bypass Endpoint):</label>
                  <input
                    type="text"
                    value={deltaKeys.bypassLink}
                    onChange={(e) => setDeltaKeys({ ...deltaKeys, bypassLink: e.target.value })}
                    className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none font-mono text-cyan-300"
                  />
                </div>

                <button
                  onClick={() => {
                    if (!deltaKeys.channelId) {
                      showToast("يرجى تحديد روم إرسال تخطي الدلتا أولاً!", "error");
                      return;
                    }
                    handleSaveAll({
                      channelId: deltaKeys.channelId,
                      type: "broadcast",
                      content: `🔑 **[مفتاح تخطي الدلتا - Delta Bypass Key]**\n\n**رابط التخطي والمفتاح المباشر:** ${deltaKeys.bypassLink || 'http://13.250.130.150/api/bypass?url='}\n**مدة الصلاحية:** ${deltaKeys.keyDurationHours} ساعة`
                    });
                  }}
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال المفتاح ورابط التخطي إلى القناة الآن</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: AZKAR                                              */}
          {/* ========================================================= */}
          {activeTab === "azkar" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-[#2b2d31] p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  <span>نظام نشر الأذكار والآيات القرآنية</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">روم نشر الأذكار:</label>
                    <select
                      value={azkar.channelId}
                      onChange={(e) => setAzkar({ ...azkar, channelId: e.target.value })}
                      className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                    >
                      <option value="">-- اختر القناة النصية --</option>
                      {channels.map((c) => (
                        <option key={c.id} value={c.id}>#{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">معدل التكرار (بالدقائق):</label>
                    <input
                      type="number"
                      value={azkar.intervalMinutes}
                      onChange={(e) => setAzkar({ ...azkar, intervalMinutes: parseInt(e.target.value) || 30 })}
                      className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!azkar.channelId) {
                      showToast("يرجى تحديد روم نشر الأذكار أولاً!", "error");
                      return;
                    }
                    handleSaveAll({
                      channelId: azkar.channelId,
                      type: "azkar_now",
                      content: `🌸 **[تفعيل وإرسال الأذكار]**`
                    });
                  }}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  <Send className="w-4 h-4" />
                  <span>تطبيق وحفظ إعدادات الأذكار وبدء النشر التلقائي</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: MUSIC PLAYER & SYSTEM                             */}
          {/* ========================================================= */}
          {activeTab === "music" && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              <div className="bg-[#2b2d31] p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Music className="w-5 h-5 text-violet-400" />
                    <span>إعدادات وتشغيل سيرفر الموسيقى (Lavalink)</span>
                  </h3>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={musicSettings.enabled}
                      onChange={(e) => setMusicSettings({ ...musicSettings, enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">روم الشات المخصص للأوامر:</label>
                    <select
                      value={musicSettings.channelId}
                      onChange={(e) => setMusicSettings({ ...musicSettings, channelId: e.target.value })}
                      className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                    >
                      {channels.map((c) => (
                        <option key={c.id} value={c.id}>#{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">رتبة الـ DJ المسموح لها:</label>
                    <select
                      value={musicSettings.djRoleId}
                      onChange={(e) => setMusicSettings({ ...musicSettings, djRoleId: e.target.value })}
                      className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>@{r.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Music Player Simulator Box */}
              <div className="bg-[#2b2d31] p-6 rounded-2xl border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-white">مشغل الموسيقى المباشر (Now Playing)</h4>
                
                {currentTrack ? (
                  <div className="bg-[#1e1f22] p-5 rounded-xl border-r-4 border-emerald-500 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={currentTrack.thumbnail} alt="thumb" className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-bold text-white text-sm">{currentTrack.title}</h5>
                        <p className="text-xs text-[#949ba4]">{currentTrack.author} • بطلب من @{currentTrack.requester}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-full">
                        {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                      </button>
                      <button onClick={() => setCurrentTrack(null)} className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-full">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400 text-xs">لا توجد أغانٍ قيد التشغيل حالياً</div>
                )}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: BROADCAST                                          */}
          {/* ========================================================= */}
          {activeTab === "broadcast" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <form onSubmit={handleSendBroadcast} className="bg-[#2b2d31] p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-400" />
                  <span>إرسال إعلان مباشر ورسالة فورية لروم بالسيرفر</span>
                </h3>

                <div className="text-xs space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">نوع الرسالة:</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setBroadcastType("message")}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold transition ${broadcastType === "message" ? "bg-blue-600 text-white border-blue-500" : "bg-[#1e1f22] text-slate-400 border-[#3f4147]"}`}
                        >
                          رسالة عادية
                        </button>
                        <button
                          type="button"
                          onClick={() => setBroadcastType("custom_embed")}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold transition ${broadcastType === "custom_embed" ? "bg-indigo-600 text-white border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]" : "bg-[#1e1f22] text-slate-400 border-[#3f4147]"}`}
                        >
                          Embed Components V2
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">اختر الروم المراد الإرسال إليها:</label>
                      <select
                        value={broadcastChannelId}
                        onChange={(e) => setBroadcastChannelId(e.target.value)}
                        className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                      >
                        <option value="">-- اختر القناة النصية --</option>
                        {channels.map((c) => (
                          <option key={c.id} value={c.id}>#{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {broadcastType === "custom_embed" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-2 border-t border-white/5 mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">عنوان الإيمبد (Title):</label>
                          <input
                            type="text"
                            value={broadcastTitle}
                            onChange={(e) => setBroadcastTitle(e.target.value)}
                            className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">لون الجانب (Color):</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={broadcastColor}
                              onChange={(e) => setBroadcastColor(e.target.value)}
                              className="h-9 w-12 bg-transparent border-0 p-0 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={broadcastColor}
                              onChange={(e) => setBroadcastColor(e.target.value)}
                              className="flex-1 bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white font-mono text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">رابط صورة (Image URL):</label>
                        <input
                          type="text"
                          value={broadcastImage}
                          onChange={(e) => setBroadcastImage(e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-lg px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-indigo-300 font-bold flex items-center gap-2">
                            <Languages className="w-4 h-4" />
                            <span>زر الترجمة التلقائية (Translation Button)</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setTranslationEnabled(!translationEnabled)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${translationEnabled ? "bg-rose-600 hover:bg-rose-500 text-white border-rose-500" : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500"}`}
                          >
                            {translationEnabled ? (
                              <>
                                <X className="w-3.5 h-3.5" />
                                <span>إزالة زر الترجمة</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>إضافة زر الترجمة</span>
                              </>
                            )}
                          </button>
                        </div>
                        
                        {translationEnabled && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="space-y-3 pt-2 overflow-hidden">
                            <p className="text-[10px] text-slate-400">سيظهر زر أسفل الإيمبد عند الضغط عليه يترجم المحتوى للغة الإنجليزية.</p>
                            <div>
                              <label className="block text-slate-400 text-[10px] font-bold mb-1">العنوان بالإنجليزية (English Title):</label>
                              <input
                                type="text"
                                value={translationTitle}
                                onChange={(e) => setTranslationTitle(e.target.value)}
                                className="w-full bg-[#1e1f22] border border-indigo-500/30 rounded-lg px-3 py-2 text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-[10px] font-bold mb-1">الوصف بالإنجليزية (English Description):</label>
                              <textarea
                                rows={3}
                                value={translationDesc}
                                onChange={(e) => setTranslationDesc(e.target.value)}
                                className="w-full bg-[#1e1f22] border border-indigo-500/30 rounded-lg px-3 py-2 text-white focus:outline-none"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">{broadcastType === "message" ? "محتوى الإعلان / الرسالة:" : "محتوى الإيمبد (Description):"}</label>
                    <textarea
                      rows={4}
                      value={broadcastContent}
                      onChange={(e) => setBroadcastContent(e.target.value)}
                      placeholder={broadcastType === "message" ? "اكتب الإعلان هنا..." : "اكتب وصف الإيمبد هنا (يدعم المارك داون والمكونات)..."}
                      className="w-full bg-[#1e1f22] border border-[#3f4147] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال الإعلان الآن عبر البوت</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: LOGS & WEBSITE LIVE CONSOLE                        */}
          {/* ========================================================= */}
          {activeTab === "logs" && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              {/* Header Banner */}
              <div className="bg-[#2b2d31] p-6 rounded-2xl border border-white/5 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Terminal className="w-6 h-6 text-cyan-400" />
                      <span>كونسول الموقع وسجلات أحداث Supabase والبوت</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      مراقبة حية ولحظية لكل طلبات الشبكة، استجابات Supabase، وحالة المزامنة المباشرة مع البوت.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Supabase Realtime: OK
                    </span>
                    <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-indigo-400" />
                      Server API: Connected
                    </span>
                  </div>
                </div>
              </div>

              {/* 1. Website Live Terminal Console */}
              <div className="bg-[#1e1f22] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-[#2b2d31] px-5 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold text-white font-mono">Website Live Network & Database Terminal</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const text = consoleLogs.map(l => `[${l.time}] [${l.source}] [${l.type.toUpperCase()}] ${l.title}: ${l.message}`).join('\n');
                        navigator.clipboard.writeText(text);
                        showToast("✅ تم نسخ سجلات الكونسول إلى الحافظة!", "success");
                      }}
                      className="px-3 py-1 bg-[#35373c] hover:bg-[#3f4147] text-white rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>نسخ الكونسول</span>
                    </button>

                    <button
                      onClick={() => setConsoleLogs([])}
                      className="px-3 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>مسح</span>
                    </button>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="px-5 py-2.5 bg-[#232428] border-b border-white/5 flex flex-wrap gap-2 text-xs font-mono">
                  {["ALL", "CLIENT", "SUPABASE", "DISCORD_BOT", "API_SERVER"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setConsoleFilter(f)}
                      className={`px-3 py-1 rounded-lg transition font-semibold cursor-pointer ${
                        consoleFilter === f
                          ? "bg-cyan-600 text-white shadow"
                          : "bg-[#2b2d31] text-slate-400 hover:text-white"
                      }`}
                    >
                      {f === "ALL" && "الكل (All Logs)"}
                      {f === "CLIENT" && "🌐 Client UI"}
                      {f === "SUPABASE" && "⚡ Supabase DB"}
                      {f === "DISCORD_BOT" && "🤖 Discord Bot"}
                      {f === "API_SERVER" && "🖥️ Express API"}
                    </button>
                  ))}
                </div>

                {/* Console Terminal Logs Stream */}
                <div className="p-4 space-y-2.5 max-h-[420px] overflow-y-auto font-mono text-xs bg-[#111214]">
                  {consoleLogs
                    .filter(log => consoleFilter === "ALL" || log.source === consoleFilter)
                    .map((log) => (
                      <div key={log.id} className="p-3 bg-[#1e1f22] rounded-xl border border-white/5 space-y-1 hover:border-cyan-500/30 transition">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#949ba4] text-[10px]">{log.time}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.source === "SUPABASE" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                              log.source === "DISCORD_BOT" ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" :
                              log.source === "CLIENT" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" :
                              "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            }`}>
                              [{log.source}]
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.type === "success" ? "text-emerald-400" :
                              log.type === "error" ? "text-rose-400" :
                              log.type === "warn" ? "text-amber-400" : "text-cyan-400"
                            }`}>
                              {log.type.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="font-bold text-white text-xs pt-1">{log.title}</div>
                        <p className="text-slate-300 leading-relaxed text-[11px] whitespace-pre-wrap">{log.message}</p>

                        {log.details && (
                          <details className="mt-2 text-[10px]">
                            <summary className="text-cyan-400 cursor-pointer hover:underline font-semibold select-none">
                              🔍 عرض تفاصيل الاستجابة واستجابة السيرفر (JSON Object)
                            </summary>
                            <pre className="mt-1.5 p-2.5 bg-[#0b0c0d] text-emerald-300 rounded-lg overflow-x-auto border border-emerald-500/20 font-mono">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    ))}

                  {consoleLogs.length === 0 && (
                    <div className="text-center py-8 text-slate-500">الكونسول فارغ حالياً.</div>
                  )}
                </div>
              </div>

              {/* 2. Supabase Audit Logs (bot_logs) */}
              <div className="bg-[#2b2d31] p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <span>سجلات التغييرات والأحداث المخزنة في Supabase (`bot_logs`)</span>
                  </h3>

                  <button
                    onClick={() => selectedGuildId && fetchAuditLogs(selectedGuildId)}
                    className="p-1.5 bg-[#35373c] hover:bg-[#3f4147] text-white rounded-lg transition"
                    title="تحديث"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {supabaseAuditLogs.length > 0 ? (
                    supabaseAuditLogs.map((log: any) => (
                      <div key={log.id || Math.random()} className="p-4 bg-[#1e1f22] rounded-xl border border-white/5 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{log.action_title || "تحديث إعدادات"}</span>
                          <span className="text-[10px] text-[#949ba4] font-mono">
                            {log.created_at ? new Date(log.created_at).toLocaleString('ar-EG') : 'الآن'}
                          </span>
                        </div>
                        <p className="text-slate-300">{log.description || "تحديث إعدادات السيرفر عبر لوحة التحكم"}</p>
                        <div className="text-[10px] text-indigo-400 font-mono">
                          بواسطة: {log.user_info || "مسؤول الداشبورد"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-[#1e1f22] rounded-xl border border-white/5 text-slate-400 text-xs text-center">
                      لا توجد سجلات محفوظة في جدول Supabase حالياً لهذا السيرفر.
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Bot Protection Violations */}
              {botViolations.length > 0 && (
                <div className="bg-[#2b2d31] p-6 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <span>مخالفات وأحداث نظام الحماية المنفذة بواسطة البوت</span>
                  </h3>

                  <div className="space-y-3">
                    {botViolations.map((v: any) => (
                      <div key={v.id} className="p-4 bg-[#1e1f22] rounded-xl border border-rose-500/20 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-rose-300">مخالفة: {v.action}</span>
                          <span className="text-[10px] text-[#949ba4] font-mono">
                            {v.timestamp ? new Date(v.timestamp).toLocaleString('ar-EG') : 'الآن'}
                          </span>
                        </div>
                        <p className="text-slate-300">المخالف: {v.username} ({v.userId})</p>
                        <p className="text-emerald-400">العقوبة المطبقة: {v.punishmentTaken}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* ========================================================= */}
      {/* FLOATING LIVE WEBSITE CONSOLE DRAWER                      */}
      {/* ========================================================= */}
      {showConsoleDrawer && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111214] border-t-2 border-cyan-500 shadow-2xl max-h-[380px] flex flex-col font-mono animate-in slide-in-from-bottom duration-200">
          <div className="bg-[#2b2d31] px-4 py-2.5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">كونسول الموقع المباشر (Website Live Terminal Inspector)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setConsoleLogs([])}
                className="px-2.5 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 rounded text-[11px] font-bold transition cursor-pointer"
              >
                مسح
              </button>

              <button
                onClick={() => setShowConsoleDrawer(false)}
                className="p-1 hover:bg-[#35373c] text-slate-300 hover:text-white rounded transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-3 overflow-y-auto space-y-2 text-xs flex-1 bg-[#0e0f11]">
            {consoleLogs.map((log) => (
              <div key={log.id} className="p-2 bg-[#1e1f22] rounded-lg border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">{log.time}</span>
                    <span className="text-cyan-400 font-bold">[{log.source}]</span>
                    <span className={log.type === "success" ? "text-emerald-400 font-bold" : log.type === "error" ? "text-rose-400 font-bold" : "text-amber-400 font-bold"}>
                      {log.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="font-bold text-white text-[11px]">{log.title}</div>
                <div className="text-slate-300 text-[11px]">{log.message}</div>
                {log.details && (
                  <pre className="p-1.5 bg-[#070708] text-emerald-400 rounded text-[10px] overflow-x-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
