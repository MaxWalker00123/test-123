"use strict";
// example/index.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

Object.defineProperty(exports, "__esModule", { value: true });
const elysia_1 = require("elysia");
const src_1 = require("../src");

const app = new elysia_1.Elysia()
    .use((0, src_1.TWAngpao)('TWA'))
    .post('/redeem', (_a) => __awaiter(void 0, [_a], void 0, function* ({ body, TWA }) {
        const response = yield TWA.redeem(body.phoneNumber, body.voucherCode);
        if (response.status.code !== 'SUCCESS') { // If not success
            return {
                status: {
                    code: response.status.code,
                    message: response.status.message
                }
            };
        }
        return {
            status: {
                code: 'SUCCESS',
                message: 'Voucher redeemed successfully!'
            },
            data: response.data
        };
    }), {
        body: elysia_1.t.Object({
            phoneNumber: elysia_1.t.String(),
            voucherCode: elysia_1.t.String()
        })
    })
    .fetch; // Use fetch instead of listen
