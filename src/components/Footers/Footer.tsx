"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChatServiceIconSvg, FileIconSvg, RocketIconSvg } from "../SvgIcons";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import { BiLogoTiktok, BiLogoWhatsapp } from "react-icons/bi";

interface footerDataProps {
	title: string;
	links: {
		label: string;
		href: string;
		function?: () => void;
	}[];
}

const Footer = () => {
	const { email } = useToken();
	const currentYear = new Date().getFullYear();
	const pathname = usePathname();
	const { data: customer } = useCustomer("");

	const wc_customer2_info: any[] = (customer as any) ?? [];
	const wc_customer_info: any | undefined = filterCustomersByEmail(
		wc_customer2_info,
		email,
	);
	const firstName = wc_customer_info?.first_name;

	const footer1socialMediaIcons = [
		{
			id: 1,
			icon: <BiLogoTiktok className='text-xl text-white' />,
			link: "",
			backgroundColor: "bg-gray-900",
		},
		{
			id: 2,
			icon: <BiLogoWhatsapp className='text-xl text-white' />,
			link: "",
			backgroundColor: "bg-whatsapp",
		},
	];

	const footerCardData = [
		{
			icon: <RocketIconSvg />,
			name: "Delivery Assistance",
			description: "Seller Online Delivery",
		},
		{
			icon: <FileIconSvg />,
			name: "Secure Purchase",
			description: "100% Secure Payment",
		},
		{
			icon: <ChatServiceIconSvg />,
			name: "Unmatched Service",
			description: "Dedicated Support",
		},
	];

	const footerData: footerDataProps[] = [
		{
			title: "Account",
			links: [
				{
					label: firstName ? "Update Account" : "Create Account",
					href: firstName ? "/user/account-details" : "/user/register",
				},
				{
					label: firstName ? "Log Out" : "Login",
					href: firstName ? "" : "/user/login",
					function: firstName ? signOut : () => {},
				},
				{
					label: firstName ? "Change Password" : "Forget Password",
					href: firstName ? "/user/change-password" : "/user/forget-password",
				},
			],
		},
		{
			title: "Information",
			links: [
				{ label: "FAQ", href: "/faq" },
				{ label: "Support", href: "/contact-us" },
			],
		},
		{
			title: "Legal",
			links: [
				{ label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
				{ label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
				{ label: "Delivery & Shipping", href: "/terms-of-use?delivery-return" },
				{ label: "Refund Policy", href: "/terms-of-use?refund-policy" },
			],
		},
	];

	return (
		<footer className='bg-white w-full border-t border-gray-100 font-poppins'>
			{/* Tier 1: Trust Features Bar */}
			<div className='w-full bg-[#F9FAFB] py-12 border-b border-gray-100'>
				<div className='max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
					{footerCardData.map((item, idx) => (
						<div key={idx} className='flex items-center gap-6 group'>
							<div className='size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110'>
								{item.icon}
							</div>
							<div>
								<h4 className='text-sm font-black text-gray-900 uppercase tracking-wider'>
									{item.name}
								</h4>
								<p className='text-xs text-gray-500 font-medium'>
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Tier 2: Main Navigation Links */}
			<div className='max-w-[1440px] mx-auto px-8 pt-20 pb-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8'>
					{/* Brand Bio Column */}
					<div className='lg:col-span-4 space-y-6'>
						<LogoImage className='!w-32 lg:!w-40' />
						<p className='text-gray-500 text-sm leading-relaxed max-w-xs'>
							The ultimate destination for premium digital hardware and
							accessories. Committed to quality, transparency, and speed.
						</p>
						<div className='flex gap-3'>
							{footer1socialMediaIcons.map((item, index) => (
								<motion.a
									href={item.link}
									key={item.id}
									whileHover={{ y: -3, scale: 1.05 }}
									className={`size-10 rounded-full ${item.backgroundColor} flex items-center justify-center transition-all shadow-sm`}
								>
									{item.icon}
								</motion.a>
							))}
						</div>
					</div>

					{/* Dynamic Link Groups */}
					<div className='lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8'>
						{footerData.map((section, index) => (
							<div key={index} className='flex flex-col gap-6'>
								<h4 className='text-gray-900 font-black text-xs uppercase tracking-[0.2em]'>
									{section.title}
								</h4>
								<ul className='flex flex-col gap-3.5'>
									{section.links.map((link, linkIndex) => (
										<li key={linkIndex}>
											<Link
												href={link.href}
												onClick={link.function}
												className={`text-gray-500 text-[13px] font-medium transition-colors hover:text-brand-blue ${
													pathname === link.href
														? "text-brand-blue font-bold"
														: ""
												}`}
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Tier 3: Bottom Copyright & Compliance */}
			<div className='bg-[#F9FAFB] py-8 border-t border-gray-100'>
				<div className='max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6'>
					<p className='text-gray-400 text-xs font-semibold tracking-wide order-2 md:order-1'>
						&copy; {currentYear} {CompanyName}. All Rights Reserved.
					</p>

					{/* Industrial Badges (Placeholder for professional feel) */}
					<div className='flex items-center gap-4 grayscale opacity-30 order-1 md:order-2'>
						<div className='h-4 w-10 bg-gray-300 rounded' />
						<div className='h-4 w-10 bg-gray-300 rounded' />
						<div className='h-4 w-10 bg-gray-300 rounded' />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
