import type { Metadata } from "next";
import AdminProvider from "./_components/AdminProvider";
import { CompanyShortName } from "@constants";

export const metadata: Metadata = {
	title: {
		template: `%s | ${CompanyShortName} Admin`,
		default: `${CompanyShortName} Admin`,
	},
	robots: { index: false, follow: false },
};

export default function AdminRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AdminProvider>{children}</AdminProvider>;
}
