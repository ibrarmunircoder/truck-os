# ROQ One - Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Setup via Homebrew

To setup environment via Homebrew at macOS, use the following commands:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install nvm
nvm install 14.16.1
nvm use
npm i
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


## Testing Apple SSO locally

To be able to test Apple SSO locally it's necessary to:
1. Configure domain in hosts: ```127.0.0.1    local.roq-one.com```
2. Generate local certificates in frontend/certificates folder like described in https://next-auth.js.org/providers/apple#create-certificate
3. Have local server running under ssl with properly configured NEXTAUTH_URL env variable. 
To achieve that please use the following command:
```
NEXTAUTH_URL=https://local.roq-one.com:3000 node local-ssl-server.js
```

To not have 3 separate environment variables ( including private key) for Apple sso, apple secret key can be generated from that 3 values. 
To generate proper apple security key from teamId, privateKey and keyId, use example script provided in
https://next-auth.js.org/providers/apple#example-jwt-code.
