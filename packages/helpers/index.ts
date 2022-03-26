import { Web3Response } from "web3.storage";

const sluggify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

//create a file from content string
async function createFile(content: string, title: string) {
  return new File([content], `${sluggify(title)}.txt`, { type: "text/plain" });
}

const getFileFromWeb3Result = async (res: Web3Response, index: number) => {
  index = index ?? 0;
  if (res) {
    const files = await res.files();
    if (files.length > index) {
      const file = files[index];
      return file;
    }
  }
};

const addImageFileToImageElem = async (
  imageElem: HTMLImageElement,
  image: File
) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => {
    imageElem.src = reader.result as string;
  };
};

export { createFile, sluggify, getFileFromWeb3Result, addImageFileToImageElem };
