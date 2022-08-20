import * as puppeteer from 'puppeteer';

const viewPortSize = { width: 1366, height: 768 };

// declare module 'puppeteer' {
//     interface Page {
//         iterate: () => void;
//     }
// }

// makes sure it gets the correct context in case context changes in the action method
const iterate = async<T>(page: puppeteer.Page, selector: string, action: (element: puppeteer.ElementHandle) => T, result: T[] = [], index: number = 0): Promise<T[]> => {
    const elements = await page.$$(selector);
    return index < elements.length ? iterate(page, selector, action, [...result, action(elements[index])], ++index) : result;
};

(async () => {
    const browser = await puppeteer.launch({
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

    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport(viewPortSize);

    await page.goto('https://www.licitacoes-e.com.br/aop/pesquisar-licitacao.aop?opcao=preencherPesquisar', { waitUntil: 'networkidle2' });
    await page.click('#tabs > label:nth-child(3)');
    await page.waitForTimeout(1000);
    // await page.evaluate((identificador) => {
    //     return document.querySelector('#numeroLicitacao').value = identificador;
    // }, '956253');

    await page.$eval('#numeroLicitacao', (el) => (<HTMLInputElement>el).value = '956253');
    await page.waitForTimeout(1000);
    await page.click('input[name=pesquisar]');

    await page.waitForTimeout(10000);

    await page.goto('https://www.marilia.sp.gov.br/portal/editais/1', { waitUntil: 'networkidle2' });

    await iterate(page, '.ed_edital', async (element) => {
        //const el = await element.$('.ed_info_edital > div > span:nth-child(2)');

        const text = await element.$eval('.ed_info_edital > div > span:nth-child(2)', _ => {
            console.log(_);
            return _.textContent;
        })
        
        // teste
        //console.log(x);
        console.log('a:' + text);
        console.log('test');
    });

    const rows: puppeteer.ElementHandle[] = await page.$$('.ed_edital a');
    await rows[0].click({ button: 'middle'});

    await page.waitForTimeout(15000);

    await rows[1].click();

    await page.waitForTimeout(15000);



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

    await browser.close();
})();