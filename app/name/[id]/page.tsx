import { namesData } from "@/lib/data";
import { NameDetailsClient } from "@/components/name-details-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const name = namesData.find((n) => n.id.toString() === id);
    if (!name) return {};

    return {
        title: `${name.bangla} Meaning | 99 Names of Allah`,
        description: `Learn the meaning and Fazilat of ${name.bangla}, one of the 99 beautiful names of Allah.`,
    };
}

// Ensure static generation for all 99 names
export function generateStaticParams() {
    return namesData.map((name) => ({
        id: name.id.toString(),
    }));
}

export default async function NamePage({ params }: Props) {
    const { id } = await params;
    const nameId = parseInt(id);
    const name = namesData.find((n) => n.id === nameId);

    if (!name) return notFound();

    return <NameDetailsClient name={name} />;
}
