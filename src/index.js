"use strict";
// src/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TWAngpao = void 0;
const elysia_1 = require("elysia");
function isValidVoucherCode(voucherCode) {
    return /^[a-z0-9]*$/i.test(voucherCode) && voucherCode.length >= 4;
}
function getValidVoucherCode(voucherCode) {
    const splitVoucherCode = (voucherCode + '').split('v=');
    const matchedVoucher = (splitVoucherCode[1] || splitVoucherCode[0]).match(/[0-9A-Za-z]+/);
    if (matchedVoucher && matchedVoucher.length > 0)
        return matchedVoucher[0];
    return '';
}
function isValidThaiPhoneNumber(phoneNumber) {
    const thaiPhoneNumberRegex = /^(?:0)[689]\d{8}$/;
    return thaiPhoneNumberRegex.test(phoneNumber) && phoneNumber.length == 10;
}
function redeemVoucher(_a) {
    return __awaiter(this, arguments, void 0, function* ({ phoneNumber, voucherCode }) {
        voucherCode = getValidVoucherCode(voucherCode);
        if (!isValidVoucherCode(voucherCode)) {
            return {
                status: {
                    code: 'INVALID_VOUCHER_CODE',
                    message: 'Invalid Voucher Code.'
                }
            };
        }
        phoneNumber = phoneNumber.trim();
        if (!isValidThaiPhoneNumber(phoneNumber)) {
            return {
                status: {
                    code: 'INVALID_PHONE_NUMBER',
                    message: 'Invalid Thai Phone Number.'
                }
            };
        }
        try {
            // Make API request to redeem voucher
            const url = `https://gift.truemoney.com/campaign/vouchers/${voucherCode}/redeem`;
            const response = yield fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    mobile: phoneNumber,
                    voucher_hash: voucherCode
                })
            });
            const data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
const TWAngpao = (name = 'TWA') => {
    return new elysia_1.Elysia()
        .decorate(name, {
        redeem(phoneNumber, voucherCode) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield redeemVoucher({ phoneNumber, voucherCode });
            });
        }
    });
};
exports.TWAngpao = TWAngpao;
exports.default = exports.TWAngpao;
