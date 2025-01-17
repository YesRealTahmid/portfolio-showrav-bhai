import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { title, description, date, image, category } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, description, date, image, category });
    return NextResponse.json({ message: "Successfully created a topic" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find({});
    return NextResponse.json({ topics });
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic Deleted" });
}
