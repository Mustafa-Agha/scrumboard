import { FC, useEffect, Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';

// Routes
import routes from 'routes';
import authRoutes from 'routes/auth';
import AuthMiddleWare from 'routes/middlewares/AuthMiddleware';

// Layouts
import MainLayout from 'layouts/MainLayout';

// Components
import Loader from 'components/Loader';

// Store
import { StoreContext, useStore } from 'contexts';
import { store } from 'hooks/stores';

// Hooks && Languages
import AppLocale from 'lang';
import useBodyClass from 'hooks/useBodyClass';

const themes = { dark: '/assets/css/dark.css', light: '/assets/css/light.css' };

const App: FC = () => {
  const { mainStore } = useStore();
  const { theme } = mainStore;
  const currentAppLocale = AppLocale['en'];
  const direction = 'ltr';

  useBodyClass([direction, theme]);

  useEffect(() => {
    let preloader = document.getElementById('preloader');

    setTimeout(() => {
      let fadeEffect = setInterval(() => {
        if (preloader && !preloader.style.opacity) {
          preloader.style.opacity = '1';
        }

        if (preloader && parseFloat(preloader.style.opacity) > 0) {
          preloader.style.opacity = (
            parseFloat(preloader.style.opacity) - 0.1
          ).toString();
        } else if (preloader) {
          clearInterval(fadeEffect);
          preloader.style.display = 'none';
        }
      }, 50);
    }, 1000);
  }, []);

  return (
    <>
      <Loader />
      <StoreContext.Provider value={store}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={theme}
          insertionPoint="styles-insertion-point">
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <ConfigProvider
              locale={currentAppLocale.antd}
              direction={direction}>
              <BrowserRouter>
                <Suspense fallback={<Loader />}>
                  <Switch>
                    <Route exact path="/">
                      <Redirect to="/auth/login" />
                    </Route>

                    {authRoutes.map(({ path, component }, i) => (
                      <Route key={i} path={path} component={component} exact />
                    ))}

                    {routes.map(({ path, component, authenticated }, i) => (
                      <MainLayout key={i}>
                        {authenticated ? (
                          <AuthMiddleWare>
                            <Route path={path} component={component} exact />
                          </AuthMiddleWare>
                        ) : (
                          <Route path={path} component={component} exact />
                        )}
                      </MainLayout>
                    ))}
                  </Switch>
                </Suspense>
              </BrowserRouter>
            </ConfigProvider>
          </IntlProvider>
        </ThemeSwitcherProvider>
      </StoreContext.Provider>
    </>
  );
};

export default observer(App);
