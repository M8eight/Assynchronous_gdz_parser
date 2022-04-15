import puppeteer from "puppeteer";

export const LAUNCH_PUPPETEER_OPTS = {
	args: [
		"--no-sandbox",
		"--disable-setuid-sandbox",
		"--disable-dev-shm-usage",
		"--disable-accelerated-2d-canvas",
		"--disable-gpu",
		"--window-size=1920x1080",
	],
};

export const PAGE_PUPPETEER_OPTS = {
	networkIdle2Timeout: 2000,
	waitUntil: "networkidle2",
	timeout: 2000,
};

export async function getPageContent(url) {
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
        const page = await browser.newPage();
        await page.goto(url, PAGE_PUPPETEER_OPTS);
        // await page.waitForSelector(".th-item");
        const content = await page.content();
        await browser.close();

        return content;
    } catch (err) {
        throw err;
    }
}

