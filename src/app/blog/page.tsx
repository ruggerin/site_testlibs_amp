import BlogGrid from "@/components/BlogGrid";
import BlogHero from "@/components/BlogHero";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";

export default function BlogPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#232323]">
      <div className="relative">
        <Navbar theme="light" />
        <BlogHero />
      </div>
      <BlogGrid />
      <PageFooter />
    </div>
  );
}
