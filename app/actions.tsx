"use server";

import prisma from "@/lib/script";

export const checkAndAddUser = async (email: string | undefined) => {
  if (!email) return;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          email,
        },
      });
      console.log("the user with email ", email, "created successfully");
    } else {
      console.log("the user with email", email, "already exists");
    }
  } catch (error) {
    console.log("Error when cheking the user ", error);
  }
};
