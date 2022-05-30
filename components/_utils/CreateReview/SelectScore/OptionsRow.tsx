// Tools
import { useContext } from "react";
import { styled, alpha } from "@mui/system";
import { CreateReviewContext } from "../context";
// Types
import type { FunctionComponent, ReactNode } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Styled components
const OptionsRowBase = styled("div")(({ theme }) => ({
    display: "flex",
    marginTop: "5px",
    position: "relative",
    zIndex: 2,
}));

const Option = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    borderRadius: "5px",
    width: "30px",
    height: "30px",
    marginRight: "5px",
    userSelect: "none",
    background: theme.palette.text.primary,
    color: "#fff",
    cursor: "pointer",
    transition: "all .3s ease-in-out",
    "&.disabled": {
        background: `${alpha(theme.palette.text.primary, 0.5)} !important`,
        color: theme.palette.text.primary,
        cursor: "default",
    },
}));

interface OptionsRowProps {
    /** Both included */
    range: {
        start: number;
        end: number;
    };
    value: StatedDataField<number>;
    disabled?: boolean;
}

const OptionsRow: FunctionComponent<OptionsRowProps> = (props) => {
    const context = useContext(CreateReviewContext);

    const options: ReactNode[] = [];

    for (let i = props.range.start; i <= props.range.end; i++) {
        options.push(
            <Option
                style={props.value.value === i ? { background: context.estimatedReviewColor } : {}} //
                onClick={() => {
                    if (!props.disabled) props.value.setValue(i);
                }}
                key={i}
                className={props.disabled ? "disabled" : ""}
            >
                {i}
            </Option>
        );
    }

    return <OptionsRowBase>{options}</OptionsRowBase>;
};

export default OptionsRow;