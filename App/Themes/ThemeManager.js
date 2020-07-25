import React, { createContext, useState, useEffect, Component, useContext } from 'react'
import { StatusBar } from 'react-native'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
import Colors, { lightTheme, darkTheme } from './Colors'


export const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext);

class ManageThemeProvider extends Component {

    constructor(props) {
        super(props);

        let defaultMode = Appearance.getColorScheme();

        this.getColorFunction = (mode) => {
            let theme = mode == "dark" ? darkTheme : lightTheme;
            return (
                colorName => theme[colorName]
            )
        }

        this.state = {
            getColor: this.getColorFunction(defaultMode),
            mode: defaultMode
        }

        this.subscription

    }

    componentDidMount() {
        this.subscription = Appearance.addChangeListener(({ colorScheme }) => {
            this.setTheme(colorScheme)
        })
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    getColorFunction = (mode) => {
        let theme = mode == "dark" ? darkTheme : lightTheme;
        return (
            colorName => theme[colorName]
        )
    }

    setTheme = (mode) => {
        this.setState({
            mode,
            getColor: this.getColorFunction(mode),
        })
    }

    render() {
        return (
            <ThemeContext.Provider value={{ color: this.state.getColor, setTheme: this.setTheme, mode: this.state.mode }}>
                <>
                    <StatusBar
                        barStyle={this.state.mode === 'dark' ? 'light-content' : 'dark-content'}
                    />
                    {this.props.children}
                </>
            </ThemeContext.Provider>
        )
    }
}

const ThemeManager = ({ children }) => (
    <AppearanceProvider>
        <ManageThemeProvider>{children}</ManageThemeProvider>
    </AppearanceProvider>
)

export function themed(Component) {
    class Consumer extends React.Component {
      render() {
        const {forwardedRef, ...rest} = this.props;
  
        return (
        <ThemeContext.Consumer>
            {state => {
                return <Component theme={state} ref={forwardedRef} {...rest}/>
            }}
        </ThemeContext.Consumer>)
      }
    }
  
    return React.forwardRef((props, ref) => {
      return <Consumer {...props} forwardedRef={ref} />;
    });
  }


export default ThemeManager