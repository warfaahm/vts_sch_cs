import '@/styles/globals.css'
import Layout from "@/components/Layout";
import AppUser from "@/pages/user/_app";

export default function App({ Component, pageProps }) {
  return <AppUser Component={Component} pageProps={pageProps} />;
}
