import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Row from './Row';
export default function CatalogRows({ catalogItems }) {
    return (_jsx(_Fragment, { children: catalogItems.reduce((filteredArray, catalogItem, index) => {
            if (catalogItem.length > 0) {
                filteredArray.push(_jsx(Row, { catalogTiles: catalogItem }, index));
            }
            return filteredArray;
        }, []) }));
}
