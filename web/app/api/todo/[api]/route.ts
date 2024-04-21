import { checkApi, syncTasks, updateSync } from "@/app/action";

type Params = {
  api: string;
};

export async function POST(request: Request, context: { params: Params }) {
  try {
    const api = context.params.api;
    const check: any = await checkApi(api);
    if (check === 404) {
      return new Response("Invalid Api Key", { status: 404 });
    }
    const body = await request.json();
    const syncRes: any = await syncTasks(body);
    if (!syncRes) {
      return new Response("Internal Server Error", { status: 500 });
    }

    if(syncRes === 202){
      return Response.json({msg:"No tasks to sync"}, { status: 202 })
    }

    const updatedUser: any = await updateSync(api);
    if (!updatedUser) {
      return new Response("Internal Server Error", { status: 500 });
    }
    const resBody: any = {
      usr: updatedUser,
      allTasks: syncRes,
    };

    return Response.json(resBody, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
