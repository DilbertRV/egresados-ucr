import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { Sidebar } from "./components/sidebar";
import { columns } from "@/app/components/columns";
import { DataTable } from "@/app/components/data-table";
import { CalendarDateRangePicker } from "@/app/components/date-range-picker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { taskSchema } from "@/data/schema";
import { promises as fs } from "fs";
import {
  Briefcase,
  FileText,
  GraduationCap,
  Sheet,
  UserCheck,
} from "lucide-react";
import path from "path";
import { z } from "zod";

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Home() {
  const tasks = await getTasks();
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Retuen an array of años from 1982 to 2023
  const años = Array.from({ length: 41 }, (_, i) => 1982 + i);

  const { data: usuario } = await supabase.from("usuario").select();

  return (
    <div className="bg-slate-50 flex flex-col items-center justify-center">
      <div className="flex-1 space-y-4 p-8 pt-6 min-w-full xl:pl-20 xl:pr-20">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Dirección de empresas
          </h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
                Exportar
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Elige el formato de salida
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-x-2">
                  <FileText size={20} strokeWidth={1} />
                  Archivo PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-x-2">
                  <Sheet size={20} strokeWidth={1} />
                  Archivo Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Informes
            </TabsTrigger>
            <TabsTrigger value="graphics" disabled>
              Gráficos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Egresados registrados
                  </CardTitle>
                  <UserCheck strokeWidth={1} size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#005da4]">124</div>
                  <p className="text-xs text-muted-foreground">2 recientes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Egresados trabajando
                  </CardTitle>
                  <Briefcase strokeWidth={1.5} size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#005da4]">84</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Egresados con Bachillerato
                  </CardTitle>
                  <GraduationCap strokeWidth={1} size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#005da4]">68</div>
                  <p className="text-xs text-muted-foreground">
                    62% de todos los egresados
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Egresados con Licenciatura
                  </CardTitle>
                  <GraduationCap strokeWidth={1} size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#005da4]">56</div>
                  <p className="text-xs text-muted-foreground">
                    38% de todos los egresados
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 w-full xl:pl-20 xl:pr-20 md:flex">
        <DataTable data={tasks} columns={columns} />
      </div>

      {/* <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <main className="flex min-h-screen flex-col items-center p-24">
                  Hola mundo :D
                  <pre>{JSON.stringify(egresados, null, 2)}</pre>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
