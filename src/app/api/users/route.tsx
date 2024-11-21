import User from "../../../model/userModel";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "../../../lib/connectDb";
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const users = await User.find({});
    return NextResponse.json({ isSuccessful: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { isSuccessful: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to the database...");
    await connectDb();
    console.log("Database connected");

    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { isSuccessful: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { isSuccessful: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const { password: _, ...userData } = newUser.toObject();

    return NextResponse.json(
      { isSuccessful: true, data: userData },
      { status: 201 }
    );
  } catch (error:any) {
    console.error("Error saving user:", error.message);
    return NextResponse.json(
      { isSuccessful: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


