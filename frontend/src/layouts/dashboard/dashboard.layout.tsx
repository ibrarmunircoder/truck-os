import { useDashboardLayoutStyles } from 'layouts/dashboard/dashboard.styles';
import { useMatchMediaQuery } from "layouts/dashboard/hooks";
import { NavigationMenu } from 'layouts/dashboard/partials';
import { InnerPageHeader, PageHeader } from 'modules/common/components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode } from 'react';

export interface DashboardLayoutInterface {
	showMenus: boolean;
	stepper: boolean;
	innerPageTitle: boolean;
	title: string;
	pageTitle?: string;
	pageSubTitle?: string;
	children?: ReactNode;
	handleExit?: () => void;
	showExit?: boolean;
	showBackButton?: boolean;
	previousRoute?: string;
}

export const DashboardLayout = ({ title, children, showMenus, stepper, pageTitle, pageSubTitle, innerPageTitle, showExit, handleExit, showBackButton, previousRoute }: DashboardLayoutInterface): ReactElement => {
	const isDesktop = useMatchMediaQuery();

	const classes = useDashboardLayoutStyles({ showMenus, isDesktop });
	const router = useRouter();
	const handleBack = () => {
		if(previousRoute) {
			void router.push(previousRoute);
		} else {
			router.back();
		}
	}

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<div className={classes.root}>
				{showMenus ? <NavigationMenu /> : !showMenus && isDesktop ? <NavigationMenu />: '' }
				{!stepper && innerPageTitle ?
					<InnerPageHeader isDesktop={isDesktop} title={pageTitle} handleBack={handleBack} subtitle={pageSubTitle} handleExit={handleExit} showExit={showExit} showBackButton={showBackButton === false ? showBackButton : true} />
					: !stepper && !innerPageTitle ? <PageHeader title={title} isDesktop={isDesktop}/> : ''
				}
				<main className={classes.pageContent}>
					{children}
				</main>
			</div>
		</>
	);
};
