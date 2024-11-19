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

// export const getBudgetsByUser = async (email: string) => {
//   if (!email) return;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       include: { budgets: { include: { transactions: true } } },
//     });
//     if (!user) {
//       throw new Error("Utilisateur non trouvé!");
//     }
//     return user.budgets;
//   } catch (error) {
//     console.log("Erreur lors de lister les bidget par users : " + error);
//   }
// };

// ==============================
export const getBudgetsByUser = async (email: string, lastXday?: number) => {
  if (!email) return;
  try {
    const user =
      (lastXday &&
        (await prisma.user.findUnique({
          where: { email },
          include: {
            budgets: {
              include: {
                transactions: {
                  where: {
                    createdAt: {
                      gte: new Date(
                        Date.now() - lastXday * 24 * 60 * 60 * 1000
                      ).toISOString(),
                    },
                  },
                },
              },
            },
          },
        }))) ||
      (await prisma.user.findUnique({
        where: { email },
        include: { budgets: { include: { transactions: true } } },
      }));

    if (!user) {
      throw new Error("Utilisateur non trouvé!");
    }

    return user.budgets;
  } catch (error) {
    console.log("Erreur lors de lister les bidget par users : " + error);
  }
};

// =========================
//Done
export const getBudgetById = async (email: string, BudgetId: string) => {
  if (!email || !BudgetId) return;
  try {
    const budget = await prisma.budget.findUnique({
      where: {
        id: BudgetId,
        user: { email },
      },
      include: { transactions: true },
    });
    if (!budget) {
      throw new Error(
        "There is no budget with id: " + BudgetId + " for the user" + email
      );
    }
    return budget;
  } catch (error) {
    console.log("erreur getting the budget" + error);
  }

  // if (!BudgetId) {
  //   return;
  // }
  // try {
  //   const budget = await prisma.budget.findUnique({
  //     where: { id: BudgetId },
  //     include: { transactions: true },
  //   });
  //   if (!budget) {
  //     throw new Error("The budget with " + BudgetId + "does not exists");
  //   }
  //   return budget;
  // } catch (error) {
  //   console.log(error);
  // }
};

//Done
export const addTransaction = async (
  email: string,
  budgetId: string,
  description: string,
  amount: number
) => {
  if (!budgetId) {
    return;
  }
  try {
    const budget = await getBudgetById(email, budgetId);
    if (!budget) {
      throw new Error("Unable find the budget ");
    }

    await prisma.transaction.create({
      data: {
        budgetId,
        description,
        amount,
        emoji: budget.emoji,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//=================================
export const deleteTranscation = async (idTransaction: string) => {
  try {
    const transaction = await prisma.transaction.delete({
      where: { id: idTransaction },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBudget = async (budgetId: string) => {
  if (!budgetId) return;
  try {
    const deleteTransactions = await prisma.transaction.deleteMany({
      where: {
        budgetId,
      },
    });
    const deleteBudget = await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    });
    //const transaction = await prisma.$transaction([deleteTransactions, deleteBudget])
  } catch (error) {
    console.log(error);
  }
};
