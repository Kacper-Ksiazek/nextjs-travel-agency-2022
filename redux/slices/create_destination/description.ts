import store from "@/redux/store";
import createBetterSlice from "@/redux/slices/_redux_templates/createSliceWithListManagement";
import { DestinationContentField, HeaderContentField, ParagraphContentField, SplittedContentField, ImageContentField } from "@/@types/DestinationDescription";
import { FieldType } from "@/@types/DestinationDescription";
import { PayloadAction, CaseReducer } from "@reduxjs/toolkit";

interface CustomState extends StringKeyedObject {
    newFieldType: FieldType;
}
interface CustomActions extends StringKeyedObject {
    updateNewFieldType: CaseReducer<CustomState, PayloadAction<FieldType>>;
}

const {
    reducer,
    actions,
    helpers: _helpers,
} = createBetterSlice<DestinationContentField, CustomState, CustomActions>({
    name: "description",
    listBlankItem: {
        type: FieldType.HEADER,
        header: "",
    },
    initialState: {
        newFieldType: FieldType.HEADER,
    },
    customActions: {
        updateNewFieldType: (state, action) => {
            state.newFieldType = action.payload;
        },
    } as CustomActions,
});

const createContentField = (newFieldType: FieldType): DestinationContentField => {
    const createField = <T extends DestinationContentField>(data: Omit<T, "type">, propType?: FieldType): T => {
        const type = propType ? propType : (newFieldType as FieldType);
        const dataToBeAdded = { type, ...data };
        return dataToBeAdded as T;
    };

    switch (newFieldType) {
        case FieldType.HEADER:
            return createField<HeaderContentField>({ header: "" });
        case FieldType.PARAGRAPH:
            return createField<ParagraphContentField>({ content: "" });
        case FieldType.IMAGE:
            return createField<ImageContentField>({ src: null, url: null });
        case FieldType.SPLITTED:
            return createField<SplittedContentField>({
                left: createField<ParagraphContentField>({ content: "" }, FieldType.PARAGRAPH), //
                right: createField<ParagraphContentField>({ content: "" }, FieldType.PARAGRAPH), //
            });
    }
};

export const helpers = {
    createContentField,
    addItem: (newFieldType: FieldType) => {
        _helpers.addItem(createContentField(newFieldType), true);
    },
    addItemWithAutomaticType: () => {
        _helpers.addItem(createContentField(store.getState().description.newFieldType), true);
    },
};

export { actions };
export default reducer;
