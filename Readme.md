## What is flope .

flope is a decentralized blogging platform similar to medium but based on the solana blockchain . It is a Web3 app(dapp) which means it is a blockchain program and the data is solely owned by nobody but the user . All you need to get started on posting is a solana wallet ; phantom , sollet and solfare are some of the popular options . Dont forget to install the browser extention for the selected wallet .

## Local Setup Requirements

Dependencies :

- Anchor CLI
- SOLANA Development Suite
- Yarn
- Node

Installation :

- In the project root do `yarn install`

Local Server :

- `yarn dev`

Build :

- `yarn build`

## Why flope .

![blogging](https://aabidsofi.com/projects/flope/blogging.jpg)

As we are currently having a lots of options in the blogging verse like medium ,
dev.to , hashnode , etc to mention a few .

But all of these are typical web2
based apps . Which means all of the data is owned by the applications . They
have the power to censor their content and the algorithm to destribute it . But
with Web3 apps . the power shifts completely into the hands of the users.

Web3 apps use smart contracts which are basically determinstic programs that run on
the blockchain . smartcontracts can be audited for security flaws so that the
app can be trusted .

## Why Solana not ethereum .

![blockchain stats](https://aabidsofi.com/projects/flope/solana-stats.jpeg)

For a while ethereum has been the go to choice for dapps among devs and most
major DAO's do also use it . But the problem with ethereum is its rediculously
high gas prices and slow transactions . Which can be serious problem for
onboarding small creators . And This is where **solana** comes in .

Solana is a decentralized blockchain built to enable scalable, user-friendly apps for the
world.It is the fastest blockchain with near zero transaction fees . which is
greatly usefull for our usecase .

In solana you have pay fees to store your data
permanently into accounts. But the good thing is that Once you close the account
like deleting the blog post .Your storage fees ( called rent in solana world )
will be paid back .

## Architecture

![architecture](https://aabidsofi.com/projects/flope/architecture.png)

The architecture of the the project is pretty simple . We are having a frontend
client created using vuejs that communicates with the solana blockchain using
the solana rpc api . the core smart contracts are built using Anchor .

As mentioned earlier storing data on chain can be quite expensive . so i decided
to store the content of a blogpost on ipfs which is a decentralized filesystem
. and store the content identification hash only on the blockchain . The program
is currently deployed to solana devnet .

The frontend can also be hosted on
ipfs with domain mapping using ENS . But for the sake of simplicity we are
currently hosting the frontend on netlify .

## UI / UX and Frontend

The inspiration for the ui of the dapp has been taken for medium .
The frontend of the site has been created using vue3 and tailwindcss .
For experimental purposes i didnt use any state management library in this app
and sticked to vue composition api whenever sharing state was necessary.

Thanks .
