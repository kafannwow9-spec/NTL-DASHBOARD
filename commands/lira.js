// commands/lira.js — تم استخراجه من index.js

module.exports = {
    names: ["lira"],
    async execute(interaction, ctx) {
        const { handleLiraCommand } = ctx;

        const targetUser = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        return await handleLiraCommand({
            sender: interaction.user,
            channel: interaction.channel,
            targetUser: targetUser,
            amount: amount,
            isInteraction: true,
            interaction: interaction
        });
    }
};
