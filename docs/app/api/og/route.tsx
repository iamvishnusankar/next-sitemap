import { ImageResponse } from "@vercel/og";

import { ogImageSchema } from "@/lib/validations/og";

export const runtime = "edge";

const photo = fetch(
  new URL(`../../../public/logo.jpg`, import.meta.url)
).then((res) => res.arrayBuffer());

const ranadeRegular = fetch(
  new URL("../../../assets/fonts/Ranade-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const satoshiBold = fetch(
  new URL("../../../assets/fonts/Satoshi-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  try {
    const fontRegular = await ranadeRegular;
    const fontBold = await satoshiBold;

    const url = new URL(req.url);
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
    const heading =
      values.heading.length > 140
        ? `${values.heading.substring(0, 140)}...`
        : values.heading;

    const { mode } = values;
    const paint = mode === "dark" ? "#fff" : "#000";

    const fontSize = heading.length > 100 ? "70px" : "100px";

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{
            color: paint,
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #000 0%, #111 100%)"
                : "white",
          }}
        >
          <img
            tw="h-[50px] w-[212px]"
            alt="logo"
            // @ts-ignore
            src={await photo}
          />

          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex text-xl uppercase font-bold tracking-tight"
              style={{ fontFamily: "Ranade", fontWeight: "normal" }}
            >
              {values.type}
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold"
              style={{
                fontFamily: "Satoshi",
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {heading}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div
              tw="flex text-xl"
              style={{ fontFamily: "Ranade", fontWeight: "normal" }}
            >
              next-site map
            </div>
            <div
              tw="flex items-center text-xl"
              style={{ fontFamily: "Ranade", fontWeight: "normal" }}
            >
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 36c-9.02 4-10-4-14-4"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div tw="flex ml-2">github.com/iamvishnusankar/next-sitemap</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Ranade",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Satoshi",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
