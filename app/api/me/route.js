import { getTokenData } from "@/helpers/getUserData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDb } from "@/utils/database";

connectDb();

export async function GET(request) {
  try {
    const userEmail = await getTokenData(request);
    const user = await User.findOne({ email: userEmail }).select("-password");
    return NextResponse.json({ message: "User found", data: user });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
