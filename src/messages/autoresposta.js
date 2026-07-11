//==============> HTscript <===============\\

/**
 * HutaoBot pro versão 10.0.0
 * By: Lm Only
 * 
 * SELO: ✅️
 * 
 * - Você pode editar a vontade, este script foi feito para nao ser alterado
 * - Em caso que for preciso ser feita uma alteração, será feito um backup 
 * - E o codigo antigo será substituido pelo novo. Mas voce pode ver o que mudou 
 * - E repassar.
 * 
 * -> Ainda não foi criado um sistema vibe github que consegue processar sem perder as alterações
 */

/**
 * Auto Resposta personalizado criado por Lm Only
 * Programe suas mensagems e respostas para seu bot
 *
 * Suporta: Mensagem, Áudio e Sticker
 * Muita atenção ao criar ou mudar alguma coisa, pois qualquer erro, pode dar um problemão.
 *
 * Audios e Figurinhas também suportam URLs e o diretório;
 *
 * OBS: • Textos de ( receber e contenha ) devem ser em letra minusculas e sem acentuação.
 * • Não use isso para outros fims maliciosos.
 * • Qualquer duvida, me chame: 559284828701
 *
 * TUTORIAL: https://youtu.be/VjOEOy4mrUc
 */


//Biblioteca de algums áudios do bot:qa
import audioBot from '../../assets/media/audios/index.js';

