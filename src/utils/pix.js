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

import { randomUUID } from 'node:crypto';
import { request } from 'undici';

import global from '../../assets/settings/global.json' with { type: 'json' };

const BASE_URL = 'https://api.mercadopago.com/v1';
const TOKEN_PADRAO = '_SEU_TOKEN_AQUI_';
const CHAVE_PADRAO = '_CHAVE_AQUI_';

const valorConfigurado = (valor, padrao) => {
    const normalizado = String(valor ?? '').trim();
    return Boolean(normalizado && normalizado !== padrao && normalizado !== '0');
};

export const temTokenMercadoPago = () =>
    valorConfigurado(global.ACESS_TOKEN_PIX, TOKEN_PADRAO);

export const temChavePixConfigurada = () =>
    valorConfigurado(global.CHAVE_PIX, CHAVE_PADRAO);

/**
 * Gerar um pix com o valor que você definir.
 * 
 * - Não mexa neste codigo.
 * 
 * @param {Number} valor Valor do pagamento
 * @returns {Promise<object>} [Id/code/qr_code]
 */
export const gerarPix = async (valor) => {
    try {
        if (typeof valor !== 'number') {
            throw new Error('Valor deve ser um numero.');
        }

        if (!temTokenMercadoPago()) {
            throw new Error('Token do Mercado Pago não configurado.');
        }

        const ACCESS_TOKEN = global.ACESS_TOKEN_PIX;

        const payment_data = {
            transaction_amount: Number(valor),
            description: 'Pagamento via PIX',
            payment_method_id: "pix",
            payer: {
                email: "hutaouser@email.com",
                first_name: "Hutao",
                last_name: "user",
                identification: {
                    type: "CPF",
                    number: "12345678909"
                }
            }
        };

        const {
            body
        } = await request(`${BASE_URL}/payments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
                'X-Idempotency-Key': randomUUID()
            },
            body: JSON.stringify(payment_data)
        });

        const {
            id,
            point_of_interaction
        } = await body.json();

        return {
            id,
            code: point_of_interaction.transaction_data.qr_code,
            qr_code: point_of_interaction.transaction_data.qr_code_base64
        };
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Checar se o pagamento foi aprovado pelo ID
 * 
 * - Não mexa neste codigo
 * 
 * @param {String} id ID obtido apos gerar um pix
 * @returns {Promise<object>} [Aproved]
 */
export const checarPix = async (id) => {
    try {
        if (!temTokenMercadoPago()) {
            return {
                approved: false,
                status_detail: 'token-desativado'
            };
        }

        const ACCESS_TOKEN = global.ACESS_TOKEN_PIX;
        const {
            body
        } = await request(`${BASE_URL}/payments/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        });

        const { status, status_detail } = await body.json();
        return {
            approved: status === 'approved',
            status_detail
        };
    } catch (error) {
        console.error(error);
    }
};

