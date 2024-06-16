"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
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
    await prisma.person.create({
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

  redirect("/users");
}}