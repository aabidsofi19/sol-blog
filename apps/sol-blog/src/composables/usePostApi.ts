import { readonly, Ref, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { BlogPostInputInterface } from "types";
import { BlogProgram } from "types";
import { Provider } from "@project-serum/anchor";
import {
  createPost,
  updatePost,
  generateCreatePostInput,
  deletePost,
} from "api";

const isPosData = (
  data: BlogPostInputInterface | {}
): data is BlogPostInputInterface => {
  return (
    (data as BlogPostInputInterface).title !== undefined &&
    (data as BlogPostInputInterface).content !== undefined &&
    (data as BlogPostInputInterface).banner !== undefined
  );
};
export const useCreateNewPost = () => {
  const publishing = ref(false);
  const error = ref("");
  const status = ref("draft");
  const router = useRouter();

  const publishPost = async (
    postData: BlogPostInputInterface,
    program: BlogProgram,
    provider: Provider
  ) => {
    if (!isPosData(postData)) {
      error.value = "Please fill out all fields";
      return;
    }

    publishing.value = true;
    try {
      status.value = "uploading to ipfs";
      const input = await generateCreatePostInput(postData);
      status.value = "transaction pending";
      await createPost(program, provider, input);
      status.value = "published";

      router.push({ name: "home" });
    } catch (e) {
      console.log("error", e);
      error.value = e as string;
    } finally {
      publishing.value = false;
    }
  };

  return {
    publishing: readonly(publishing),
    error: readonly(error),
    status: readonly(status),
    publishPost,
  };
};

export const useUpdatePost = () => {
  const publishing = ref(false);
  const error = ref("");
  const status = ref("published");
  const router = useRouter();

  const publishPost = async (
    postData: BlogPostInputInterface,
    postPubKey: string,
    program: BlogProgram,
    provider: Provider
  ) => {
    if (!isPosData(postData)) {
      error.value = "Please fill out all fields";
      return;
    }

    publishing.value = true;

    try {
      status.value = "uploading to ipfs";
      const input = await generateCreatePostInput(postData);
      status.value = "transaction pending";
      await updatePost(program, provider, input, postPubKey);
      status.value = "updated";
      router.push({ name: "home" });
    } catch (e) {
      console.log(e);
      error.value = e as string;
    } finally {
      publishing.value = false;
    }
  };

  return {
    publishing: readonly(publishing),
    error: readonly(error),
    status: readonly(status),
    publishPost,
  };
};

export const useDeletePost = () => {
  const loading = ref(false);
  const error = ref("");

  const mutate = async (
    postPubKey: string,
    program: BlogProgram,
    provider: Provider
  ) => {
    loading.value = true;

    try {
      deletePost(program, provider, postPubKey);
    } catch (e) {
      console.log(e);
      error.value = e as string;
    } finally {
      loading.value = false;
    }
  };

  return {
    publishing: readonly(loading),
    error: readonly(error),
    deletePost: mutate,
  };
};

export const useQuery = (query: Function, args: any[]) => {
  console.log(args);
  const loading = ref(true);
  const errors = ref<Error[]>([]);
  const data = ref(null);
  const fetch = async (args: any[]) => {
    try {
      data.value = await query(...args);
    } catch (error) {
      errors.value.push(error as Error);
      
    } finally {
      loading.value = false;
    }
  };

  const refetch = () => fetch(args);

  watchEffect(() => {
    fetch(args);
  });

  return {
    loading,
    errors,
    refetch,
    data,
  };
};
