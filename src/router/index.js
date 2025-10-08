import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/views/AdminLayout.vue";
import ClientLayout from "@/views/ClientLayout.vue";
import Dashboard from "@/views/Admin/Dashboard.vue";
import Category from "@/views/Admin/Category.vue";
import Home from "@/views/Client/Home.vue";
import SignUp from "@/views/Client/SignUp.vue";
import LoginView from "@/views/Client/LoginView.vue";
import ProductCL from "@/views/Client/Product.vue";
import Product from "@/views/Admin/Product.vue";
import User from "@/views/Admin/User.vue";
import ProductDetail from "@/views/Client/ProductDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ClientLayout",
      component: ClientLayout,
      children: [
        { path: "", name: "Home", component: Home },
        {
          path: "/sign",
          name: "sign",
          component: SignUp,
        },
        {
          path: "/login",
          name: "Login",
          component: LoginView,
        },
        {
          path: "/product",
          name: "ProductCL",
          component: ProductCL,
        },
        {
          path: '/product/:id',
          name: 'ProductDetail',
          component: ProductDetail,
        },
      ],
    },
    {
      path: "/admin",
      component: AdminLayout,
      meta: { isAuth: true },
      children: [
        { path: "", name: "Dashboard", component: Dashboard },
        { path: "/admin/category", name: "Category", component: Category },
        { path: "/admin/product", name: "Product", component: Product },
        { path: "/admin/user", name: "User", component: User },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem("currentUser");

  if (to.meta.isAuth) {
    if (!currentUser) {
      // chưa đăng nhập
      return next({ name: "Login" });
    }

    const user = JSON.parse(currentUser);

    // check role (chỉ cho admin)
    if (user.role !== "admin") {
      alert("Bạn không có quyền truy cập!");
      return next({ name: "Login" });
    }
  }

  next();
});
export default router;