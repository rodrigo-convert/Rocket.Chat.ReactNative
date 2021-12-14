import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { TNavigationOptions } from './definitions/navigationTypes';

interface IThemeContextProps {
	theme: string;
	themePreferences?: {
		currentTheme: 'automatic' | 'light';
		darkLevel: string;
	};
	setTheme?: (newTheme?: {}) => void;
}

export const ThemeContext = React.createContext<IThemeContextProps>({ theme: 'light' });

export function withTheme<T extends object>(Component: React.ComponentType<T> & TNavigationOptions): typeof Component {
	const ThemedComponent = (props: T) => (
		<ThemeContext.Consumer>{contexts => <Component {...props} {...contexts} />}</ThemeContext.Consumer>
	);
	ThemedComponent.navigationOptions = Component.navigationOptions;
	hoistNonReactStatics(ThemedComponent, Component);
	return ThemedComponent;
}

export const useTheme = (): IThemeContextProps => React.useContext(ThemeContext);
