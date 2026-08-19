import { prisma } from "../config/prisma.js";

export interface CreateLanguageData {
  code: string;
  name: string;
  nativeName?: string;
  flag?: string;
}

export interface UpdateLanguageData {
  code?: string;
  name?: string;
  nativeName?: string;
  flag?: string;
}

export const getAllLanguages = async () => {
  return prisma.language.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const getLanguageById = async (id: string) => {
  return prisma.language.findUnique({
    where: { id },
  });
};

export const createLanguage = async (data: CreateLanguageData) => {
  return prisma.language.create({
    data: {
      code: data.code,
      name: data.name,
      nativeName: data.nativeName,
      flag: data.flag,
    },
  });
};

export const updateLanguage = async (
  id: string,
  data: UpdateLanguageData,
) => {
  return prisma.language.update({
    where: { id },
    data,
  });
};

export const deleteLanguage = async (id: string) => {
  return prisma.language.delete({
    where: { id },
  });
};