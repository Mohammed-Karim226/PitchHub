import { defineField, defineType } from "sanity";

export const comment = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
        name: "id",
        type: "string",
      }),
    defineField({
      name: "type",
      type: "string",
    }),
    defineField({
        name: "comment",
        type: "string",
      }),
    defineField({
        name: "name",
        type: "string",
      }),
  ],
});
