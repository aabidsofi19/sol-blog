import CreatePost from "@/pages/CreatePost.vue";

export default [
  {
    path: "/",
    name: "home",
    component: () => import("./pages/homePage.vue"),
  },
  {
    path: "/posts/:address",
    name: "post",
    component: () => import("./pages/blogPostPage.vue"),
  },
  {
    path: "/create-post",
    name: "create-post",
    component: CreatePost,
  },
  {
    path: "/posts/user/:id",
    name: "user-posts",
    component: () => import("./pages/UserPosts.vue"),
  },
  {
    path: "/posts/:postPubKey/update",
    name: "update-post",
    component: () => import("./pages/UpdatePost.vue"),
  },
];
