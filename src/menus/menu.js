/**
 * HutaoBot pro versão 10.0.0
 * By: Lm Only
 * 
 * SELO: ❌️
 * 
 * ⚠️ Este codigo é aberto, mas atenção!! ⚠️
 * 
 * - Não confie em fazer alterações neste script
 * - Pois é de certeza que estes dados podem ser substituidos automaticamente.
 * - Os arquivos com permissão para editar devem ter o SELO: ✅️
 * 
 * - Não que isso seja proibido, pois sei que tem ums enzo que confunde 
 * - E tenta alterar só pra parecer o fodastico da web
 * 
 * - É mais questão de segurança e preocupação.
 */
import { readFileSync } from 'node:fs';
import { setting } from '../utils/generics.js';

/** Default config - params */
const DEFAULT_CONFIG_MENU = {
    mainPath: './src/menus/',
    menus: {
        menu: 'menu-principal',
        baixar: 'menu-baixar',
        figurinha: 'menu-figurinha',
        premium: 'menu-premium',
        admin: 'menu-admin',
        proprietario: 'menu-proprietario',
        rpg: 'menu-rpg',
        brincadeiras: 'menu-brincadeiras',
        animes: 'menu-animes',
        logos: 'menu-logos'
    },
    cache: {}
};

/**
 * Replace the default menu params 
 * For example {prefix|BotName}
 * 
 * @param {String} text string replaces
 * @param {Object} data the params to replace
 * @returns {String} text replaced
 */
const replaceStringMenu = (text, data = {}) => {
    const { prefixo, NickDono, NomeDoBot } = setting;
    const newData = {
        prefixo,
        NickDono,
        NomeDoBot,
        InvisibleMessage: '‎'.repeat(800),
        ...data
    };

    for (const [key, value] of Object.entries(newData)) {
        text = text.replaceAll(`{${key}}`, value);
    }

    return text;
};

/**
 * Gets the menu text using cache
 * Created by LM Only
 * I'm unsing english because you don't need to know about this # huta user
 * 
 * @param {String} name the menu tag name
 * @returns {String} return the menu text
 */
const getMenuCache = (name) => {
    if (name in DEFAULT_CONFIG_MENU.cache) {
        return replaceStringMenu(DEFAULT_CONFIG_MENU.cache[name]);
    }

    const fileTextMenu = readFileSync(
        DEFAULT_CONFIG_MENU.mainPath + 
        DEFAULT_CONFIG_MENU.menus[name] + '.txt',
        'utf-8'
    );

    DEFAULT_CONFIG_MENU.cache[name] = fileTextMenu;
    return replaceStringMenu(fileTextMenu);
};

const menus = {
    menu(sender, TimeToday, time, isPremium, pushname) {
        return replaceStringMenu(getMenuCache('menu'), {
            time,
            sender: sender.split('@')[0],
            isPremium: isPremium ? '*Sim*' : '_Não_',
            TimeToday,
            pushname,
        });
    },
    menurpg(TimeToday, sender, GOLDS_CMD, NumeroDoDono) {
        return replaceStringMenu(getMenuCache('rpg'), {
            sender: sender.split('@')[0],
            TimeToday,
            NumeroDoDono,
            GOLDS_CMD
        });
    },
    menuvip(CMD_VIP_AQUI) {
        return replaceStringMenu(getMenuCache('premium'), {
            CMD_VIP_AQUI
        });
    },
    adm: () => getMenuCache('admin'),
    baixar: () => getMenuCache('baixar'),
    figurinhas: () => getMenuCache('figurinha'),
    menudono: () => getMenuCache('proprietario'),
    menugame: () => getMenuCache('brincadeiras'),
    menuanime: () => getMenuCache('animes'),
    menu_logos: () => getMenuCache('logos')
};

export default menus;
