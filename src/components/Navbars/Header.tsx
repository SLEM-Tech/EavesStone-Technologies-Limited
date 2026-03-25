"use client";
import React, { useMemo, useState, useTransition, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import { currencyOptions, filterCustomersByEmail } from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
	FiSearch,
	FiUser,
	FiLogOut,
	FiMenu,
	FiShoppingCart,
	FiShoppingBag,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import HomePageBottomHeader from "./HomePageBottomHeader";
import { FaCartArrowDown } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { email } = useToken();
	const { totalItems } = useCart();

	const { baseCurrency } = useAppSelector((state) => state.currency);
	const [isPending, startTransition] = useTransition();

	const [isCartOpen, setIsCartOpen] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const { data: customer } = useCustomer("");
	const wc_customer_info = useMemo(
		() => filterCustomersByEmail(customer as any[], email),
		[customer, email],
	);

	const onOpenCart = () => setIsCartOpen(true);
	const onCloseCart = () => setIsCartOpen(false);

	const handleCurrencyChange = async (code: string) => {
		const selectedObj = currencyOptions.find((c) => c.code === code);
		if (!selectedObj) return;
		try {
			const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
			if (data) {
				dispatch(setExchangeRate(data));
				dispatch(setBaseCurrency(selectedObj));
				FormToast({ message: `Switched to ${code}`, success: true });
			}
		} catch (error) {
			FormToast({ message: "Currency switch failed", success: false });
		}
	};

	const handleSearch = () => {
		if (!searchValue) return;
		startTransition(() => {
			router.push(`/search?q=${searchValue}`);
		});
	};

	const userDropDownLinks = [
		{ id: 1, href: "/user/dashboard", icon: <BiUser />, label: "My Account" },
		{
			id: 2,
			href: "/user/my-orders",
			icon: <FaCartArrowDown />,
			label: "Orders",
		},
	];

	return (
		<>
			<header className='flex flex-col w-full bg-white z-[100] fixed top-0 border-b border-gray-100 shadow-sm transition-all font-poppins'>
				{/* Desktop Header */}
				<div className='hidden slg:grid grid-cols-12 items-center w-full py-4 max-w-[1440px] px-8 mx-auto'>
					{/* 1. Logo */}
					<div className='col-span-3 flex items-center'>
						{/* Removed brightness-200 to keep logo natural on white bg */}
						<LogoImage className='cursor-pointer !w-40 lg:!w-48' />
					</div>

					{/* 2. Search Bar - Matching reference image color and style */}
					<div className='col-span-5 px-4'>
						<div className='relative w-full max-w-[500px] group mx-auto'>
							<FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue size-5' />
							<input
								type='text'
								placeholder='Search essentials, groceries and more...'
								className='w-full h-11 text-sm text-gray-900 rounded-lg pl-12 pr-5 border border-transparent outline-none bg-gray-50 focus:bg-white focus:border-brand-blue/20 transition-all'
								onChange={(e) => setSearchValue(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>
					</div>

					{/* 3. Controls (Currency, User, Cart) */}
					<div className='col-span-4 flex items-center justify-end gap-5'>
						{/* Currency Toggle */}
						<Menu as='div' className='relative inline-block text-left'>
							<Menu.Button className='flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition outline-none'>
								<Flag
									code={baseCurrency?.countryCode || "NG"}
									className='w-4 rounded-sm shadow-sm'
								/>
								<span className='text-xs font-bold text-gray-700 uppercase'>
									{baseCurrency.code}
								</span>
								<SlArrowDown className='text-[8px] text-gray-400' />
							</Menu.Button>
							<Transition
								as={Fragment}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'
							>
								<Menu.Items className='absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl p-1 z-[110] outline-none'>
									{currencyOptions.map((c) => (
										<Menu.Item key={c.code}>
											{({ active }) => (
												<button
													onClick={() => handleCurrencyChange(c.code)}
													className={`${active ? "bg-gray-50 text-brand-blue" : "text-gray-600"} flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors`}
												>
													<Flag code={c.countryCode} className='w-4' />
													{c.code}
												</button>
											)}
										</Menu.Item>
									))}
								</Menu.Items>
							</Transition>
						</Menu>

						{/* Login / User Section */}
						<div className='flex items-center gap-4'>
							<Menu as='div' className='relative inline-block text-left'>
								<Menu.Button className='flex items-center gap-2 group outline-none'>
									<div className='flex items-center gap-2 text-gray-700 group-hover:text-brand-blue transition'>
										<FiUser className='size-5 text-brand-blue' />
										<span className='text-sm font-semibold whitespace-nowrap'>
											{wc_customer_info?.first_name || "Login"}
										</span>
									</div>
								</Menu.Button>

								{email && (
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-[110] outline-none'>
											<div className='flex flex-col gap-0.5'>
												{userDropDownLinks.map((item) => (
													<Menu.Item key={item.id}>
														{({ active }) => (
															<button
																onClick={() => router.push(item.href!)}
																className={`${active ? "bg-gray-50 text-brand-blue" : "text-gray-600"} flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors`}
															>
																{item.icon} {item.label}
															</button>
														)}
													</Menu.Item>
												))}
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => signOut()}
															className={`${active ? "bg-red-50 text-red-600" : "text-red-500"} flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors border-t border-gray-50 mt-1`}
														>
															<FiLogOut /> Log Out
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								)}
							</Menu>

							{/* Vertical Separator from reference image */}
							<div className='h-5 w-[1.5px] bg-gray-200' />

							{/* Cart Section */}
							<div
								className='relative flex items-center gap-2 cursor-pointer group text-gray-700 hover:text-brand-blue transition'
								onClick={onOpenCart}
							>
								<div className='relative'>
									<FiShoppingCart className='text-xl text-brand-blue transition' />
									{totalItems > 0 && (
										<span className='absolute -top-2.5 -right-2.5 size-5 bg-brand-blue text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm'>
											{totalItems}
										</span>
									)}
								</div>
								<span className='text-sm font-semibold'>Cart</span>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile Header */}
				<div className='slg:hidden flex flex-col w-full p-4 gap-3 bg-white border-b border-gray-100'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<FiMenu
								className='text-2xl text-gray-700'
								onClick={() => setDrawerVisible(true)}
							/>
							<LogoImage className='cursor-pointer !w-40 lg:!w-48' />
						</div>
						<div onClick={onOpenCart} className='relative'>
							<FiShoppingBag className='text-2xl text-brand-blue' />
							{totalItems > 0 && (
								<span className='absolute -top-2 -right-2 size-4 bg-brand-blue rounded-full text-[9px] flex items-center justify-center text-white'>
									{totalItems}
								</span>
							)}
						</div>
					</div>
					<div className='relative h-10'>
						<input
							type='text'
							placeholder='Search essentials...'
							className='w-full h-full text-sm bg-gray-50 rounded-lg px-4 border border-gray-100 outline-none focus:border-brand-blue/30'
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleSearch()}
						/>
						{isPending ? (
							<ImSpinner2 className='absolute right-3 top-1/4 text-brand-blue animate-spin' />
						) : (
							<FiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-brand-blue' />
						)}
					</div>
				</div>

				{/* Conditional Bottom Headers */}
				{pathname.includes("/category") ? (
					<CategoryPageBottomHeader />
				) : pathname.includes("/home-item") ? (
					<ProductPageBottomHeader />
				) : (
					<HomePageBottomHeader />
				)}
			</header>

			<Drawer
				open={isCartOpen}
				onClose={onCloseCart}
				placement='right'
				width={
					typeof window !== "undefined" && window.innerWidth > 768
						? 500
						: "100%"
				}
			>
				<ProductTable onClose={onCloseCart} />
			</Drawer>

			<GlobalLoader isPending={isPending} />
			<MobileNav
				closeDrawer={() => setDrawerVisible(false)}
				drawerVisible={drawerVisible}
			/>
		</>
	);
};

export default Header;
