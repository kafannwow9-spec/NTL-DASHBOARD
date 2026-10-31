import React, { useState } from "react";
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Ban, 
  Clock, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  AlertCircle, 
  HelpCircle, 
  UserCheck, 
  UserX, 
  Users, 
  User, 
  CheckCircle2, 
  Command, 
  Zap,
  RotateCcw,
  Info
} from "lucide-react";

export interface ModerationCommandConfig {
  enabled: boolean;
  name: string;
  label: string;
  description: string;
  shortcuts: string[];
  allowedRoles: string[];
  allowedUsers: string[];
  deniedRoles: string[];
  deniedUsers: string[];
  defaultPermission: string;
}

export interface ModerationSettings {
  enabled: boolean;
  commands: {
    lock: ModerationCommandConfig;
    unlock: ModerationCommandConfig;
    ban: ModerationCommandConfig;
    unban: ModerationCommandConfig;
    timeout: ModerationCommandConfig;
    untimeout: ModerationCommandConfig;
    hide: ModerationCommandConfig;
    unhide: ModerationCommandConfig;
    message: ModerationCommandConfig;
  };
}

export const defaultModerationSettings: ModerationSettings = {
  enabled: true,
  commands: {
    lock: {
      enabled: true,
      name: "lock",
      label: "قفل الروم (Lock)",
      description: "قفل الشات ومنع الأعضاء من إرسال الرسائل في الروم",
      shortcuts: ["lock", "قفل"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "ManageChannels"
    },
    unlock: {
      enabled: true,
      name: "unlock",
      label: "فتح الروم (Unlock)",
      description: "إعادة فتح الروم والسماح للأعضاء بالكتابة مجدداً",
      shortcuts: ["unlock", "فتح"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "ManageChannels"
    },
    ban: {
      enabled: true,
      name: "ban",
      label: "حظر عضو (Ban)",
      description: "حظر عضو نهائياً من السيرفر ومسح رسائله",
      shortcuts: ["ban", "b", "حظر"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "BanMembers"
    },
    unban: {
      enabled: true,
      name: "unban",
      label: "إلغاء حظر عضو (Unban)",
      description: "إلغاء حظر عضو سابق باستخدام الآيدي الخاص به",
      shortcuts: ["unban", "فك_حظر", "فك_البان"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "BanMembers"
    },
    timeout: {
      enabled: true,
      name: "timeout",
      label: "إسكات مؤقت (Timeout)",
      description: "إعطاء تايم أوت وإسكات مؤقت لعضو لمدة محددة (10m, 1h, 1d...)",
      shortcuts: ["tm", "timeout", "mute", "اسكت"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "ModerateMembers"
    },
    untimeout: {
      enabled: true,
      name: "untimeout",
      label: "إلغاء الإسكات (Untimeout)",
      description: "إلغاء الإسكات المؤقت عن العضو فوراً قبل انتهاء المدة",
      shortcuts: ["untimeout", "untm", "تكلم", "الغاء_الاسكات"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "ModerateMembers"
    },
    hide: {
      enabled: true,
      name: "hide",
      label: "إخفاء الروم (Hide)",
      description: "إخفاء الروم وجعله غير مرئي للأعضاء العاديين في السيرفر",
      shortcuts: ["hide", "اخفاء"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "ManageChannels"
    },
    unhide: {
      enabled: true,
      name: "unhide",
      label: "إظهار الروم (Unhide)",
      description: "إعادة إظهار الروم ليراه جميع الأعضاء",
      shortcuts: ["unhide", "اظهار"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "ManageChannels"
    },
    message: {
      enabled: true,
      name: "message",
      label: "إرسال رسالة (Message)",
      description: "إرسال رسالة مباشرة من البوت إلى روم محددة في السيرفر",
      shortcuts: ["msg", "message", "رسالة", "قول"],
      allowedRoles: [],
      allowedUsers: [],
      deniedRoles: [],
      deniedUsers: [],
      defaultPermission: "ManageMessages"
    }
  }
};

interface GuildRole {
  id: string;
  name: string;
  color?: string;
}

interface GuildMember {
  id: string;
  name: string;
  displayName?: string;
  avatar?: string;
}

interface ModerationTabProps {
  settings: ModerationSettings;
  setSettings: React.Dispatch<React.SetStateAction<ModerationSettings>>;
  roles: GuildRole[];
  members?: GuildMember[];
  onSave: () => void;
  isSaving: boolean;
  showToast: (text: string, type?: "success" | "error") => void;
}

export default function ModerationTab({
  settings,
  setSettings,
  roles,
  members = [],
  onSave,
  isSaving,
  showToast
}: ModerationTabProps) {
  // State for which command cards are expanded (Accordion)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    timeout: true,
    ban: true,
    lock: false,
    unlock: false,
    untimeout: false,
    unban: false,
    hide: false,
    unhide: false,
    message: false
  });

  // State for new shortcut inputs per command
  const [newShortcutInput, setNewShortcutInput] = useState<Record<string, string>>({});
  // State for new user inputs per command (allowed & denied)
  const [newAllowedUserInput, setNewAllowedUserInput] = useState<Record<string, string>>({});
  const [newDeniedUserInput, setNewDeniedUserInput] = useState<Record<string, string>>({});

  const toggleExpand = (cmdKey: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cmdKey]: !prev[cmdKey]
    }));
  };

  const getCmdIcon = (key: string) => {
    switch (key) {
      case "lock":
        return <Lock className="w-5 h-5 text-amber-400" />;
      case "unlock":
        return <Unlock className="w-5 h-5 text-emerald-400" />;
      case "ban":
        return <Ban className="w-5 h-5 text-rose-500" />;
      case "unban":
        return <RotateCcw className="w-5 h-5 text-teal-400" />;
      case "timeout":
        return <Clock className="w-5 h-5 text-indigo-400" />;
      case "untimeout":
        return <CheckCircle2 className="w-5 h-5 text-sky-400" />;
      case "hide":
        return <EyeOff className="w-5 h-5 text-purple-400" />;
      case "unhide":
        return <Eye className="w-5 h-5 text-green-400" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-blue-400" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
    }
  };

  const updateCommand = (cmdKey: string, updates: Partial<ModerationCommandConfig>) => {
    setSettings(prev => {
      const current = prev.commands[cmdKey as keyof typeof prev.commands];
      if (!current) return prev;
      return {
        ...prev,
        commands: {
          ...prev.commands,
          [cmdKey]: {
            ...current,
            ...updates
          }
        }
      };
    });
  };

  // Add a shortcut
  const handleAddShortcut = (cmdKey: string) => {
    const val = (newShortcutInput[cmdKey] || "").trim().toLowerCase();
    if (!val) return;
    
    const cmd = settings.commands[cmdKey as keyof typeof settings.commands];
    if (cmd.shortcuts.includes(val)) {
      showToast("هذا الاختصار مضاف مسبقاً لهذا الأمر!", "error");
      return;
    }

    updateCommand(cmdKey, {
      shortcuts: [...cmd.shortcuts, val]
    });
    setNewShortcutInput(prev => ({ ...prev, [cmdKey]: "" }));
    showToast(`تمت إضافة الاختصار "${val}" بنجاح`, "success");
  };

  // Remove a shortcut
  const handleRemoveShortcut = (cmdKey: string, shortcutToRemove: string) => {
    const cmd = settings.commands[cmdKey as keyof typeof settings.commands];
    if (cmd.shortcuts.length <= 1) {
      showToast("يجب أن يحتوي الأمر على اختصار واحد على الأقل!", "error");
      return;
    }
    updateCommand(cmdKey, {
      shortcuts: cmd.shortcuts.filter(s => s !== shortcutToRemove)
    });
  };

  // Toggle role in allowedRoles or deniedRoles
  const handleToggleRole = (cmdKey: string, roleId: string, type: "allowed" | "denied") => {
    const cmd = settings.commands[cmdKey as keyof typeof settings.commands];
    if (type === "allowed") {
      const currentRoles = cmd.allowedRoles || [];
      const updated = currentRoles.includes(roleId)
        ? currentRoles.filter(id => id !== roleId)
        : [...currentRoles, roleId];
      // Also remove from denied if adding to allowed
      const updatedDenied = (cmd.deniedRoles || []).filter(id => id !== roleId);
      updateCommand(cmdKey, { allowedRoles: updated, deniedRoles: updatedDenied });
    } else {
      const currentRoles = cmd.deniedRoles || [];
      const updated = currentRoles.includes(roleId)
        ? currentRoles.filter(id => id !== roleId)
        : [...currentRoles, roleId];
      // Also remove from allowed if adding to denied
      const updatedAllowed = (cmd.allowedRoles || []).filter(id => id !== roleId);
      updateCommand(cmdKey, { deniedRoles: updated, allowedRoles: updatedAllowed });
    }
  };

  // Add specific user to allowed or denied
  const handleAddUser = (cmdKey: string, type: "allowed" | "denied") => {
    const inputVal = type === "allowed" 
      ? (newAllowedUserInput[cmdKey] || "").trim()
      : (newDeniedUserInput[cmdKey] || "").trim();
    if (!inputVal) return;

    // Clean user ID or username
    const cleanId = inputVal.replace(/[<@!>]/g, "").trim();
    const cmd = settings.commands[cmdKey as keyof typeof settings.commands];

    if (type === "allowed") {
      const current = cmd.allowedUsers || [];
      if (current.includes(cleanId)) {
        showToast("هذا المستخدم مضاف مسبقاً!", "error");
        return;
      }
      updateCommand(cmdKey, { allowedUsers: [...current, cleanId] });
      setNewAllowedUserInput(prev => ({ ...prev, [cmdKey]: "" }));
    } else {
      const current = cmd.deniedUsers || [];
      if (current.includes(cleanId)) {
        showToast("هذا المستخدم مضاف مسبقاً!", "error");
        return;
      }
      updateCommand(cmdKey, { deniedUsers: [...current, cleanId] });
      setNewDeniedUserInput(prev => ({ ...prev, [cmdKey]: "" }));
    }
    showToast("تمت إضافة العضو بنجاح", "success");
  };

  // Remove specific user
  const handleRemoveUser = (cmdKey: string, userId: string, type: "allowed" | "denied") => {
    const cmd = settings.commands[cmdKey as keyof typeof settings.commands];
    if (type === "allowed") {
      updateCommand(cmdKey, { allowedUsers: (cmd.allowedUsers || []).filter(id => id !== userId) });
    } else {
      updateCommand(cmdKey, { deniedUsers: (cmd.deniedUsers || []).filter(id => id !== userId) });
    }
  };

  const commandKeys: (keyof typeof settings.commands)[] = [
    "lock",
    "unlock",
    "ban",
    "unban",
    "timeout",
    "untimeout",
    "hide",
    "unhide",
    "message"
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner & Save Action */}
      <div className="bg-[#2b2d31] p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </span>
            <h2 className="text-xl font-bold text-white">نظام الإشراف الشامل وإدارة الأوامر</h2>
            <span className="text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
              Components V2
            </span>
          </div>
          <p className="text-xs text-[#949ba4] leading-relaxed">
            تحكم كامل بأوامر الإشراف، تخصيص الاختصارات، تحديد الرتب والأعضاء المسموح لهم والممنوعين، ورسائل الرد التفاعلية مع أزرار الإعفاء المباشرة.
          </p>
        </div>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer shrink-0"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>جاري الحفظ...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>حفظ إعدادات الإشراف</span>
            </>
          )}
        </button>
      </div>

      {/* Guide & Rules Notice */}
      <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent p-4 rounded-xl border border-amber-500/20 text-xs text-[#dbdee1] flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <p className="font-bold text-white">طريقة عمل الاختصارات والصلاحيات:</p>
          <p className="text-[#949ba4]">
            • عند كتابة الاختصار بمفرده في الشات (مثل <code className="text-amber-300 font-mono">tm</code> أو <code className="text-amber-300 font-mono">ban</code>)، سيرسل البوت إيمبد <span className="text-indigo-300 font-semibold">Components V2</span> يوضح تفاصيل الأمر وأمثلته ورتب المشرفين بدون إرسال إشعارات.
          </p>
          <p className="text-[#949ba4]">
            • عند كتابة الاختصار مع المنشن والمدة (مثل <code className="text-emerald-300 font-mono">tm @someone 10m</code>)، يقوم البوت بتطبيق الإسكات فوراً مع زر إعفاء خاص لا يمكن الضغط عليه إلا من قبل المشرف الذي أعطى التايم أوت.
          </p>
          <p className="text-[#949ba4]">
            • إذا تركت حقل الرتب فارغاً، ستعتمد الصلاحية تلقائياً على الصلاحية الافتراضية للشخص في السيرفر.
          </p>
        </div>
      </div>

      {/* Grid / List of Command Cards */}
      <div className="space-y-4">
        {commandKeys.map(cmdKey => {
          const cmd = settings.commands[cmdKey] || defaultModerationSettings.commands[cmdKey];
          const isExpanded = !!expandedCards[cmdKey];

          return (
            <div
              key={cmdKey}
              className={`bg-[#2b2d31] rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded ? "border-indigo-500/40 shadow-lg shadow-black/20" : "border-white/5 hover:border-white/10"
              }`}
            >
              {/* Card Header (Click to expand / collapse) */}
              <div
                onClick={() => toggleExpand(cmdKey)}
                className="p-4 flex items-center justify-between cursor-pointer select-none bg-gradient-to-r from-white/[0.02] to-transparent hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1e1f22] border border-white/5">
                    {getCmdIcon(cmdKey)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{cmd.label}</h4>
                      <code className="text-[11px] px-2 py-0.5 rounded bg-black/40 text-amber-300 font-mono border border-white/5">
                        {cmd.name}
                      </code>
                    </div>
                    <p className="text-xs text-[#949ba4] mt-0.5 line-clamp-1">{cmd.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                  {/* Badges preview */}
                  <div className="hidden sm:flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-[#1e1f22] text-[#949ba4] border border-white/5 text-[11px] font-mono">
                      {cmd.shortcuts.length} اختصارات
                    </span>

                    {cmd.allowedRoles.length > 0 || cmd.allowedUsers.length > 0 ? (
                      <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px]">
                        {cmd.allowedRoles.length} رتب / {cmd.allowedUsers.length} أعضاء
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                        صلاحية السيرفر ({cmd.defaultPermission})
                      </span>
                    )}
                  </div>

                  {/* Enable / Disable Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer mr-1">
                    <input
                      type="checkbox"
                      checked={cmd.enabled}
                      onChange={e => updateCommand(cmdKey, { enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>

                  {/* Arrow Indicator (rotates smoothly up when collapsed, down when expanded) */}
                  <button
                    onClick={() => toggleExpand(cmdKey)}
                    type="button"
                    className="p-1.5 rounded-lg bg-[#1e1f22] text-[#949ba4] hover:text-white border border-white/5 transition-transform duration-300 cursor-pointer"
                    title={isExpanded ? "إغلاق التفاصيل" : "فتح وتعديل الإعدادات"}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? "rotate-0 text-indigo-400" : "-rotate-90 text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Collapsible Details Panel */}
              {isExpanded && (
                <div className="p-5 border-t border-white/5 bg-[#232428] space-y-6">
                  {/* 1. Shortcuts / Aliases Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>الاختصارات (Shortcuts & Aliases):</span>
                      </label>
                      <span className="text-[11px] text-[#949ba4]">
                        اكتب الكلمة واضغط إضافة لتفعيل الاختصار في الشات
                      </span>
                    </div>

                    {/* Tags List */}
                    <div className="flex flex-wrap items-center gap-2 p-3 bg-[#1e1f22] rounded-xl border border-white/5 min-h-[46px]">
                      {cmd.shortcuts.map(shortcut => (
                        <span
                          key={shortcut}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2b2d31] text-amber-300 border border-amber-500/20 text-xs font-mono font-bold shadow-sm"
                        >
                          <span>{shortcut}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveShortcut(cmdKey, shortcut)}
                            className="hover:text-rose-400 text-gray-400 transition-colors cursor-pointer"
                            title="حذف الاختصار"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}

                      {/* Add input */}
                      <div className="flex items-center gap-2 grow">
                        <input
                          type="text"
                          placeholder="أدخل اختصار جديد..."
                          value={newShortcutInput[cmdKey] || ""}
                          onChange={e => setNewShortcutInput(prev => ({ ...prev, [cmdKey]: e.target.value }))}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddShortcut(cmdKey);
                            }
                          }}
                          className="bg-transparent border-0 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-0 min-w-[140px] grow py-1 px-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddShortcut(cmdKey)}
                          className="px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>إضافة</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. Allowed Roles & Users (من يمكنه استعمال هذا الأمر) */}
                  <div className="space-y-4 pt-3 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-400" />
                        <h5 className="font-bold text-xs text-white">من يمكنه استعمال هذا الأمر:</h5>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-medium">
                        (اختيار رتب متعددة أو إضافة أشخاص محددين)
                      </span>
                    </div>

                    <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-xs text-[#949ba4] flex items-center gap-2">
                      <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        إذا تركت الرتب والأشخاص فارغين، فسيتم السماح باستخدام الأمر تلقائياً لأي شخص يملك صلاحية السيرفر الافتراضية{" "}
                        <code className="text-emerald-300 bg-black/30 px-1.5 py-0.5 rounded font-mono">
                          {cmd.defaultPermission}
                        </code>.
                      </span>
                    </div>

                    {/* Roles Selector */}
                    <div className="space-y-2">
                      <span className="text-xs text-[#dbdee1] font-medium flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                        <span>الرتب المسموح لها:</span>
                      </span>

                      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-[#1e1f22] rounded-xl border border-white/5">
                        {roles.length === 0 ? (
                          <span className="text-xs text-gray-500 p-2">لا توجد رتب محملة حالياً</span>
                        ) : (
                          roles.map(r => {
                            const isAllowed = cmd.allowedRoles.includes(r.id);
                            return (
                              <button
                                key={r.id}
                                type="button"
                                onClick={() => handleToggleRole(cmdKey, r.id, "allowed")}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                                  isAllowed
                                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm"
                                    : "bg-[#2b2d31] text-[#949ba4] border-white/5 hover:border-white/20 hover:text-white"
                                }`}
                              >
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: r.color || "#949ba4" }}
                                />
                                <span>{r.name}</span>
                                {isAllowed && <Check className="w-3 h-3 text-emerald-400 ml-1" />}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Specific Users Selector */}
                    <div className="space-y-2">
                      <span className="text-xs text-[#dbdee1] font-medium flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-400" />
                        <span>أشخاص مسموح لهم (بالاسم أو الآيدي):</span>
                      </span>

                      {/* Display current allowed users */}
                      <div className="flex flex-wrap gap-2">
                        {cmd.allowedUsers.map(uId => {
                          const matchedMember = members.find(m => m.id === uId);
                          return (
                            <span
                              key={uId}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono"
                            >
                              <span>{matchedMember ? `@${matchedMember.displayName || matchedMember.name}` : uId}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveUser(cmdKey, uId, "allowed")}
                                className="hover:text-rose-400 text-gray-400 transition-colors cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          );
                        })}
                      </div>

                      {/* Input to add user */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="اكتب آيدي العضو أو يوزره (User ID or Username)..."
                          value={newAllowedUserInput[cmdKey] || ""}
                          onChange={e => setNewAllowedUserInput(prev => ({ ...prev, [cmdKey]: e.target.value }))}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddUser(cmdKey, "allowed");
                            }
                          }}
                          className="bg-[#1e1f22] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 grow"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddUser(cmdKey, "allowed")}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>إضافة شخص</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3. Denied Roles & Users (من لا يمكنه استعمال هذا الأمر) */}
                  <div className="space-y-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <UserX className="w-4 h-4 text-rose-400" />
                      <h5 className="font-bold text-xs text-white">من لا يمكنه استعمال هذا الأمر (الممنوعون):</h5>
                    </div>

                    {/* Roles Denied */}
                    <div className="space-y-2">
                      <span className="text-xs text-[#dbdee1] font-medium flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-rose-400" />
                        <span>رتب ممنوعة من استخدام الأمر:</span>
                      </span>

                      <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 bg-[#1e1f22] rounded-xl border border-white/5">
                        {roles.map(r => {
                          const isDenied = cmd.deniedRoles.includes(r.id);
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => handleToggleRole(cmdKey, r.id, "denied")}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                                isDenied
                                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm"
                                  : "bg-[#2b2d31] text-[#949ba4] border-white/5 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: r.color || "#949ba4" }}
                              />
                              <span>{r.name}</span>
                              {isDenied && <X className="w-3 h-3 text-rose-400 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Users Denied */}
                    <div className="space-y-2">
                      <span className="text-xs text-[#dbdee1] font-medium flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-rose-400" />
                        <span>أشخاص ممنوعون:</span>
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {cmd.deniedUsers.map(uId => {
                          const matchedMember = members.find(m => m.id === uId);
                          return (
                            <span
                              key={uId}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-mono"
                            >
                              <span>{matchedMember ? `@${matchedMember.displayName || matchedMember.name}` : uId}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveUser(cmdKey, uId, "denied")}
                                className="hover:text-white text-rose-400 transition-colors cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="آيدي أو يوزر الشخص الممنوع..."
                          value={newDeniedUserInput[cmdKey] || ""}
                          onChange={e => setNewDeniedUserInput(prev => ({ ...prev, [cmdKey]: e.target.value }))}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddUser(cmdKey, "denied");
                            }
                          }}
                          className="bg-[#1e1f22] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 grow"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddUser(cmdKey, "denied")}
                          className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>منع شخص</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 4. Live Discord Components V2 Embed Preview */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <span className="text-xs text-[#949ba4] font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>معاينة الإيمبد التفاعلي (Components V2 Embed):</span>
                    </span>

                    <div className="p-4 rounded-xl bg-[#1e1f22] border-r-4 border-indigo-500 text-xs space-y-3 font-sans text-right select-none shadow-md">
                      {/* Embed Header */}
                      <div className="text-base font-extrabold text-white flex items-center gap-2">
                        <span># أوامر الامر `{cmdKey === "timeout" ? "إسكات" : cmdKey === "untimeout" ? "إلغاء الإسكات" : cmdKey === "ban" ? "حظر" : cmdKey === "unban" ? "إلغاء الحظر" : cmd.name}`</span>
                        {cmdKey === "timeout" || cmdKey === "untimeout" ? (
                          <span className="text-indigo-400">⏱️</span>
                        ) : cmdKey === "ban" || cmdKey === "unban" ? (
                          <span className="text-rose-400">🔨</span>
                        ) : (
                          <span className="text-amber-400">🛡️</span>
                        )}
                      </div>

                      {/* Divider Line */}
                      <div className="h-[2px] bg-gradient-to-l from-indigo-500/50 via-white/10 to-transparent my-1" />

                      {/* Shortcuts Section */}
                      <div>
                        <div className="font-bold text-[#dbdee1] underline decoration-indigo-400/50 underline-offset-2">
                          __الإختصارات:__
                        </div>
                        <div className="text-[#949ba4] mt-1 pl-2 border-r-2 border-indigo-500/40 font-mono">
                          {cmd.shortcuts.length > 0 ? cmd.shortcuts.join(", ") : "لا توجد اختصارات"}
                        </div>
                      </div>

                      {/* Divider Line */}
                      <div className="h-[2px] bg-gradient-to-l from-indigo-500/50 via-white/10 to-transparent my-1" />

                      {/* Allowed Roles Section */}
                      <div>
                        <div className="font-bold text-[#dbdee1] underline decoration-indigo-400/50 underline-offset-2">
                          __الرتب التي يمكنها استخدام الأمر:__
                        </div>
                        <div className="text-[#949ba4] mt-1 pl-2 border-r-2 border-indigo-500/40">
                          {cmd.allowedRoles.length > 0 ? (
                            <span className="text-indigo-300 font-mono">
                              {cmd.allowedRoles
                                .map(rId => {
                                  const r = roles.find(role => role.id === rId);
                                  return `@${r ? r.name : rId}`;
                                })
                                .join(" ")}
                            </span>
                          ) : (
                            <span className="text-emerald-400">
                              (حسب الصلاحيات الافتراضية بالسيرفر: {cmd.defaultPermission})
                            </span>
                          )}
                          <span className="text-[10px] text-gray-500 mr-2">(بدون تنبيه أو منشن نهائياً)</span>
                        </div>
                      </div>

                      {/* Divider Line */}
                      <div className="h-[2px] bg-gradient-to-l from-indigo-500/50 via-white/10 to-transparent my-1" />

                      {/* Usage Examples Section */}
                      <div>
                        <div className="font-bold text-[#dbdee1] underline decoration-indigo-400/50 underline-offset-2">
                          __أمثلة استخدام بلاختصارات:__
                        </div>
                        <div className="text-[#949ba4] mt-1 pl-2 border-r-2 border-indigo-500/40 space-y-1 font-mono text-[11px]">
                          {cmdKey === "timeout" ? (
                            <>
                              <div>&gt; {cmd.shortcuts[0] || "tm"} @someone 1m</div>
                              <div>&gt; {cmd.shortcuts[0] || "tm"} @someone 1h</div>
                              <div>&gt; {cmd.shortcuts[0] || "tm"} @someone 1d</div>
                              <div>&gt; {cmd.shortcuts[0] || "tm"} @someone 1w</div>
                            </>
                          ) : cmdKey === "untimeout" ? (
                            <div>&gt; {cmd.shortcuts[0] || "untm"} @someone</div>
                          ) : cmdKey === "ban" ? (
                            <>
                              <div>&gt; {cmd.shortcuts[0] || "ban"} @someone مخالفة القوانين</div>
                              <div>&gt; {cmd.shortcuts[0] || "ban"} @someone</div>
                            </>
                          ) : cmdKey === "unban" ? (
                            <div>&gt; {cmd.shortcuts[0] || "unban"} 1179133837930938470</div>
                          ) : (
                            <div>&gt; {cmd.shortcuts[0] || cmd.name}</div>
                          )}
                        </div>
                      </div>

                      {/* Divider Line */}
                      <div className="h-[2px] bg-gradient-to-l from-indigo-500/50 via-white/10 to-transparent my-1" />

                      {/* Timeout Action Preview with Exemption Button */}
                      {cmdKey === "timeout" && (
                        <div className="mt-4 pt-3 border-t border-white/5 space-y-2.5">
                          <span className="text-[11px] text-amber-400 font-bold block">
                            معاينة رسالة الإسكات وزر الإعفاء المباشر:
                          </span>
                          <div className="p-3 bg-[#2b2d31] rounded-lg border border-white/5 space-y-3">
                            <div className="text-white text-xs">
                              ⏱️ — **تم إسكات الـ<span className="text-indigo-400">@عضو_المخالف</span> لمدة <span className="text-amber-400 font-mono">بعد 10 دقائق</span>**
                            </div>
                            <div className="h-[1px] bg-white/10" />
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#5c5f66] text-white rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer shadow-sm"
                              >
                                <span>🕊️</span>
                                <span>إعفاء الشخص</span>
                              </button>
                              <span className="text-[10px] text-gray-400">
                                (خاص بالمشرف الذي نفذ الإسكات فقط)
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Save Bar */}
      <div className="p-4 bg-[#2b2d31] rounded-2xl border border-white/5 flex items-center justify-between">
        <span className="text-xs text-[#949ba4]">
          تأكد من حفظ التعديلات لتطبيق الاختصارات والصلاحيات على البوت مباشرة.
        </span>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </div>
    </div>
  );
}
