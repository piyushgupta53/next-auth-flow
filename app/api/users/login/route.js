import { connectDb } from "@/utils/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // check if user exists
    console.log("Username: ", username);
    const userExists = await User.findOne({ username });

    if (!userExists) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    // compare password
    const validPassword = await bcryptjs.compare(password, userExists.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: userExists._id,
      email: userExists.email,
      username: userExists.email,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
