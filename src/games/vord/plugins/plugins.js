/**
 * Copyright By Lm
 * Um jogo multiplayer de verdade ou desafio
 */

import { setting } from "../../../utils/generics.js";

export const startGame = async (reply, user) => {
    void await reply(`✰ ✨ 𝙑𝙀𝙍𝘿𝘼𝘿𝙀 𝙊𝙐 𝘿𝙀𝙎𝘼𝙁𝙄𝙊 🗡 ✰\n\n • 𝙅𝙤𝙜𝙤 𝙄𝙣𝙞𝙘𝙞𝙖𝙙𝙤 •\n\n ➮ 𝐕𝐞𝐳 𝐝𝐨 𝐣𝐨𝐠𝐚𝐝𝐨𝐫: @${user.split("@")[0]}\n ➮ 𝑬𝒔𝒄𝒐𝒍𝒉𝒂 𝒂 𝒐𝒑𝒄̧𝒂̃𝒐 𝒂𝒃𝒂𝒊𝒙𝒐 ↴\n\n` +
        '✨ۣۜۜ͜͡𝙑𝙀𝙍𝘿𝘼𝘿𝙀 👀\n' +
        ` ➮ [ *${setting.prefixo}Verdade* ]\n\n` +
        `✨ۣۜۜ͜͡𝘿𝙀𝙎𝘼𝙁𝙄𝙊 ⚔️\n` +
        ` ➮ [ *${setting.prefixo}Desafio* ]\n\n` +
        `> • ${setting.NomeDoBot}`
    );
};

export const alreadyStarted = async (reply, user) => {
    void await reply(`✰ ✨ 𝙑𝙀𝙍𝘿𝘼𝘿𝙀 𝙊𝙐 𝘿𝙀𝙎𝘼𝙁𝙄𝙊 🗡 ✰\n\n ➮ 𝐒𝐮𝐚 𝐯𝐞𝐳: @${user.split("@")[0]}\n ➮ 𝑬𝒔𝒄𝒐𝒍𝒉𝒂 𝒂 𝒐𝒑𝒄̧𝒂̃𝒐 𝒂𝒃𝒂𝒊𝒙𝒐 ↴\n\n` +
        '✨ۣۜۜ͜͡𝙑𝙀𝙍𝘿𝘼𝘿𝙀 👀\n' +
        ` ➮ [ *${setting.prefixo}Verdade* ]\n\n` +
        `✨ۣۜۜ͜͡𝘿𝙀𝙎𝘼𝙁𝙄𝙊 ⚔️\n` +
        ` ➮ [ *${setting.prefixo}Desafio* ]\n\n` +
        `> • ${setting.NomeDoBot}`);
};