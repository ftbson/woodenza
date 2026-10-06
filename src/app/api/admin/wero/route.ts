import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { weroSettings } from "@/lib/schema";

async function isAdmin() {
  return (
    (await cookies()).get("admin_token")?.value ===
    "authenticated_admin_holz_session"
  );
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const [settings] = await db.select().from(weroSettings).limit(1);
    return NextResponse.json(
      settings ?? {
        recipientName: "",
        phoneNumber: "",
        enabled: false,
      },
    );
  } catch (error) {
    console.error("Erreur de chargement du paramétrage Wero :", error);
    return NextResponse.json(
      { error: "Impossible de charger le paramétrage Wero." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const recipientName =
      typeof body.recipientName === "string" ? body.recipientName.trim() : "";
    const phoneNumber =
      typeof body.phoneNumber === "string" ? body.phoneNumber.trim() : "";
    const enabled = body.enabled === true;

    if (
      recipientName.length > 120 ||
      phoneNumber.length > 40 ||
      (enabled && (!recipientName || !phoneNumber))
    ) {
      return NextResponse.json(
        { error: "Le nom et le numéro Wero sont requis pour activer Wero." },
        { status: 400 },
      );
    }

    const values = {
      id: "default",
      recipientName,
      phoneNumber,
      enabled,
      updatedAt: new Date().toISOString(),
    };
    const [existing] = await db
      .select({ id: weroSettings.id })
      .from(weroSettings)
      .limit(1);

    if (existing) {
      await db.update(weroSettings).set(values);
    } else {
      await db.insert(weroSettings).values(values);
    }

    return NextResponse.json({ success: true, ...values });
  } catch (error) {
    console.error("Erreur d'enregistrement du paramétrage Wero :", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer le paramétrage Wero." },
      { status: 500 },
    );
  }
}
