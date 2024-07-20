"use server";
import prisma from "@/lib/prisma";
import { userSchema } from "@/app/users/register/form-register";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function createUser(data: z.infer<typeof userSchema>) {
  const { username, email, password } = data;

  // Verificar si el username ya existe
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    throw new Error("El nombre de usuario ya está en uso");
  }

  // Verificar si el email ya existe
  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    throw new Error("El correo electrónico ya está registrado");
  }

  // Si no existen, proceder con la creación del usuario
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    revalidatePath("/users");
    return { success: true, message: "Usuario creado exitosamente" };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error("Error al crear el usuario");
  }
}

export async function updateUser(id: string, data: z.infer<typeof userSchema>) {
  const { username, email, password } = data;

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  await prisma.user.update({
    where: {
      id: id
    },
    data: {
      username,
      email,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
  revalidatePath("/users");
  redirect("/users");
}

export async function removeUser(formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  await prisma.user.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/users");
}

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
}

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
}