export default [
    {
        contenha: ["bot"],
        enviar: [
            {
                tipo: "react",
                text: "💝"
            },
            {
                tipo: "message",
                text: "'-'"
            }
        ]
    },
    {
        contenha: ["bom dia"],
        enviar: [
            {
                tipo: "react",
                text: "🌻"
            },
            {
                tipo: "audio",
                caminho: "./assets/media/audios/bomdia.mp3"
            }
        ]
    },
    {
        contenha: ["dance", "danca"],
        enviar: [
            {
                tipo: "react",
                text: "🎊"
            },
            {
                tipo: "sticker",
                caminho: "https://files.catbox.moe/oseqt9.mp4"
            }
        ]
    },
    {
        receber: "kkk",
        enviar: [
            {
                tipo: "react",
                text: "😂"
            }
        ]
    },
    {
        contenha: ["porr", "poha", "fdp"],
        enviar: [
            {
                tipo: "react",
                text: "😳"
            },
            {
                tipo: "audio",
                caminho: audioBot.ignorante, //Url
            }
        ]
    },
    {
        contenha: ["aids"],
        enviar: [
            {
                tipo: "react",
                text: "💀"
            },
            {
                tipo: "audio",
                caminho: audioBot.aids, //Url
            }
        ]
    },
    {
        contenha: ["paulista", "o paulo"],
        enviar: [
            {
                tipo: "react",
                text: "🌈"
            },
            {
                tipo: "audio",
                caminho: audioBot.paulista, //Url
            }
        ]
    },
    {
        contenha: ["cafe"],
        enviar: [
            {
                tipo: "react",
                text: "☕"
            },
            {
                tipo: "audio",
                caminho: audioBot.cafezinho, //Url
            }
        ]
    },
    {
        contenha: ["nossa"],
        enviar: [
            {
                tipo: "audio",
                caminho: audioBot.nossa, //Url
            }
        ]
    },
    {
        contenha: ["fino", "senhor"],
        enviar: [
            {
                tipo: "react",
                text: "🗿"
            },
            {
                tipo: "audio",
                caminho: audioBot.fino, //Url
            }
        ]
    },
    {
        contenha: ["secsu", "sex"],
        enviar: [
            {
                tipo: "react",
                text: "🌚"
            }
        ]
    },
    {
        contenha: ["acrean"],
        enviar: [
            {
                tipo: "react",
                text: "🦖"
            },
            {
                tipo: "audio",
                caminho: audioBot.acreano, //Url
            }
        ]
    },
    {
        contenha: ["alagoa"],
        enviar: [
            {
                tipo: "audio",
                caminho: audioBot.alagoano, //Url
            }
        ]
    },
    {
        contenha: ["amazon", "indio"],
        enviar: [
            {
                tipo: "react",
                text: "🏹"
            },
            {
                tipo: "audio",
                caminho: audioBot.amazoniense, //Url
            }
        ]
    },
    {
        contenha: ["amig"],
        enviar: [
            {
                tipo: "react",
                text: "🤝"
            },
            {
                tipo: "audio",
                caminho: audioBot.amigo, //Url
            }
        ]
    },
    {
        contenha: ["apag"],
        enviar: [
            {
                tipo: "react",
                text: "🤬"
            },
            {
                tipo: "audio",
                caminho: audioBot.apaga, //Url
            }
        ]
    },
    {
        contenha: ["bora bill"],
        enviar: [
            {
                tipo: "audio",
                caminho: audioBot.borabil, //Url
            }
        ]
    },
    {
        contenha: ["fire"],
        enviar: [
            {
                tipo: "react",
                text: "🐃"
            },
            {
                tipo: "audio",
                caminho: audioBot.freefire, //Url
            }
        ]
    },
    {
        contenha: ["gay"],
        enviar: [
            {
                tipo: "react",
                text: "🧐"
            },
            {
                tipo: "audio",
                caminho: audioBot.tuegay, //Url
            }
        ]
    },
    {
        contenha: ["cear"],
        enviar: [
            {
                tipo: "react",
                text: "👽"
            },
            {
                tipo: "audio",
                caminho: audioBot.cearense, //Url
            }
        ]
    },
    {
        contenha: ["maria"],
        enviar: [
            {
                tipo: "react",
                text: "😣"
            },
            {
                tipo: "audio",
                caminho: audioBot.ave_maria, //Url
            }
        ]
    },
    {
        receber: "ban",
        enviar: [
            {
                tipo: "react",
                text: "😼"
            },
            {
                tipo: "audio",
                caminho: audioBot.bann, //Url
            }
        ]
    },
    {
        contenha: ["apanh"],
        enviar: [
            {
                tipo: "react",
                text: "🫵"
            },
            {
                tipo: "audio",
                caminho: audioBot.apanhou, //Url
            }
        ]
    },
    {
        contenha: ["carioc"],
        enviar: [
            {
                tipo: "react",
                text: "🔫"
            },
            {
                tipo: "audio",
                caminho: audioBot.carioca, //Url
            }
        ]
    },
    {
        contenha: ["doido"],
        enviar: [
            {
                tipo: "audio",
                caminho: audioBot.doido, //Url
            }
        ]
    },
    {
        contenha: ["receba"],
        enviar: [
            {
                tipo: "react",
                text: "🙅‍♀️"
            },
            {
                tipo: "audio",
                caminho: audioBot.receba, //Url
            }
        ]
    },
    {
        contenha: ["bora fi"],
        enviar: [
            {
                tipo: "react",
                text: "🙅‍♀️"
            },
            {
                tipo: "audio",
                caminho: audioBot.fidobil, //Url
            }
        ]
    },
    {
        contenha: ["flamengo"],
        enviar: [
            {
                tipo: "audio",
                caminho: audioBot.flamengo, //Url
            }
        ]
    },
    {
        contenha: ["flamenguista"],
        enviar: [
            {
                tipo: "react",
                text: "🦅"
            },
            {
                tipo: "audio",
                caminho: audioBot.flamenguista, //Url
            }
        ]
    },
    {
        contenha: ["goian"],
        enviar: [
            {
                tipo: "react",
                text: "🤠"
            },
            {
                tipo: "audio",
                caminho: audioBot.goiano, //Url
            }
        ]
    },
    {
        contenha: ["matogros", "mato gros"],
        enviar: [
            {
                tipo: "react",
                text: "🌴"
            },
            {
                tipo: "audio",
                caminho: audioBot.matogrossense, //Url
            }
        ]
    },
    {
        contenha: ["vascaino", "vasco"],
        enviar: [
            {
                tipo: "audio",
                caminho: audioBot.vascaino, //Url
            }
        ]
    },
    {
        contenha: ["matogros", "mato gros"],
        enviar: [
            {
                tipo: "react",
                text: "🌴"
            },
            {
                tipo: "audio",
                caminho: audioBot.matogrossense, //Url
            }
        ]
    },
    {
        contenha: ["tocantin"],
        enviar: [
            {
                tipo: "react",
                text: "🏜"
            },
            {
                tipo: "audio",
                caminho: audioBot.tocantinense, //Url
            }
        ]
    },
    {
        contenha: ["hack"],
        enviar: [
            {
                tipo: "react",
                text: "👾"
            },
            {
                tipo: "audio",
                caminho: audioBot.hack, //Url
            }
        ]
    },
    {
        contenha: ["corint", "curintia"],
        enviar: [
            {
                tipo: "react",
                text: "🦨"
            },
            {
                tipo: "audio",
                caminho: audioBot.corinthiano, //Url
            }
        ]
    },
    {
        contenha: ["loli"],
        enviar: [
            {
                tipo: "audio",
                caminho: audioBot.yamete, //Url
            }
        ]
    },
    {
        contenha: ["viado"],
        enviar: [
            {
                tipo: "react",
                text: "🦌"
            },
            {
                tipo: "audio",
                caminho: audioBot.viado, //Url
            }
        ]
    },
    {
        contenha: ["mineiro"],
        enviar: [
            {
                tipo: "react",
                text: "🧀"
            },
            {
                tipo: "audio",
                caminho: audioBot.mineiro, //Url
            }
        ]
    },
    {
        contenha: ["bora mu"],
        enviar: [
            {
                tipo: "audio",
                caminho: audioBot.mulherdobil, //Url
            }
        ]
    },
    {
        contenha: ["palmeira"],
        enviar: [
            {
                tipo: "react",
                text: "🤣"
            },
            {
                tipo: "audio",
                caminho: audioBot.palmeiras, //Url
            }
        ]
    },
    {
        contenha: ["palmerens"],
        enviar: [
            {
                tipo: "react",
                text: "😱"
            },
            {
                tipo: "audio",
                caminho: audioBot.palmerense, //Url
            }
        ]
    },
    {
        contenha: ["pat"],
        enviar: [
            {
                tipo: "react",
                text: "🦆"
            },
            {
                tipo: "audio",
                caminho: audioBot.pegaopato, //Url
            }
        ]
    },

];
