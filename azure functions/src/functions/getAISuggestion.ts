// https://streamscape.azurewebsites.net/api/getaisuggestion

import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAISuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    context.log(`Http function processed request for url "${request.url}"`);

    const term = request.query.get("term");

    if (!term) {
      return {
        status: 400,
        body: "Missing 'term' parameter in the request query string.",
      };
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a digital video assistant working for services such as Netflix, Disney Plus, and Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide a quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on the genre.`,
        },
        {
          role: "user",
          content: `I like ${term}`,
        },
      ],
    });

    if (!completion || !completion.choices || completion.choices.length === 0) {
      return {
        status: 500,
        body: "Failed to generate AI suggestion.",
      };
    }

    console.log(completion.choices[0]);

    return { body: completion.choices[0].message.content || "No suggestion" };
  } catch (error) {
    context.log(error);

    return {
      status: 500,
      body: "Internal Server Error",
    };
  }
}

app.http("getAISuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getAISuggestion,
});
