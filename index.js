import { Stagehand } from "@browserbasehq/stagehand";
import { fetchNews } from "./newsFetcher.js";
async function main () {
  const stagehand = new Stagehand({
    env: "LOCAL",
    modelName: "gpt-4o",
    localBrowserLaunchOptions: {
      headless: true,
    },
    modelClientOptions: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  });
  await stagehand.init();

  const page = stagehand.page;

  await page.goto("https://www.linkedin.com/");
  await page.act("click sign in button");
  await page.act(`Type in '${process.env.LINKDIN_EMAIL}' into the email or phone`);
  await page.act(`Type in '${process.env.LINKDIN_PASS}' into the password`);
  await page.act("click login button");
  await page.act("wait for home page load where you will see my name as sourabh kumawat")
  const topic = process.env.TOPIC;
  const newsItems = await fetchNews(topic);
  console.log(newsItems)
  await page.act('start a new post')
  const editorLocator = page.locator('.ql-editor[contenteditable="true"]');
  await editorLocator.waitFor({ state: 'visible', timeout: 10000 });
  await editorLocator.evaluate((el, content) => {
    el.innerHTML = `<p>${content}</p>`;
  }, newsItems);
  await page.act("click on post")
  await stagehand.close();
}

main();