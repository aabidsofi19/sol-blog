import { Ref, ref, readonly } from "vue";
import { BlogPostInputInterface } from "types";

const postData: Ref<BlogPostInputInterface> = ref({
  content: "write here",
} as BlogPostInputInterface);

export default () => {
  const getSavedData = (key: string) => {
    const savedData = localStorage.getItem(key);
    return savedData
      ? (JSON.parse(savedData) as BlogPostInputInterface)
      : ({} as BlogPostInputInterface);
  };

  const persistPostData = (key: string, data: BlogPostInputInterface) => {
    localStorage.setItem(
      key,
      JSON.stringify({ title: data.title, content: data.content })
    );
  };

  const setPostData = (data: BlogPostInputInterface, key = "blogPost") => {
    postData.value = data;
    persistPostData(key, data);
  };

  return {
    postData,
    getSavedData,
    setPostData,
    persistPostData,
  };
};
