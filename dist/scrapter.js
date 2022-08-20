"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const puppeteer = __importStar(require("puppeteer"));
const viewPortSize = { width: 1366, height: 768 };
// declare module 'puppeteer' {
//     interface Page {
//         iterate: () => void;
//     }
// }
// makes sure it gets the correct context in case context changes in the action method
const iterate = (page, selector, action, result = [], index = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const elements = yield page.$$(selector);
    return index < elements.length ? iterate(page, selector, action, [...result, action(elements[index])], ++index) : result;
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: false,
        slowMo: 0,
        args: [
            '--disable-dev-shm-usage',
            `--window-size=${viewPortSize.width},${viewPortSize.height}`
        ]
    });
    // const browser = await puppeteer.connect({
    //     browserURL: 'http://localhost:9222'
    //     //browserWSEndpoint: "ws://127.0.0.1:9222/devtools/browser/80453edb-43a7-4273-bc69-f9373f02dc7b"
    // });
    const pages = yield browser.pages();
    const page = pages[0];
    yield page.setViewport(viewPortSize);
    yield page.goto('https://www.licitacoes-e.com.br/aop/pesquisar-licitacao.aop?opcao=preencherPesquisar', { waitUntil: 'networkidle2' });
    yield page.click('#tabs > label:nth-child(3)');
    yield page.waitForTimeout(1000);
    // await page.evaluate((identificador) => {
    //     return document.querySelector('#numeroLicitacao').value = identificador;
    // }, '956253');
    yield page.$eval('#numeroLicitacao', (el) => el.value = '956253');
    yield page.waitForTimeout(1000);
    yield page.click('input[name=pesquisar]');
    yield page.waitForTimeout(10000);
    yield page.goto('https://www.marilia.sp.gov.br/portal/editais/1', { waitUntil: 'networkidle2' });
    yield iterate(page, '.ed_edital', (element) => __awaiter(void 0, void 0, void 0, function* () {
        //const el = await element.$('.ed_info_edital > div > span:nth-child(2)');
        const text = yield element.$eval('.ed_info_edital > div > span:nth-child(2)', _ => {
            console.log(_);
            return _.textContent;
        });
        //console.log(x);
        console.log('a:' + text);
        console.log('test');
    }));
    const rows = yield page.$$('.ed_edital a');
    yield rows[0].click({ button: 'middle' });
    yield page.waitForTimeout(15000);
    yield rows[1].click();
    yield page.waitForTimeout(15000);
    // rows.forEach(async (row: ElementHandle) => {
    //     console.log(row);
    //     (await row.$('a'))?.click();
    // });  
    // const x = await page.$$eval('input', (elements: HTMLInputElement[]) => elements);
    // const items = await page.$$eval('.ed_edital', (rows: HTMLInputElement[]) => {
    //     return rows.map(_ => _.querySelector('.ed_titulo_edital')?.textContent);
    // });
    // const items = rows.map(row => {
    //     numeroEdital: row.querySelector('.ed_titulo_edital')?.textContent
    // });
    //console.log(items);
    // const content = await page.content();
    // console.log(content);
    //await page.screenshot({path: 'test.png'});
    yield browser.close();
}))();
//# sourceMappingURL=scrapter.js.map