## World ID Authentication with Next.js

To learn more about WorldID click [here](https://docs.worldcoin.org/)

> This app implements unlimited verifications for more of a traditional authentication flow, for single use verification for sybil resistance, set the `Verifications per person` to be __Unique__.

<img
  src="world-id.png"
  width="800"
/>

### Running the app

1. Clone the repo and install dependencies

```sh
git clone git@github.com:dabit3/worldid-auth.git

cd worldid-auth

npm install

# or yarn, pnpm, bun, etc...
```

2. Create WorldID App

> Be sure to set the app as "Production" to use on a real device.

<img
  src="wcid-app.png"
  width="700"
/>

3. Create WorldID Action

> Be sure to set the Maximum Verifications Per User to "Unlimited"

<img
  src="wcid-action.png"
  width="700"
/>

4. Configure environment variables, including App ID and Action from previous two steps.

```sh
# rename .env.local.example to .env.local

# Airstack API Key
AIRSTACK_API_KEY=""

# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=""

# WorldCoin ID Action Name
NEXT_PUBLIC_WC_ACTION=""

# Worldcoin ID App Name
# Remove "_app" from the WorldCoin App ID before setting
NEXT_PUBLIC_WLD_APP_ID=""
```

5. Run the app

```sh
npm run dev
```