"use client";
import { CompanyName } from "@constants";
import { FiChevronDown } from "@node_modules/react-icons/fi";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons1 from "react-icons/sl";

interface FaqAccordionItemProps {
	id?: number;
	title: string;
	description: string;
}

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
	title,
	description,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleAccordionToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div
			className={`group w-full rounded-[1.5rem] transition-all duration-500 font-poppins mb-4 border ${
				isExpanded
					? "bg-white border-primary-100/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
					: "bg-slate-50 border-transparent hover:border-slate-200"
			}`}
		>
			{/* Header Trigger */}
			<button
				className='w-full flex justify-between items-center py-6 px-6 sm:px-10 outline-none'
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<span
					className={`text-left text-sm sm:text-base font-bold transition-colors duration-300 ${
						isExpanded ? "text-primary-100" : "text-slate-900"
					}`}
				>
					{title}
				</span>

				<div
					className={`transition-all duration-500 flex items-center justify-center size-8 rounded-full ${
						isExpanded
							? "bg-primary-100 text-white rotate-180"
							: "bg-slate-200 text-slate-500 group-hover:bg-slate-300"
					}`}
				>
					<FiChevronDown className='text-lg' />
				</div>
			</button>

			{/* Animated Content */}
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						key='content'
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
						className='overflow-hidden'
					>
						<div className='px-6 sm:px-10 pb-8'>
							<div className='h-px w-full bg-slate-100 mb-6' />
							<p className='text-sm sm:text-base text-slate-500 leading-relaxed font-medium'>
								{description}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const faqItems: FaqAccordionItemProps[] = [
	{
		id: 1,
		title: `How does the ${CompanyName} importation process work?`,
		description:
			"We operate a seamless two-phase system: First, you pay for the cost of the goods to initiate procurement in China/Overseas. Once your cargo arrives in Nigeria, a second invoice is generated for shipping and customs clearing fees.",
	},
	{
		id: 2,
		title: "How long does it take to receive my imported items?",
		description:
			"Procurement typically takes 24-48 hours. International air freight usually arrives within 7 to 14 business days, while sea freight takes 45 to 60 days. You can track every milestone via your 'Logistics Journey' dashboard.",
	},
	{
		id: 3,
		title: "What is the required initial deposit for procurement?",
		description:
			"Our flexible payment plan requires a down payment of 20% to 40% of the goods' value. For items below ₦200,000, a 40% deposit is required. For premium items valued at ₦500,000 and above, we offer a reduced commitment of 20-30%.",
	},
	{
		id: 4,
		title: "Do you handle nationwide delivery within Nigeria?",
		description:
			"Yes, we provide secure nationwide delivery. Once your shipping and clearing fees are settled at our Lagos warehouse, we can dispatch your items to any state via our trusted local logistics partners.",
	},

	{
		id: 5,
		title: "How do I verify my manual bank transfer?",
		description: `After making a transfer to the ${CompanyName} corporate account, simply upload your transaction receipt and Session ID/Reference via the 'Verify Payment' button on your order page for instant admin reconciliation.`,
	},

	{
		id: 6,
		title: "When exactly are my goods released for pickup or delivery?",
		description:
			"Goods are released immediately after the final balance of the goods and the total cost of shipping/clearing have been verified by our accounts department.",
	},
	{
		id: 7,
		title: "Are my imports covered by a warranty?",
		description: `Yes. All electronic and mechanical products procured through ${CompanyName} carry a standard manufacturer’s warranty, which we help you facilitate in the event of a technical issue.`,
	},
	{
		id: 8,
		title: "Is there a benefit to paying off my balance early?",
		description: `Yes, ${CompanyName} rewards financial discipline. Customers who complete their payments ahead of schedule may be eligible for discounts on future shipping fees or interest-free credit extensions.`,
	},
	{
		id: 9,
		title: "How do I get help if my shipment is delayed?",
		description:
			"Our support team is available 24/7. You can use the 'Support Hub' link on your invoice or contact your designated account officer directly for real-time updates on customs or weather-related delays.",
	},
];

const FaqAccordion: React.FC = () => {
	return (
		<section className='min-h-screen px-2 xs:px-8 sm:px-16 md:px-32 pt-6 sm:pt-8 pb-6 sm:pb-8 xl:pb-0 xl:pt-10 overflow-hidden'>
			<div className='grid gap-6 mb-12 lg:px-16'>
				{faqItems.map((item) => (
					<FaqAccordionItem
						key={item.id}
						title={item.title}
						description={item.description}
					/>
				))}
			</div>
		</section>
	);
};

export default FaqAccordion;
