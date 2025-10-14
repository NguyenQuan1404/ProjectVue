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
import Profile from "@/views/Client/Profile.vue";
import Orders from "@/views/Admin/Orders.vue";
import Oderhistory from "@/views/Client/Oderhistory.vue"; // ✅ đúng với file của bạn

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ================= CLIENT =================
    {
      path: "/",
      component: ClientLayout,
      children: [
        { path: "", name: "Home", component: Home },
        { path: "sign", name: "SignUp", component: SignUp },
        { path: "login", name: "Login", component: LoginView },
        { path: "product", name: "ProductCL", component: ProductCL },
        { path: "profile", name: "Profile", component: Profile },
        { path: "product/:id", name: "ProductDetail", component: ProductDetail },
        { path: "cart", name: "Cart", component: () => import("@/views/Client/Cart.vue") },
        { path: "order-history", name: "Oderhistory", component: Oderhistory }, // ✅
      ],
    },

    // ================= ADMIN =================
    {
      path: "/admin",
      component: AdminLayout,
      meta: { isAuth: true },
      children: [
        { path: "", name: "Dashboard", component: Dashboard },
        { path: "category", name: "Category", component: Category },
        { path: "product", name: "Product", component: Product },
        { path: "user", name: "User", component: User },
        { path: "orders", name: "Orders", component: Orders },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem("currentUser");

  if (to.meta.isAuth) {
    if (!currentUser) {
      return next({ name: "Login" });
    }

    const user = JSON.parse(currentUser);

    if (user.role !== "admin") {
      alert("Bạn không có quyền truy cập!");
      return next({ name: "Login" });
    }
  }

  next();
});

export default router;
