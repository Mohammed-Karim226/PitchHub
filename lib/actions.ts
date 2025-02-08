"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (form: FormData, pitch: string) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updatePitch = async (pitchId: string, form: FormData) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

    if(!form){
      return parseServerActionResponse({
        error: "No form data for this pitch.",
        status: "ERROR",
      });
    }

    try {
      const pitch = await writeClient.fetch(
        `*[_type == "startup" && _id == $pitchId][0] { _id, author }`,
        { pitchId }
      );

      if(!pitch){
        return parseServerActionResponse({
          error: "Pitch not found.",
          status: "ERROR",
        });
      }

      if (pitch.author._ref !== session.id) {
        return parseServerActionResponse({
          error: "Unauthorized",
          status: "ERROR",
        });
      }

      const updatedPitch = await writeClient.patch(pitchId).set(Object.fromEntries(form)).commit();

      return parseServerActionResponse({
        ...updatedPitch,
        error: "",
        status: "SUCCESS",
      })
    } catch (error) {
      return parseServerActionResponse({
        error: JSON.stringify(error),
        status: "ERROR",
      });
    }
   
   
}

export const deletePitch = async (pitchId: string) =>{
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    const result = await writeClient.delete(pitchId);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}