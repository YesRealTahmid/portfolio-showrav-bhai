<<<<<<< HEAD
import Image from "next/image";
import React from "react";

interface Blog {
  _id: string;
  title: string;
  category: string;
  image?: string;
  content?: string;
}

interface BlogPageProps {
  params: {
    id: string;
  };
}

async function fetchBlog(id: string): Promise<Blog | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/topics/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch blog data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  console.log(id);

  const blog = await fetchBlog(id);

  if (!blog) {
    return <div>Blog not found. Please check the URL.</div>;
  }

  return (
    <main className="main-content w-[90%] text-white single-blog">
      <div className="w-[90%] ml-4">
        <h3 className="h2 article-title">{blog?.topic?.title}</h3>
        <div className="flex gap-3 mb-4">
          <p className="text-white">{blog?.topic?.category} |</p>
          <time dateTime={blog?.topic?.date} className="text-white">
            {blog?.topic?.date}
          </time>
        </div>
        <div>
          <Image
            className="rounded-2xl"
            src={blog?.topic?.image || "/default-image.jpg"}
            alt={blog.title || "Default Title"}
            width={800}
            height={200}
          />
        </div>
        <p className="mt-12 leading-10"> {blog?.topic?.description || "No content available."}</p>
      </div>
    </main>
  );
}
=======
import blogs from "@/public/data/blogData.json";
import React from "react";


interface Blog {
    id: number; // Keep as a number
    title: string;
    category: string;
    date: string;
    image?: string;
    content?: string;
}

interface BlogPageProps {
    params: {
        id: string;
    };
    title: string;
}

export default function BlogPage({ params, title }: BlogPageProps) {
    const { id } = params;
    console.log("Params received:", params);

    const blog = (blogs as Blog[]).find((b) => b.id.toString() === id); // Convert blog.id to string
    console.log("Blog found:", blog);

    // if (!blog) {
    //     return <div>Blog not found. Please check the URL.</div>;
    // }

    return (
        <main className="main-content w-[90%] text-white">
            <div>
                Blog id is: {id} and title is {title}
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    const blogs = (await import("@/public/data/blogData.json")).default as Blog[];
    return blogs.map((blog) => ({
        id: blog.id.toString(),
    }));
}

>>>>>>> 0f08fb3272f8b796ae48b6416bb7199d5a599d7f
