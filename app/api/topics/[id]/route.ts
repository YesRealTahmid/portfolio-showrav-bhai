import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();

    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { title, description });

    return NextResponse.json({ message: "Topic edited" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
    const { id } = await params;
    await connectMongoDB();
    const topic = await Topic.findOne({ _id: id });

    return NextResponse.json({ topic }, { status: 200 });
}
