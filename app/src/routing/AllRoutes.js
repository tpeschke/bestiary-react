import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import EditView from "../pages/beast/pages/edit/EditView";
import View from "../pages/beast/pages/view/View";
import Catalog from "../pages/catalog/Catalog";
import ListHome from "../pages/list/ListHome";
import SearchResults from "../pages/searchResults/SearchResults";
import OwnerAuth from "./auth/OwnerAuth";
export default function AllRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Loading, { children: _jsx(Catalog, {}) }) }), _jsx(Route, { path: 'search', element: _jsx(Loading, { children: _jsx(SearchResults, {}) }) }), _jsx(Route, { path: 'search;', element: _jsx(Loading, { children: _jsx(SearchResults, {}) }) }), _jsxs(Route, { path: 'beast', children: [_jsx(Route, { index: true, element: _jsx(Loading, { children: _jsx(Catalog, {}) }) }), _jsx(Route, { path: ':beastId/edit', element: _jsx(OwnerAuth, { children: _jsx(EditView, {}) }) }), _jsx(Route, { path: ':beastId/gm', element: _jsx(Loading, { children: _jsx(View, {}) }) }), _jsx(Route, { path: ':beastId/gm/:param1', element: _jsx(Loading, { children: _jsx(View, {}) }) }), _jsx(Route, { path: ':beastId/gm/:param1/:param2', element: _jsx(Loading, { children: _jsx(View, {}) }) }), _jsx(Route, { path: ':beastId/player', element: _jsx(Loading, { children: _jsx(View, {}) }) }), _jsx(Route, { path: ':beastId', element: _jsx(Loading, { children: _jsx(View, {}) }) })] }), _jsxs(Route, { path: 'lists', children: [_jsx(Route, { path: ':listId/directlyTo', element: _jsx(Loading, { children: _jsx(ListHome, {}) }) }), _jsx(Route, { index: true, element: _jsx(Navigate, { to: '/', replace: true }) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: '/', replace: true }) })] }));
}
