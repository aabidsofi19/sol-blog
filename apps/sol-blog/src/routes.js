import home from "./pages/homePage.vue";
import blogPost from "./pages/blogPostPage.vue";
import editor from "./pages/editor.vue";
import myPosts from "./pages/MyPosts.vue";
export default [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/posts/:address",
    name: "post",
    component: blogPost,
  },
  {
    path: "/editor",
    name: "editor",
    component: editor,
  },
  {
    path: "/myposts",
    name: "myposts",
    component: myPosts,
  },
];
