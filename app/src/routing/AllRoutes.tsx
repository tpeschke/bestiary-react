import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import EditView from "../pages/beast/pages/edit/EditView";
import View from "../pages/beast/pages/view/View";
import Catalog from "../pages/catalog/Catalog";
import ListHome from "../pages/list/ListHome";
import SearchResults from "../pages/searchResults/SearchResults";
import OwnerAuth from "./auth/OwnerAuth";
import ConfrontationsEncounterDesign from "../pages/encounterDesign/pages/confrontations/ConfrontationsEncounterDesign";
import CombatsEncounterDesign from "../pages/encounterDesign/pages/combats/CombatsEncounterDesign";
import ChallengesEncounterDesign from "../pages/encounterDesign/pages/challenges/ChallengesEncounterDesign";
import TreasurePage from "../pages/treasure/TreasurePage";

export default function AllRoutes() {
    return (
        <Routes>
            <Route index element={
                <Loading>
                    <Catalog />
                </Loading>
            } />
            <Route path='search' element={
                <Loading>
                    <SearchResults />
                </Loading>
            } />
            <Route path='search;' element={
                <Loading>
                    <SearchResults />
                </Loading>
            } />
            <Route path='beast'>
                <Route index element={
                    <Loading>
                        <Catalog />
                    </Loading>
                } />
                <Route path=':beastId/edit' element={
                    <OwnerAuth>
                        <EditView />
                    </OwnerAuth>
                } />
                <Route path=':beastId/gm' element={
                    <Loading>
                        <View />
                    </Loading>
                } />
                <Route path=':beastId/gm/:param1' element={
                    <Loading>
                        <View />
                    </Loading>
                } />
                <Route path=':beastId/gm/:param1/:param2' element={
                    <Loading>
                        <View />
                    </Loading>
                } />
                <Route path=':beastId/player' element={
                    <Loading>
                        <View />
                    </Loading>
                } />
                <Route path=':beastId' element={
                    <Loading>
                        <View />
                    </Loading>
                } />
            </Route>
            <Route path='encounters'>
                <Route path='confrontations' element={
                    <ConfrontationsEncounterDesign />
                } />
                <Route path='combats' element={
                    <CombatsEncounterDesign />
                } />
                <Route path='challenges' element={
                    <ChallengesEncounterDesign />
                } />
                <Route index element={<Navigate to='/' replace />} />
            </Route>
            <Route path='treasure' element={
                <TreasurePage />
            } />
            <Route path='lists'>
                <Route path=':listId/directlyTo' element={
                    <Loading>
                        <ListHome />
                    </Loading>
                } />
                <Route index element={<Navigate to='/' replace />} />
            </Route>
            <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    )
}