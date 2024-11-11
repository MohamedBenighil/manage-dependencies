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
    }
  } catch (error) {
    console.log(error);
  }
};

export const aadBudget = async (
  email: string,
  name: string,
  amount: number,
  emogie: string
) => {
  if (!email) return;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User with email : " + email + "does not exists in db ");
    }

    const budget = await prisma.budget.create({
      data: {
        name,
        amount,
        emoji: emogie,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log("Error when adding the Budget :  ", error);
  }
};

export const getBudgetsByUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { budgets: { include: { transactions: true } } },
    });
    if (!user) {
      throw new Error("Utilisateur non trouvé!");
    }
    return user.budgets;
  } catch (error) {
    console.log("Erreur lors de lister les bidget par users : " + error);
  }
};
