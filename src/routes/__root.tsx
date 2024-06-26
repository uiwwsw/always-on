import { createRootRoute, Outlet } from "@tanstack/react-router";
import GlobalProvider from "components/GlobalProvider";
import Nav from "components/Nav";
import { useScroll, useSpring, motion } from "framer-motion";
import { Bounce, ToastContainer } from "react-toastify";
export const Route = createRootRoute({
  component: Layout,
});
function Layout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);
  return (
    <GlobalProvider>
      <div className="flex flex-col bg-white m-auto max-w-xl min-h-screen">
        <div className="top-0 sticky h-1">
          <motion.div
            className="bg-zinc-900 h-full origin-left"
            style={{ scaleX }}
          />
        </div>

        <div className="flex-auto">
          <Outlet />
        </div>
        <Nav />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </GlobalProvider>
  );
}
