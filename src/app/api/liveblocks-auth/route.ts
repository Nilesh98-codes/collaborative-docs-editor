import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(req: Request) {
  try {
    const { sessionClaims } = await auth();

    if (!sessionClaims) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { room } = await req.json();

    if (!room) {
      return new Response("Missing room", { status: 400 });
    }

    const token = await auth().then(a => a.getToken({ template: "convex" }));

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    convex.setAuth(token);

    const document = await convex.query(api.documents.getById, { id: room });

    if (!document) {
      return new Response("Not found", { status: 404 });
    }

    const isOwner = document.ownerId === user.id;
const claims = sessionClaims as Record<string, unknown>;
const orgId = (claims?.org_id || (claims?.o as Record<string, unknown>)?.id) as string | undefined;    const isOrganizationMember = !!(document.organizationId && document.organizationId === orgId);

    if (!isOwner && !isOrganizationMember) {
      return new Response("Forbidden", { status: 403 });
    }

    const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
    const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = Math.abs(nameToNumber) % 360;

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name,
        avatar: user.imageUrl,
        color: `hsl(${hue}, 80%, 60%)`,
      },
    });

    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    return new Response(body, {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Liveblocks auth error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}