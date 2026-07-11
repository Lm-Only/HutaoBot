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

export const textCodeMode = () => 'Digite o número do WhatsApp que deseja conectar ↴\n';

export const CONNETION_TYPE = (colors) => {
    console.log(`[ ${colors.green('INFO')} ] - ${colors.green('Para começarmos, como você deseja conectar seu bot?')}`);
    return `${colors.brightBlue("╔═✭ ━ ─ ─ ─•|")} ${colors.magenta("⊱✿⊰")} ${colors.brightBlue("|•─ ─ ─ ━ ﾟ═╗\n| ░⃟⃛ ➮")}${colors.brightCyan("  Escolha uma opção ↴")}${colors.brightBlue("\n|═✭ ━ ─ ─ ─•|")} ${colors.magenta("⊱✿⊰")} ${colors.brightBlue("|•─ ─ ─ ━ ﾟ═╝\n| ╭━ ━━ ── ── ━━ ━╮\n| ╎")}${colors.brightRed("➮ ( ")}1 ${colors.brightRed(")")} ${colors.cyan("Código de Emparelhamento")}${colors.brightBlue("\n| ╎")}${colors.brightRed("➮ ( ")}2 ${colors.brightRed(")")} ${colors.cyan("Qr-code (Escanear)")}${colors.brightBlue("\n| ╎")}${colors.brightRed("➮ ( ")}3 ${colors.brightRed(")")} ${colors.cyan("Suporte HutaoBot-MD")}${colors.brightBlue("\n| ╰━ ━━ ── ── ━━ ━╯")}${colors.brightBlue("\n|═✭ ━ ─ ─ ─•|")} ${colors.magenta("⊱✿⊰")} ${colors.brightBlue("|•─ ─ ─ ━ ﾟ═╝")}\n╰━> `;
};

export const sucessConnected = (NomeDoBot) => `『 ･ﾟ✧ CONECTADO A ➬ ${NomeDoBot} ･ﾟ✧ 』`;

export const qrCodeMode = () => "Tire uma foto do QR usando outro celular e, em seguida, escaneie a foto no seu aparelho.";