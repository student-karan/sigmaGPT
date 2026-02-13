"use server";
import { revalidatePath } from "next/cache";
import { getallThreads } from "@/lib/db";

export async function refreshHome() {
    revalidatePath("/", "layout");
}

export async function getAllThreads() {
    const allthreada = await getallThreads();
    return allthreada;
}