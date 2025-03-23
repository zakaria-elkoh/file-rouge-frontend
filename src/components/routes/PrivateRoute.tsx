import { layoutNames } from "../../common/constansts";
import Layout from "../../components/layout/Layout";
import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { loadUser } from "../../store/auth/authActions";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getCurrentUser } from "../../store/selectors/appSelectors";

import { NotificationsContextProvider } from "../../modules/notifications/context/notificationsContext";
import LoadUserLoadingScreen from "./LoadUserLoadingScreen";

type PrivateRouteProps = {
  element: React.ReactNode;
  layout?: layoutNames;
  adminOnly?: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  layout = layoutNames.authenticated,
  adminOnly = false,
}) => {
  const { isLoggedIn, loadUserLoading } = useAppSelector(
    (state: RootState) => state.auth
  );
  const currentUser = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(loadUser());
    }
  }, [dispatch, isLoggedIn]);

  if (loadUserLoading && !isLoggedIn) return <LoadUserLoadingScreen />;

  if (!isLoggedIn && !loadUserLoading) return <Navigate to="/home" />;
  
  // If admin only route but user is not admin, redirect to home
  if (adminOnly && !currentUser?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <NotificationsContextProvider>
      <Layout layout={layout}>{element}</Layout>
    </NotificationsContextProvider>
  );
};

export default PrivateRoute;
