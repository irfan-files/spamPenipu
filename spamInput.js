const puppeteer = require("puppeteer");
const fs = require("fs").promises;

(async () => {
  // Read data from JSON file
  const dataSets = JSON.parse(
    await fs.readFile("dataSets_large.json", "utf-8")
  );

  const browser = await puppeteer.launch({ headless: false }); // Set headless to true if you don't want to see the browser
  const page = await browser.newPage();

  for (const data of dataSets) {
    try {
      await page.goto(
        "https://pusatbantuantiktoksellercenter.varcel.my.id/nohp.php"
      );

      // Input phone number, email, and second phone number
      await page.type('input[name="nohp"]', data.nohp1);
      await page.type('input[name="mail"]', data.email);
      await page.type('input[name="nohp"]', data.nohp2);
      await page.click('button[type="submit"]');

      // Wait for the next page to load and display the form
      await page.waitForSelector("#form", { timeout: 10000 });

      // Input PIN numbers
      await page.type("input#pin1", data.pin[0]);
      await page.type('input[name="pin2"]', data.pin[1]);
      await page.type('input[name="pin3"]', data.pin[2]);
      await page.type('input[name="pin4"]', data.pin[3]);
      await page.type('input[name="pin5"]', data.pin[4]);
      await page.type('input[name="pin6"]', data.pin[5]);
      await page.click('button[type="submit"]');

      // Wait for the next page to load and display the form
      await page.waitForSelector('input[name="otp"]', { timeout: 10000 });

      // Input OTP
      await page.type('input[name="otp"]', data.otp);
      await page.click("button#btn1");

      // Wait for a while before proceeding to the next set of data
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(
        `Error processing data set: ${JSON.stringify(data)}. Error: ${
          error.message
        }`
      );
    }
  }

  await browser.close();
})();
