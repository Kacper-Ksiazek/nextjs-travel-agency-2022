// Types
import type { SelectProps, SelectExtraOrderOption } from "../@types";

interface GenerateQueryStringParams {
    state: Record<string, any>;
    allSelects: SelectProps[];
}

const getCompoundedOrder = (params: GenerateQueryStringParams): string => {
    const orderProps = params.allSelects.find(({ key }) => key === "order") as SelectProps;
    const orderOptions = orderProps.options as SelectExtraOrderOption[];
    // Find compounded value reflecting order property stored in `state`
    const orderInState = params.state["order"];
    return (orderOptions.find((target) => target.value === orderInState) as SelectExtraOrderOption)["data-compounded-value"];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (params: GenerateQueryStringParams) => {
    const { state, allSelects } = params;
    const result: string[] = [];
    // Page
    result.push(`page=${state["page"] ?? 1}`);
    result.push(getCompoundedOrder(params));
    // Searching phrase
    const searchingPhrase = state["searchingPhrase"];
    if (searchingPhrase && searchingPhrase.length > 0) result.push(`searchingPhrase=${searchingPhrase}`);
    // Marge all select's values into one
    allSelects.forEach((select) => {
        const { defaultValue, omitIfDeafult, key, options } = select;
        const valueInState = state[key];
        // Check whether default:
        if (valueInState === defaultValue && omitIfDeafult) return;
        // Ensure that value is appropriate
        if (options.findIndex((target) => target.value === valueInState) === -1) return;
        result.push(`${key}=${valueInState}`);
    });

    return `?${result.join("&")}`;
};