import { CIDString, Web3Storage } from "web3.storage"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU2NDUzNGQzNTY0ODNkYzZmNjBmRUQzQTgwNGRhMDVkMzFlNEJBNWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDgwMzgxMzUxMjAsIm5hbWUiOiJzb2wtYmxvZyJ9.6einkovoTDu5acQsKiOcKJ599MDVzaD94BtJAMYS1x8"

const createClient = () =>  new Web3Storage({token})

const storage = createClient()

const addFile = async (file:File) => {
    // const client = create_client()
    const cid = await storage.put([file])
    return cid
}

const getFile = async (cid:CIDString) => {
    console.log("fetching cid",cid)
    const res =  await storage.get(cid)
    console.log('res',res)
    return res  
}



export { addFile, getFile ,createClient}


