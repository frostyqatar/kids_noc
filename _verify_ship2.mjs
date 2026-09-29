import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 500 } });
await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await page.evaluate(() => { titleDone = true; go(5); });
await page.waitForTimeout(400);
await page.evaluate(() => {
  dgLoadStart();
  DG.phaseT = DG_APPROACH_END + 0.4;
  DG.shipX = 436;
  DG.shipFlip = -1;
  dgEls.ship.setAttribute('opacity', '1');
  dgUpdate(0.05);
  DG_CAM.x = 500; DG_CAM.y = 150; DG_CAM.h = 200;
  DG_CAMT.x = DG_CAM.x; DG_CAMT.y = DG_CAM.y; DG_CAMT.h = DG_CAM.h;
  dgView();
});
await page.locator('#dwrap').screenshot({ path: '_verify_out/ship_docked.png' });
const s = await page.evaluate(() => ({
  wake: document.getElementById('dwake').getAttribute('opacity'),
  bow: document.getElementById('dbow').getAttribute('opacity'),
  nocY: document.getElementById('dshipTxt').getAttribute('y'),
  bowTriangles: document.querySelectorAll('#dbow path').length,
  oldWakeWedge: !!document.querySelector('#dwake path[d*="L-96"]')
}));
console.log(JSON.stringify(s));
await browser.close();
