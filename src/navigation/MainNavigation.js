import React, { useEffect, useState } from 'react';
import TabNavigation from './TabNavigation';
import LoginNavigation from './LoginNavigation';
import SplashScreen from '../screens/SplashScreen';
import { useSelector } from 'react-redux';

const MainNavigation = () => {
  const ip = useSelector((state) => state.auth.ip);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(!showSplash);
    }, 3000);
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        ip !== '' ? <TabNavigation /> : <LoginNavigation />
      )}
    </>
  );
}
export default MainNavigation;
