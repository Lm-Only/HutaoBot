import { setting } from "../utils/generics.js";

const BOTTOES_MENU_CONFIG = {
    body: '𝑬𝒔𝒄𝒐𝒍𝒉𝒂 𝒐 𝒎𝒆𝒏𝒖 𝒅𝒆𝒔𝒆𝒋𝒂𝒅𝒐 ↴\n\n✰ ✰ ✰ ✰ ✰',
    headerTitle: '"⋆⃟ۣۜ᭪➣ 𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑴𝑬𝑵𝑼𝑺  『🌸』\n ❀ *Usuário*: @user'
};

function BOTTOES_MENU(prefixo) {
    return [{
        name: "single_select",
        buttonParamsJson: JSON.stringify({
            title: "『 𝑽𝑬𝑹 𝑳𝑰𝑺𝑻𝑨 』",
            sections: [{
                title: "⏤͟͟͞͞𝙿𝚛𝚒𝚗𝚌𝚒𝚙𝚊𝚕 ↴",
                highlight_label: "popular",
                rows: [{
                    title: "ৎ✿̤֟𝙈𝙀𝙉𝙐 𝙋𝙍𝙄𝙉𝘾𝙄𝙋𝘼𝙇  💖",
                    description: setting.NomeDoBot,
                    id: prefixo + "menuprincipal"
                }]
            }, {
                title: "⏤͟͟͞͞𝙼𝚎𝚗𝚞 𝚍𝚎 𝚙𝚛𝚘𝚙𝚛𝚒𝚎𝚝𝚊́𝚛𝚒𝚘 ↴",
                rows: [{
                    title: " ⃘⃤꙰𝙈𝙀𝙉𝙐-𝙇𝙄𝘿𝙀𝙍 👑",
                    description: setting.NomeDoBot,
                    id: prefixo + "menudono"
                }]
            }, {
                title: "⏤͟͟͞͞𝙼𝚎𝚗𝚞 𝚍𝚎 𝚊𝚍𝚖𝚜 ↴",
                rows: [{
                    title: "ஓீᤢ𝙈𝙀𝙉𝙐-𝘼𝘿𝙈 🔱",
                    description: setting.NomeDoBot,
                    id: prefixo + "menuadm"
                }]
            }, {
                title: "⏤͟͟͞͞𝙾𝚞𝚝𝚛𝚘𝚜 𝚖𝚎𝚗𝚞𝚜 ↴",
                rows: [{
                    title: "ঔৣ͜͡𝙈𝙀𝙉𝙐-𝘽𝙍𝙄𝙉𝘾𝘼𝘿𝙀𝙄𝙍𝘼𝙎 💌",
                    description: setting.NomeDoBot,
                    id: prefixo + "menugame"
                }, {
                    title: "ঔৣ͜͡𝙈𝙀𝙉𝙐-𝙍𝙋𝙂 ⚔️",
                    description: setting.NomeDoBot,
                    id: prefixo + "menurpg"
                }, {
                    title: "ঔৣ͜͡𝙈𝙀𝙉𝙐-𝙋𝙇𝘼𝙔 ✨",
                    description: setting.NomeDoBot,
                    id: prefixo + "menuplay"
                }, {
                    title: "ঔৣ͜͡𝙈𝙀𝙉𝙐-𝙎𝙏𝙄𝘾𝙆𝙀𝙍𝙎 🌈",
                    description: setting.NomeDoBot,
                    id: prefixo + "menufig"
                }, {
                    title: "ঔৣ͜͡𝙈𝙀𝙉𝙐-𝙑𝙄𝙋 🎗",
                    description: setting.NomeDoBot,
                    id: prefixo + "menuvip"
                }, {
                    title: "ঔৣ͜͡𝙈𝙀𝙉𝙐-𝙇𝙊𝙂𝙊𝙎 🌻",
                    description: setting.NomeDoBot,
                    id: prefixo + "menulogos"
                }, {
                    title: "ঔৣ͜͡𝙈𝙀𝙉𝙐-𝘼𝙉𝙄𝙈𝙀 ❣",
                    description: setting.NomeDoBot,
                    id: prefixo + "menuanime"
                }]
            }, {
                title: "⏤͟͟͞͞𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲̧𝙾̃𝙴𝚂 ↴",
                rows: [{
                    title: "ᬊ͜͡𝙄𝙉𝙁𝙊-𝘿𝙊𝙉𝙊 🌙",
                    description: setting.NomeDoBot,
                    id: prefixo + "infodono"
                }, {
                    title: "ᬊ͜͡𝙋𝙄𝙉𝙂 ⚡",
                    description: setting.NomeDoBot,
                    id: prefixo + "ping"
                }, {
                    title: "ᬊ͜͡𝙈𝙀𝙐-𝙋𝙀𝙍𝙁𝙄𝙇 📱",
                    description: setting.NomeDoBot,
                    id: prefixo + "perfil"
                }, {
                    title: "ᬊ͜͡𝙇𝙄𝙎𝙏𝘼-𝙑𝙄𝙋 💫",
                    description: setting.NomeDoBot,
                    id: prefixo + "listavip"
                }, {
                    title: "ᬊ͜͡𝘼𝙇𝙐𝙂𝘼𝙍 💸",
                    description: setting.NomeDoBot,
                    id: prefixo + "alugar"
                }, {
                    title: "ᬊ͜͡𝙂𝙄𝙏-𝘽𝙊𝙏 ✨",
                    description: setting.NomeDoBot,
                    id: prefixo + "gitdobot"
                }]
            }]
        })
    }]
}

export default {
    /** Param prefixo por causa do multiprefixo */
    menu: (prefixo) => ({
        ...BOTTOES_MENU_CONFIG,
        buttons: BOTTOES_MENU(prefixo)
    })
};