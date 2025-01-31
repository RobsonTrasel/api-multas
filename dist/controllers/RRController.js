"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rr = void 0;
const validation_1 = __importDefault(require("../validations/validation"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const nocaptchaai_puppeteer_1 = require("nocaptchaai-puppeteer");
class Rr {
    constructor() {
        this.index = async (req, res) => {
            const placa = req.body.placa;
            const renavam = req.body.renavam;
            const errors = validation_1.default.generic(placa, renavam);
            if (errors) {
                return res.status(400).json(errors);
            }
            const multas = await this.scrap(placa, renavam);
            res.status(200).json(multas);
        };
        this.scrap = async (placa, renavam) => {
            const browser = await puppeteer_1.default.launch({
                headless: process.env.NODE_ENV === 'production' ? 'new' : false,
                slowMo: process.env.NODE_ENV === 'production' ? 0 : 50,
                timeout: 5000,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                ]
            });
            const page = await browser.newPage();
            await page.goto(`${process.env.RR_URL}`);
            // console.log(solve);
            //get input placa from placeholder value
            const inputPlacaSelect = await page.$('input[placeholder="BWC1140"]');
            const inputRenavamSelect = await page.$('input[placeholder="12345678910"]');
            const buttonSubmit = await page.$('button[id="submeter"]');
            console.log(inputPlacaSelect);
            //set placa value
            await (inputPlacaSelect === null || inputPlacaSelect === void 0 ? void 0 : inputPlacaSelect.type(placa));
            //set renavam value
            await (inputRenavamSelect === null || inputRenavamSelect === void 0 ? void 0 : inputRenavamSelect.type(renavam));
            //click submit button
            await (buttonSubmit === null || buttonSubmit === void 0 ? void 0 : buttonSubmit.click());
            const solve = await (0, nocaptchaai_puppeteer_1.solveCaptcha)(page, 'jhowbhz-6a18c640-af9b-c170-01d3-51c5aa795610', 'u124', 'free', true);
            console.log(solve);
            return { placa, renavam };
        };
    }
}
exports.rr = new Rr();
