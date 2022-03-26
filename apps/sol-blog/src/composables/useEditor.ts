import { readonly, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { BlogPostInputInterface } from "types";
import { BlogProgram } from "types";
import { Provider } from "@project-serum/anchor";
import { createPost } from "api";

const postData: Ref<BlogPostInputInterface | {}> = ref({});

const isPosData = (
  data: BlogPostInputInterface | {}
): data is BlogPostInputInterface => {
  return (
    (data as BlogPostInputInterface).title !== undefined &&
    (data as BlogPostInputInterface).content !== undefined &&
    (data as BlogPostInputInterface).banner !== undefined
  );
};

const publishing = ref(false);
const error = ref("");
const status = ref("draft");

const publishPost = async (program: BlogProgram, provider: Provider) => {
  publishing.value = true;
  const router = useRouter();
  if (!isPosData(postData.value)) {
    error.value = "Please fill out all fields";
    return;
  }

  try {
    let post = await createPost(program, provider, postData.value);
    status.value = "published";
  } catch (e) {
    console.log(e);
    error.value = e as string;
  } finally {
    publishing.value = false;
    router.push({ name: "home" });
  }
};

export default () => {
  return {
    postData,
    publishing: readonly(publishing),
    error: readonly(error),
    status: readonly(status),
    publishPost,
  };
};
