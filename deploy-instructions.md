# How to Deploy to Netlify Manually

Due to the use of dynamic client-side routes (`[category]`, `product/[id]`), this Next.js app cannot be compiled to a pure static HTML export without extensive refactoring. 

To manually deploy this application to Netlify and preserve its server-side routing features, you should use the **Netlify CLI**.

## Prerequisites
1. Ensure you have a Netlify account.
2. Install the Netlify CLI globally if you haven't already:
   ```bash
   npm install -g netlify-cli
   ```

## Deployment Steps

1. Open your terminal and navigate to the `crauleyco-frontend` directory:
   ```bash
   cd "d:\Wrokplace\On Going Project\New folder\CrauleyCo_test\crauleyco-frontend"
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```
   *(This will open a browser window for you to authenticate)*

3. Run the manual deploy command:
   ```bash
   netlify deploy --build
   ```

4. Follow the prompts:
   - Choose to **Create & configure a new site** (or link to an existing one).
   - Select your team and choose a site name.
   - For the build command and publish directory, simply press **Enter** (the `netlify.toml` file we added already configures this for you).

5. **Test the draft:** Netlify will provide a "Website Draft URL". Visit it to ensure everything is working correctly.

6. **Deploy to production:** Once you're satisfied with the draft, run the production deploy command:
   ```bash
   netlify deploy --build --prod
   ```

Your site is now live! Netlify will automatically use the `@netlify/plugin-nextjs` adapter to serve your dynamic routes seamlessly.
