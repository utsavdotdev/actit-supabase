import { consoleLogin } from "@/app/action";

type Params = {
  api: string;
};

export async function POST(request: Request, context: { params: Params }) {
  try {
    const api = context.params.api;
    const data: any = await consoleLogin(api);
    if (data === 404) {
      return new Response("Invalid Api Key", { status: 404 });
    }
    if (data === 500) {
      return new Response("Internal Server Error", { status: 500 });
    }
    //send the user data as response
    return new Response(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
