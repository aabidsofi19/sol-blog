import { CIDString, Web3Storage } from "web3.storage"
// import { CID, create } from 'ipfs-http-client'

// const ACCESS_TOKEN_PINATA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMTAzZWUwZi04MWE2LTQ5ODUtOWQzMC0yZTRkNWMzYTM2OTYiLCJlbWFpbCI6Im1haWx0b2FhYmlkMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRmZDI2YTliNWI5OTUwMDU2Yjk5Iiwic2NvcGVkS2V5U2VjcmV0IjoiNmFjZDQ3ZDcxMDBiMzcxZGMyYzVmNzViYTI2YzQ3OTM0OWNiZmUxNTc1Njg2YjJhOWVmNzUwMzMzZjkzMzg0NiIsImlhdCI6MTY0ODAxNDE5OH0.cd44MlYV0PPWJ7fM8lA78OZi5u73AX_IRVKP9pHCsT8'

// const create_client =() => create(
//     {
//         host:'api.pinata.cloud',
//         apiPath:'/psa',
//         port:443,
//         protocol:'https',
//         headers:{
//             'Authorization':'Bearer '+ACCESS_TOKEN_PINATA
//         }       
//     }
// )

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU2NDUzNGQzNTY0ODNkYzZmNjBmRUQzQTgwNGRhMDVkMzFlNEJBNWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDgwMzgxMzUxMjAsIm5hbWUiOiJzb2wtYmxvZyJ9.6einkovoTDu5acQsKiOcKJ599MDVzaD94BtJAMYS1x8"

// const create_client =  () => create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     apiPath: '/api/v0',
//     protocol: 'https',
// }
// )



const createClient = () =>  new Web3Storage({token})

const storage = createClient()

const addFile = async (file:File) => {
    // const client = create_client()
    const cid = await storage.put([file])
    return cid
}

const getFile = async (cid:CIDString) => {
    // const client =  create_client()
    console.log("fetching cid",cid)
    const res =  await storage.get(cid)
    console.log('res',res)
    return res  
}



export { addFile, getFile ,createClient}


