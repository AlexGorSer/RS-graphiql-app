import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import { Suspense } from 'react';
import Loader from 'src/components/Loader/Loader';
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';
import BurgerMenu from 'src/components/BurgerMenu/BurgerMenu';
import FallBackUIComponent from 'src/components/ErrorBoundary/FallBackUIComponent/FallBackUIComponent';

function Layout(): JSX.Element {
  return (
    <>
      <div className="burgerMenu hidden sm:block">
        <BurgerMenu />
      </div>
      <Header />
      <ErrorBoundary fallBackUIComponent={<FallBackUIComponent />}>
        <main className="wrapper pl-[2%] pr-[2%] w-full mb-[13px] dark:bg-base_dark min-h-[79vh]">
          <Suspense
            fallback={
              <div className="m-auto w-fit mt-[30vh]">
                <Loader />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Layout;
