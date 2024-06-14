import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

export default function UserCreate() {

    async function createUser(formData: FormData) {
      "use server";

    const cPerLastname = formData.get("cPerLastname")?.toString();
    const cPerName = formData.get("cPerName")?.toString();
    const cPerAddress = formData.get("cPerAddress")?.toString();
    const cPerDateBorn = formData.get("cPerDateBorn")?.toString();
    const nPerYears = parseInt(formData.get("nPerYears")?.toString() || "0", 10);
    const nPerSalary = parseFloat(formData.get("nPerSalary")?.toString() || "0");
    const cPerRnd = formData.get("cPerRnd")?.toString();
    const cPerState = formData.get("cPerState")?.toString();
    const cPerSexo = formData.get("cPerSexo")?.toString();
    const remember_token = formData.get("remember_token")?.toString();


    if (cPerLastname && cPerName && cPerAddress && cPerDateBorn && cPerRnd && cPerState && remember_token) {
      const newPerson =await prisma.person.create({
        data: {
          cPerLastname,
          cPerName,
          cPerAddress,
          cPerDateBorn: new Date(cPerDateBorn),
          nPerYears,
          nPerSalary,
          cPerRnd,
          cPerState,
          cPerSexo,
          remember_token,
        },
      });
      console.log(newPerson)

    redirect("/users");
  }}

  return (

      <div className="flex min-h-screen w-full m-auto flex-col pb-24 pt-10">
        <form action={createUser}>
        <Card className="max-w-2xl m-auto">
        <CardHeader>
          <CardTitle className="text-3xl mb-4">Crear Persona</CardTitle>
          <CardDescription>
            Rellena el formulario para realizar el registro.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-3">
        <Label htmlFor="cPerLastname">Apellido:</Label>

          <Input type="text" id="cPerLastname" name="cPerLastname" required />
      </div>
          <Label htmlFor="cPerName">Nombre:</Label>
          <Input type="text" id="cPerName" name="cPerName" required />
      <div className="flex flex-col space-y-3">
      </div>
          <Label htmlFor="cPerAddress">Dirección:</Label>
          <Input type="text" id="cPerAddress" name="cPerAddress" required />
      <div className="flex flex-col space-y-3">
      </div>
      <div className="flex flex-col space-y-3">
          <Label htmlFor="cPerDateBorn">Fecha de Nacimiento:</Label>
          <Input type="date" id="cPerDateBorn" name="cPerDateBorn" required />
      </div>
      <div className="flex flex-col space-y-3">
          <Label htmlFor="nPerYears">Años:</Label>
          <Input type="number" id="nPerYears" name="nPerYears" required />
      </div>
      <div className="flex flex-col space-y-3">
          <Label htmlFor="nPerSalary">Salario:</Label>
          <Input type="number" step="0.01" id="nPerSalary" name="nPerSalary" required />
      </div>
      <div className="flex flex-col space-y-3">
          <Label htmlFor="cPerRnd">RND:</Label>
          <Input type="text" id="cPerRnd" name="cPerRnd" required />
      </div>
      <div className="flex flex-col space-y-3">
          <Label htmlFor="cPerState">Estado:</Label>
          <Select name="cPerState">
                <SelectTrigger id="cPerState">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">Activo</SelectItem>
                  <SelectItem value="0">Inactivo</SelectItem>
                </SelectContent>
              </Select>
      </div>
      <div className="flex flex-col space-y-3">
          <Label htmlFor="cPerSexo">Sexo:</Label>
          <Input type="text" id="cPerSexo" name="cPerSexo" />
      </div>
      <div className="flex flex-col space-y-3">
          <Label htmlFor="remember_token">Token:</Label>
          <Input type="text" id="remember_token" name="remember_token" required />
      </div>
      </div>
        

        </CardContent>
        <CardFooter className="flex w-full">
        <Button className="w-full" type="submit">Crear</Button>

        </CardFooter>
      </Card>
        </form>
      </div>
  );

}