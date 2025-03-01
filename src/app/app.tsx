import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import {
	AppProvider,
	type Navigation,
	type Session,
} from '@toolpad/core/AppProvider';
import {
	DashboardLayout,
	SidebarFooterProps,
	ThemeSwitcher,
} from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { useMemo, useState } from 'react';

import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Dashboard from 'components/Dashboard';
import GrafanaDashboardWithCharts from 'components/GrafanaDashboardWithCharts';

const NAVIGATION: Navigation = [
	{
		segment: 'dashboard',
		title: 'Bảng điều khiển',
		icon: <DashboardIcon />,
		children: [
			{
				segment: '1',
				title: 'Trải nghiệm người dùng',
				icon: <DescriptionIcon />,
			},
			{
				segment: '2',
				title: 'Hoạt động vendor',
				icon: <DescriptionIcon />,
			},
			{
				segment: '3',
				title: 'Hoạt động kinh doanh',
				icon: <DescriptionIcon />,
			},
			{
				segment: '4',
				title: 'Người dùng',
				icon: <DescriptionIcon />,
			},
			{
				segment: '5',
				title: 'Thuê bao SmartHome',
				icon: <DescriptionIcon />,
			},
		],
	},
	{
		segment: 'Other',
		title: 'Other',
		icon: <LayersIcon />,
	},
];

const demoTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: 'data-toolpad-color-scheme',
	},
	colorSchemes: { light: true, dark: true },
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
	palette: {
		primary: { main: '#ED0231' },
	},
});

function DemoPageContent({ pathName }: { pathName: string }) {
	return <Dashboard pathName={pathName} />;
}

interface DemoProps {
	/**
	 * Injected by the documentation to work in an iframe.
	 * Remove this when copying and pasting into your project.
	 */
	window?: () => Window;
}

function ToolbarActionsSearch() {
	return (
		<Stack direction="row">
			<Tooltip title="Tìm kiếm" enterDelay={1000}>
				<div>
					<IconButton
						type="button"
						aria-label="search"
						sx={{
							display: { xs: 'inline', md: 'none' },
						}}
					></IconButton>
				</div>
			</Tooltip>
			<TextField
				label="Tìm kiếm"
				variant="outlined"
				size="small"
				slotProps={{
					input: {
						endAdornment: (
							<IconButton type="button" aria-label="search" size="small">
								<SearchIcon />
							</IconButton>
						),
						sx: { pr: 0.5 },
					},
				}}
				sx={{
					display: { xs: 'none', md: 'inline-block' },
					mr: 1,
				}}
			/>
			<ThemeSwitcher />
		</Stack>
	);
}

function SidebarFooter({ mini }: SidebarFooterProps) {
	return (
		<Typography
			variant="caption"
			sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
		>
			{mini ? '© VHT' : `© ${new Date().getFullYear()} Viettel Hight Tech`}
		</Typography>
	);
}

export default function App(props: DemoProps) {
	const { window } = props;

	const [session, setSession] = useState<Session | null>({
		user: {
			name: 'Bharat Kashyap',
			email: 'bharatkashyap@viettel.com.vn',
			image: 'https://avatars.githubusercontent.com/u/19550456',
		},
	});

	const authentication = useMemo(() => {
		return {
			signIn: () => {
				setSession({
					user: {
						name: 'Bharat Kashyap',
						email: 'bharatkashyap@outlook.com',
						image: 'https://avatars.githubusercontent.com/u/19550456',
					},
				});
			},
			signOut: () => {
				setSession(null);
			},
		};
	}, []);

	const router = useDemoRouter('/dashboard');

	// Remove this const when copying and pasting into your project.
	const demoWindow = window !== undefined ? window() : undefined;

	return (
		// preview-start
		<AppProvider
			navigation={NAVIGATION}
			router={router}
			theme={demoTheme}
			window={demoWindow}
			branding={{
				logo: (
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Logo_of_Viettel_High-Tech.svg"
						alt="VHT logo"
					/>
				),
				title: '',
				homeUrl: '/dashboard',
			}}
			session={session}
			authentication={authentication}
			notifications={[]}
		>
			<DashboardLayout
				slots={{
					toolbarActions: ToolbarActionsSearch,
					sidebarFooter: SidebarFooter,
				}}
			>
				<DemoPageContent pathName={router.pathname} />
			</DashboardLayout>
		</AppProvider>
		// preview-end
	);
}
