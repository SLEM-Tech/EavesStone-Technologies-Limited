"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiTool, FiShield, FiCpu, FiArrowRight } from "react-icons/fi";
import Picture from "@src/components/picture/Picture";

const MachineMaintenance = () => {
	// Unsplash: Professional Macro Hardware Shot
	const unsplashHardware =
		"https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1974&auto=format&fit=crop";

	return (
		<section className='w-full py-20 lg:py-20 bg-[#F8F9FA] font-poppins overflow-hidden'>
			<div className='max-w-[1440px] mx-auto px-6 lg:px-12 relative'>
				{/* 1. Large Visual Foundation */}
				<div className='grid grid-cols-1 lg:grid-cols-12 items-center'>
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className='lg:col-span-8 lg:order-2 relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group'
					>
						<Picture
							src={unsplashHardware}
							alt='High precision hardware maintenance'
							className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110'
						/>
						{/* Blue gradient overlay for depth */}
						<div className='absolute inset-0 bg-gradient-to-l from-primary-100/20 to-transparent pointer-events-none' />
					</motion.div>

					{/* 2. Overlapping Content Card */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='lg:col-span-5 lg:order-1 lg:-mr-32 z-10 mt-[-80px] lg:mt-0'
					>
						<div className='bg-white p-8 md:p-14 lg:p-16 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-slate-100'>
							<div className='space-y-8'>
								<div className='space-y-4'>
									<div className='inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full'>
										<span className='size-2 bg-primary-100 rounded-full animate-pulse' />
										<span className='text-[10px] font-black uppercase tracking-widest text-primary-100'>
											System Care
										</span>
									</div>

									<h2 className='text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight'>
										Advanced Care <br />
										<span className='text-slate-400'>for your gear.</span>
									</h2>

									<p className='text-slate-500 text-base md:text-lg leading-relaxed font-medium'>
										Specialized maintenance for power supplies, high-performance
										peripherals, and internal precision components. We ensure
										your digital uptime.
									</p>
								</div>

								{/* Industrial Benefit Indicators */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									{[
										{ icon: <FiCpu />, text: "Chipset Diagnostics" },
										{ icon: <FiShield />, text: "Warranty Secure" },
									].map((item, i) => (
										<div
											key={i}
											className='flex items-center gap-3 text-xs font-bold text-slate-700 uppercase tracking-wider'
										>
											<div className='size-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary-100 border border-slate-100'>
												{item.icon}
											</div>
											{item.text}
										</div>
									))}
								</div>

								<div className='pt-4 flex flex-col sm:flex-row gap-4'>
									<Link
										href='/contact-us'
										className='group inline-flex items-center justify-center gap-3 bg-primary-100 text-white text-sm font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-primary-100/20 active:scale-95'
									>
										Contact Specialist
										<FiArrowRight className='transition-transform group-hover:translate-x-2' />
									</Link>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* 3. Aesthetic Background Detail */}
				<div className='absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 size-96 bg-primary-100/5 rounded-full blur-[120px] -z-10' />
			</div>
		</section>
	);
};

export default MachineMaintenance;
