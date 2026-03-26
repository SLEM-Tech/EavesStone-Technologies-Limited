"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
	FiArrowRight,
	FiArrowLeft,
	FiTruck,
	FiShield,
	FiClock,
	FiTag,
} from "react-icons/fi";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import HeroCarousel from "../Cards/HeroCarousel";

const AllCategorySection = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const router = useRouter();

	// State to hold products by category
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories ?? [];
	const TotalCatgory = Categories?.length - 1;

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			try {
				setIsLoading(true);

				const filteredCategories = categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5);

				if (filteredCategories) {
					const productsPromises = filteredCategories.map(
						async (category: CategoryType) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}`,
							);

							// Check if there is at least one product in the category
							const firstProductImage =
								response?.data.length > 0
									? response?.data[0]?.images[0]?.src
									: null;

							return {
								categoryId: category?.id,
								firstProductImage: firstProductImage, // Store the first product's image
							};
						},
					);

					const productsResults = await Promise.all(productsPromises);

					// Update the state with the first product images mapped by category
					const productsMap = productsResults.reduce(
						(acc: any, result: any) => ({
							...acc,
							[result.categoryId]: result.firstProductImage,
						}),
						{},
					);

					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
			);
		}
	};

	const handlePrev = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);
			// console.log(scrollLeft);
			if (scrollLeft > 0) {
				sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
				setCurrentIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex,
				);
			}
		}
	};

	return (
		<>
			{/* Hero Concept inspired by the image */}
			<section className='relative w-full bg-white font-poppins pt-24 lg:pt-32 pb-10 overflow-hidden'>
				<div className='max-w-[1440px] mx-auto px-6 lg:px-12 relative'>
					{/* 1. Main Hero Card */}
					<div className='bg-gray-100 rounded-bl-md rounded-br-md rounded-tl-[20px] rounded-tr-[20px] min-h-[500px] lg:min-h-[550px] flex flex-col lg:flex-row items-center relative overflow-hidden px-8 lg:px-20 py-12 lg:py-0'>
						{/* Decorative Large Circle Background */}
						<div className='absolute -right-20 -top-20 size-[400px] lg:size-[600px] bg-white/40 rounded-full blur-3xl pointer-events-none' />
						<div className='absolute right-0 top-1/2 -translate-y-1/2 size-[200px] lg:size-[450px] bg-white rounded-full hidden lg:block' />

						{/* Text Content */}
						<div className='w-full lg:w-1/2 z-10 space-y-6 text-center lg:text-left'>
							<motion.p
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className='text-[12px] lg:text-sm font-medium uppercase tracking-[0.3em] text-price'
							>
								Welcome to Quality
							</motion.p>

							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className='text-4xl lg:text-6xl font-bold text-price leading-[1.1] tracking-tight'
							>
								Best Accessories <br className='hidden lg:block' />
								For Your Computer.
							</motion.h1>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className='pt-4'
							>
								<Link
									href='/category'
									className='inline-flex items-center gap-3 bg-primary-100 hover:bg-primary-200 text-white px-8 py-4 rounded-lg font-bold transition-all hover:gap-5 group'
								>
									Shop Now
									<FiArrowRight size={20} />
								</Link>
							</motion.div>
						</div>

						{/* Image Section */}
						<div className='w-full lg:w-1/2 relative mt-12 lg:mt-0 flex justify-center lg:justify-end z-10'>
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8 }}
								className='relative w-full max-w-[500px] aspect-square'
							>
								<Picture
									src={heroBg}
									alt='Premium PC Hardware'
									className='w-full h-full object-contain drop-shadow-2xl'
								/>
							</motion.div>
						</div>
					</div>
				</div>

				{/* 4. Bottom Feature Bar */}
				<div className='max-w-[1256px] mx-auto mt-12 px-6'>
					<div className='bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100'>
						{[
							{
								icon: <FiTag />,
								title: "Discount",
								sub: "Every week new sales",
							},
							{
								icon: <FiTruck />,
								title: "Free Delivery",
								sub: "100% Free for all orders",
							},
							{
								icon: <FiClock />,
								title: "Great Support 24/7",
								sub: "We care your experiences",
							},
							{
								icon: <FiShield />,
								title: "Secure Payment",
								sub: "100% Secure Payment Method",
							},
						].map((item, i) => (
							<div key={i} className='flex items-center gap-4 p-8'>
								<div className='text-3xl text-gray-800'>{item.icon}</div>
								<div>
									<h4 className='text-sm font-bold text-price'>{item.title}</h4>
									<p className='text-xs text-gray-400 font-medium'>
										{item.sub}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* Category Section Styling Idea */}
			<div className='grid grid-cols-2 lg:grid-cols-5 mx-auto max-w-[1256px] mt-4 gap-6 p-2 lg:p-0'>
				{Categories?.slice(0, 5).map((cat: any, index: number) => {
					const productImage: any = categoryProductsMap[cat?.id];
					return (
						<motion.div
							key={cat.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<Link
								href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
								className='group relative flex flex-col h-[220px] bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-primary-100/20 transition-all duration-500'
							>
								{/* Content Area */}
								<div className='p-8 pb-0 flex flex-col h-full relative z-10'>
									<h3 className='text-lg font-black text-slate-900 uppercase leading-tight mb-1 group-hover:text-primary-100 transition-colors'>
										{cat.name}
									</h3>
									<span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
										Shop Now
									</span>

									{/* Floating Image Container */}
									<div className='mt-auto relative w-full h-[55%] flex items-center justify-center transform group-hover:-translate-y-4 transition-transform duration-700'>
										{/* Dynamic Shadow behind product */}
										<div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/5 rounded-full blur-xl group-hover:scale-110 transition-all duration-700' />

										<Picture
											src={cat.image?.src ?? productImage}
											alt={cat.name}
											className='w-full h-full aspect-auto drop-shadow-2xl'
										/>
									</div>
								</div>

								{/* Bottom Accent Line */}
								<div className='absolute bottom-0 left-0 w-0 h-1.5 bg-primary-100 group-hover:w-full transition-all duration-500' />
							</Link>
						</motion.div>
					);
				})}
			</div>

			{/* </Carousel> */}
		</>
	);
};

export default AllCategorySection;
