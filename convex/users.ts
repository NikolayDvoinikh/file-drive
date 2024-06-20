import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  query,
} from "./_generated/server";

export async function getUser(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string
) {
  console.log(tokenIdentifier);
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier)
    )
    .first();
  // console.log(user);

  if (!user) {
    throw new ConvexError("expected user to be defined");
  }

  return user;
}

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string() },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      orgIds: [],
    });
  },
});

// export const updateUser = internalMutation({
//   args: { tokenIdentifier: v.string(), name: v.string(), image: v.string() },
//   async handler(ctx, args) {
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_tokenIdentifier", (q) =>
//         q.eq("tokenIdentifier", args.tokenIdentifier)
//       )
//       .first();

//     if (!user) {
//       throw new ConvexError("no user with this token found");
//     }

//     await ctx.db.patch(user._id, {
//       name: args.name,
//       image: args.image,
//     });
//   },
// });

export const addOrgIdToUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      orgIds: [...user.orgIds, args.orgId],
    });
  },
});

// export const updateRoleInOrgForUser = internalMutation({
//   args: { tokenIdentifier: v.string(), orgId: v.string(), role: roles },
//   async handler(ctx, args) {
//     const user = await getUser(ctx, args.tokenIdentifier);

//     const org = user.orgIds.find((org) => org.orgId === args.orgId);

//     if (!org) {
//       throw new ConvexError(
//         "expected an org on the user but was not found when updating"
//       );
//     }

//     org.role = args.role;

//     await ctx.db.patch(user._id, {
//       orgIds: user.orgIds,
//     });
//   },
// });

// export const getUserProfile = query({
//   args: { userId: v.id("users") },
//   async handler(ctx, args) {
//     const user = await ctx.db.get(args.userId);

//     return {
//       name: user?.name,
//       image: user?.image,
//     };
//   },
// });

// export const getMe = query({
//   args: {},
//   async handler(ctx) {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       return null;
//     }

//     const user = await getUser(ctx, identity.tokenIdentifier);

//     if (!user) {
//       return null;
//     }

//     return user;
//   },
// });