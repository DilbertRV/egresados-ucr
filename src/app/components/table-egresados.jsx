import { promises as fs } from "fs";
import Image from "next/image";
import path from "path";
import { z } from "zod";

import { UserNav } from "@/app/components/navbar/user-nav";
import { columns } from "@/app/components/table/columns";
import { DataTable } from "@/app/components/table/data-table";
import { taskSchema } from "./data/schema";

export const metadata = {
  title: "Egresados de la UCR",
  description: "Tabla de egresados de la UCR",
};

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/examples/tasks/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
