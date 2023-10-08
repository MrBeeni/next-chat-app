import Navbar from "@/Components/navbar";
import { MyProvider } from "@/context/MyContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <MyProvider>
      <Navbar />
      <Component {...pageProps} />
    </MyProvider>
  );
}
