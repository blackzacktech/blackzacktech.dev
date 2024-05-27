/* eslint-disable complexity */

import { redirect } from "next/navigation";
import { ImageResponse } from "next/og";
import { GetOGImage } from "@/lib/graphql";

export const runtime = "edge";
export const contentType = "image/png";
export const alt = "Repository";
export const size = {
 width: 1200,
 height: 630,
};

export async function GET(request, { params }) {
 const start = Date.now();

 if (!params) return redirect("/opengraph-image");

 const repo = params.repository;
 const owner = params.owner;

 let { theme } = Object.fromEntries(new URL(request.url.replaceAll("&amp%3B", "&")).searchParams.entries()) || "dark";

 if (!repo || !typeof repo === "string" || !owner || !typeof owner === "string") {
  console.log(repo, owner);
  return redirect("/opengraph-image");
 }

 const og = await GetOGImage(repo, owner.toLowerCase());

 if (!og || og.private) {
  return redirect("/opengraph-image");
 }

 if (og && og.og && og.domain === "repository-images.githubusercontent.com") {
  const image = await fetch(og.og);
  const buffer = await image.arrayBuffer();
  const type = image.headers.get("Content-Type");

  return new Response(buffer, {
   headers: {
    "Content-Type": type,
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Response-Time": `${Date.now() - start}ms`,
   },
  });
 }

 const fontBold = await fetch(new URL("/public/fonts/Geist-Black.otf", import.meta.url)).then((res) => res.arrayBuffer());
 const fontRegular = await fetch(new URL("/public/fonts/Geist-Regular.otf", import.meta.url)).then((res) => res.arrayBuffer());

 const mostUsedLanguage = og.languages && og.languages.length > 0 ? og.languages.reduce((a, b) => (a.size > b.size ? a : b)) : { node: { name: "Unknown", color: "#c1c1c1" }, size: 0 };

 /* eslint-disable @next/next/no-img-element */
 return new ImageResponse(
  (
   <div
    style={{
     height: "100%",
     width: "100%",
     display: "flex",
     flexDirection: "column",
     padding: "0 10%",
     justifyContent: "center",
     backgroundColor: theme === "light" ? "#fff" : "#101110",
     fontSize: 64,
     fontWeight: 900,
     boxShadow: `inset 0px 0px 277px 3px ${theme === "light" ? "#fff" : "#101110"}`,
     backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='${theme === "light" ? "rgb(0,0,0,0.05)" : "rgb(255,255,255,0.05)"}'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
    }}
   >
    <div
     style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
     }}
    >
     <img
      src={og.owner.avatar}
      height="128px"
      width="128px"
      style={{
       width: "128px",
       height: "128px",
       display: "flex",
       borderRadius: "15%",
      }}
      alt="Avatar"
     />

     <div
      style={{
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
      }}
     >
      <h1 style={{ color: theme === "light" ? "#000" : "#fff", fontFamily: "Geist-Black", fontSize: 32, margin: "0 0 15px 0" }}>
       {owner}
       <span style={{ color: "#c1c1c1", fontFamily: "Geist-Black" }}>/</span>
       {repo}
      </h1>
      <p style={{ color: "#c1c1c1", fontFamily: "Geist-Regular", fontSize: 24, maxWidth: "90%", margin: 0, padding: 0 }}>{og.description}</p>
     </div>
    </div>
    {og.languages && og.languages.length > 0 && (
     <div
      style={{
       display: "flex",
       flexDirection: "column",
       width: "100%",
       alignItems: "flex-start",
      }}
     >
      <div
       style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        borderRadius: "10px",
        paddingTop: "20px",
       }}
      >
       {og.languages.map((lang, i) => (
        <div
         key={lang.node.name}
         style={{
          display: "flex",
          alignItems: "center",
          width: (lang.size / og.languages.reduce((a, b) => a + b.size, 0)) * 100 + "%",
          height: "10px",
          backgroundColor: lang.node.color,
          borderRadius: og.languages.length === 1 ? "10px" : i === 0 ? "10px 0 0 10px" : i === og.languages.length - 1 ? "0 10px 10px 0" : 0,
         }}
        />
       ))}
      </div>

      {mostUsedLanguage && (
       <p style={{ color: mostUsedLanguage.node.color || "#c1c1c1", fontFamily: "Geist-Black", fontSize: 16, maxWidth: "90%", margin: 0, padding: 0, paddingTop: "10px" }}>
        {mostUsedLanguage.node.name} {Math.floor((mostUsedLanguage.size / og.languages.reduce((a, b) => a + b.size, 0)) * 100) + "%"}
       </p>
      )}
     </div>
    )}
   </div>
  ),
  {
   width: 1200,
   height: 630,
   debug: false,
   headers: {
    ...(process.env.NODE_ENV !== "production" && {
     "Server-Timing": `response;dur=${Date.now() - start}ms`,
    }),
   },
   fonts: [
    {
     name: "Geist-Black",
     data: fontBold,
     style: "normal",
     weight: 900,
    },
    {
     name: "Geist-Regular",
     data: fontRegular,
     style: "normal",
     weight: 400,
    },
   ],
  }
 );
}
