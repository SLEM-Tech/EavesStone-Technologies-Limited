"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiShoppingBagFill } from "react-icons/ri";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";
import { FiShoppingBag, FiStar } from "react-icons/fi";

interface ProductCard2Props {
	id: string | number;
	image: string;
	oldAmount?: string;
	newAmount: string;
	description: string;
	boxShadow?: boolean;
}

const ProductCard2 = ({
	id,
	image,
	oldAmount,
	newAmount,
	description,
	boxShadow = true,
}: ProductCard2Props) => {
	const { addItem, removeItem, updateItem, getItem } = useCart();

	const ID = id.toString();
	const cartItem = getItem(ID);
	const quantity = cartItem?.quantity || 0;
	const price = parseInt(newAmount);
	const slugDesc = convertToSlug(description);

	// Calculate Discount Percentage
	const discount = oldAmount
		? Math.round(((parseInt(oldAmount) - price) / parseInt(oldAmount)) * 100)
		: 0;

	const addToCart = () => {
		addItem({ id: ID, name: description, price, quantity: 1, image });
	};

	const increase = () => updateItem(ID, { quantity: quantity + 1 });
	const decrease = () => {
		if (quantity <= 1) removeItem(ID);
		else updateItem(ID, { quantity: quantity - 1 });
	};

	return (
		<div
			className={`group relative flex flex-col !max-w-24 lg:!max-w-24 min-w-52 lg:min-w-64 rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
				boxShadow
					? "shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
					: "border border-gray-100"
			}`}
		>
			{/* 1. Image Container - Modern "Gallery" look */}
			<div className='relative p-3 overflow-hidden'>
				<Link
					href={`/home-item/product/${slugDesc}-${id}`}
					className='relative aspect-square w-full bg-[#F9FAFB] rounded-[1.5rem] overflow-hidden flex items-center justify-center group/img'
				>
					<Picture
						src={image}
						alt={description}
						className='object-contain w-[75%] h-[75%] transition-transform duration-700 ease-out group-hover/img:scale-110'
					/>

					{/* Minimalist Discount Badge */}
					{discount > 0 && (
						<div className='absolute top-4 left-4 bg-primary-100 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg'>
							{discount}% Off
						</div>
					)}
				</Link>
			</div>

			{/* 2. Content Area */}
			<div className='flex flex-col flex-grow p-6 pt-2'>
				{/* Rating & Metadata */}
				<div className='flex items-center gap-1 mb-2'>
					{[1, 2, 3, 4].map((i) => (
						<FiStar
							key={i}
							size={10}
							className='fill-amber-400 text-amber-400'
						/>
					))}
					<span className='text-[10px] font-bold text-slate-400 ml-1'>4.5</span>
				</div>

				{/* Title */}
				<Link
					href={`/home-item/product/${slugDesc}-${id}`}
					className='text-[13px] lg:text-sm font-bold text-slate-900 line-clamp-2 mb-4 leading-relaxed hover:text-primary-100 transition-colors min-h-[40px]'
					dangerouslySetInnerHTML={{ __html: description }}
				/>

				{/* 3. Footer Section (Price + Action) */}
				<div className='mt-auto flex items-center justify-between gap-2'>
					<div className='flex flex-col'>
						{oldAmount && (
							<span className='text-[10px] line-through text-slate-300 font-bold tracking-tight'>
								<FormatMoney2 value={parseInt(oldAmount)} />
							</span>
						)}
						<span className='text-slate-900 font-black text-lg tracking-tighter'>
							{price ? <FormatMoney2 value={price} /> : "N/A"}
						</span>
					</div>

					{/* Integrated Action Dock */}
					{price > 0 && (
						<div className='relative'>
							{quantity === 0 ? (
								<button
									onClick={(e) => {
										e.preventDefault();
										addToCart();
									}}
									className='flex items-center justify-center rounded-2xl bg-[#F0F2F3] size-11 text-slate-900 hover:bg-primary-100 hover:text-white transition-all duration-300 active:scale-90 group/btn'
								>
									<FiShoppingBag className='text-lg' />
									<div className='absolute -top-1 -right-1 size-3 bg-primary-100 rounded-full border-2 border-white scale-0 group-hover/btn:scale-100 transition-transform' />
								</button>
							) : (
								<div className='flex items-center gap-2 rounded-2xl bg-slate-900 p-1 shadow-xl animate-in zoom-in-90 duration-300'>
									<button
										onClick={(e) => {
											e.preventDefault();
											decrease();
										}}
										className='size-8 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90'
									>
										<AiOutlineMinus size={12} />
									</button>
									<span className='text-xs font-black text-white min-w-[20px] text-center'>
										{quantity}
									</span>
									<button
										onClick={(e) => {
											e.preventDefault();
											increase();
										}}
										className='size-8 flex items-center justify-center rounded-xl bg-primary-100 text-white hover:bg-blue-500 transition-all active:scale-90'
									>
										<AiOutlinePlus size={12} />
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Subtle bottom border accent that expands on hover */}
			<div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary-100 rounded-full group-hover:w-[40%] transition-all duration-500' />
		</div>
	);
};

export default ProductCard2;
