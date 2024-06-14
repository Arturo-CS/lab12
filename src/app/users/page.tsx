import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";

export default async function Users() {
  const users = await prisma.person.findMany();

  return (
  <div>
    <div className="flex justify-end items-center pt-16">
      <Button><Link href="users/create">Registrar Persona</Link></Button>
    </div>
    <div className="flex min-h-screen flex-col items-center pb-24 ">
      <h1 className="text-3xl font-bold mb-10p">Personas</h1>
      <Table>
        <TableCaption>Una lista de personas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Código</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Fecha de Nacimiento</TableHead>
            <TableHead>Años</TableHead>
            <TableHead>Salario</TableHead>
            <TableHead>RND</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Sexo</TableHead>
            <TableHead>Token</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.nPerCode}>
              <TableCell className="font-medium">{user.nPerCode}</TableCell>
              <TableCell>{user.cPerLastname}</TableCell>
              <TableCell>{user.cPerName}</TableCell>
              <TableCell>{user.cPerAddress}</TableCell>
              <TableCell>{new Date(user.cPerDateBorn).toLocaleDateString()}</TableCell>
              <TableCell>{user.nPerYears}</TableCell>
              <TableCell>{user.nPerSalary.toFixed(2)}</TableCell>
              <TableCell>{user.cPerRnd}</TableCell>
              <TableCell>{user.cPerState}</TableCell>
              <TableCell>{user.cPerSexo}</TableCell>
              <TableCell>{user.remember_token}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
  );
}
