export default {
  Query: {
    async allEvents(parent, args, ctx, info) {
      const events = await ctx.prisma.event.findMany();

      return events;
    },
  },
  Mutation: {
    async createSource(parent, args, ctx, info) {
      const source = await ctx.prisma.source.create({
        data: {
          ...args,
        },
      });

      return source;
    }
  }
};