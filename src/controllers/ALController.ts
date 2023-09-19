import utils from 'src/utils/utils';
import validation from '../validations/validation';
import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";
import { Request, Response } from 'express';


interface MultaData {
    [key: string]: string
}

interface ScrapResult {
    multas: MultaData[]
    placa: string
    renavam: string
    message: string
}

class Al {

    index = async (req: Request, res: Response) => {
    
        try {
            const placa = req.body.placa as string;
            const renavam = req.body.renavam as string;
        
            const errors =  validation.generic(placa, renavam);
        
            if (errors) {
                return res.status(400).json(errors);
            }
            
            const multas = await this.scrap(placa, renavam);
        
            res.status(200).json(multas);

        } catch (error) {
            console.error('Error in Al.index:', error)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    scrap = async (placa: string, renavam: string): Promise<ScrapResult> => {
        
        const browserOptions: PuppeteerLaunchOptions = {
            headless: process.env.NODE_ENV === 'production' ? 'new' : false,
            slowMo: process.env.NODE_ENV === 'production' ? 0 : 50,
            timeout: 5000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
            ]
        }

        const browser: Browser = await puppeteer.launch(browserOptions);
        
        const page: Page = await browser.newPage();

        await page.goto(`${process.env.AL_URL}`);

        const placaSelector = '#id_placa';
        const renavamSelector = '#id_renavam';

        const buttonsSelector = 'button[type="submit"]';

        const [inputPlaca, inputRenavam] = await Promise.all([
            page.$(placaSelector),
            page.$(renavamSelector)
        ])

        await inputPlaca?.type(placa);
        await inputRenavam?.type(renavam);

        const buttons = await page.$$(buttonsSelector);
        const buttonSubmit = buttons[0];

        await buttonSubmit?.click();

        const erros = await this.checkErros(browser, page, placa, renavam);

        if(erros) {
            await browser.close()
            return erros;
        }

        const multas = await this.extractMultas(page)
        await browser.close()

        return { multas, placa, renavam, message: ''}

    }

    checkErros = async (browser: any, page:any, placa:string, renavam:string) => {

        try{

            const divErrorSelector = '.error';
            const divErrors = await page.waitForSelector(divErrorSelector, { timeout: 5000 });

            const divErrorsHtml = await page.evaluate((divErrors:any) => divErrors.innerHTML, divErrors);
            const errosClear = divErrorsHtml.replace(/(<([^>]+)>)/gi, "").replace(/\n\t/g, "").trim();

            await browser.close();

            return {
                placa: placa,
                renavam: renavam,
                multas: [],
                message: errosClear
            };

        }catch(e){
            return false;
        }

    }

    extractMultas = async (page: Page): Promise<MultaData[]> => {
        const multas: MultaData[] = []
        const uls = await page.$$('ul.list-group');

        for (let ul of uls) {
            const lis = await ul.$$('li');
            const data: MultaData = {};

            for (let li of lis) {
                const liHtml = await li.evaluate((li) => li.innerHTML);
                const htmlContent = liHtml.split('<br>').map((item: string) => item.trim());
                const indice = utils.removeAccents(htmlContent[0])
                    .replace(/(<([^>]+)>)/gi, "")
                    .replace(/\n\t/g, "")
                    .trim()
                    .toLowerCase()
                    .replace(/ /g, '_');

                const value = htmlContent[1];
                data[indice] = value;
            }

            multas.push(data);
        }

        return multas;
    }

}

export const al = new Al();