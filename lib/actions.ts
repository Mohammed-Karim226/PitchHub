"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const promptOne = `Generate a compelling startup pitch description with 150 words.
    Title: ${title}
    Category: ${category}`;

    const promptTwo = `Generate a compelling startup pitch content that follwoing MD formatting with 500 words.
    Title: ${title}
    Category: ${category}`;

    let AI_Description = "";
    let AI_Content = "";


   if(!description){
    const descriptionResult = await model.generateContentStream(promptOne);
    for await (const chunk of descriptionResult.stream) {
      AI_Description += chunk.text();
    }
   }


 if(!pitch){
  const contentResult = await model.generateContentStream(promptTwo);
  for await (const chunk of contentResult.stream) {
    AI_Content += chunk.text();
  }
 }
    
    const startup = {
      title,
      description: description || AI_Description,
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
      pitch: pitch || AI_Content,
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

  try {

    if (!session)
      return parseServerActionResponse({
        error: "Not signed in",
        status: "ERROR",
      });
      const pitch = await writeClient.fetch(
        `*[_type == "startup" && _id == $pitchId][0] { _id, author }`,
        { pitchId }
      );
      if (pitch.author._ref !== session.id) {
        return parseServerActionResponse({
          error: "Unauthorized",
          status: "ERROR",
        });
      }

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