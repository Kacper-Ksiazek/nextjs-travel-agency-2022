// Tools
import { useState } from "react";
import { useRouter } from "next/router";
// Types
import type { ChosenOrder, ChosenType } from "../@types";
import type { FunctionComponent, ChangeEvent } from "react";
// Other components
import RecordsInTotal from "./RecordsInTotal";
// Material UI Icons
import SortByAlpha from "@mui/icons-material/SortByAlpha";
import Star from "@mui/icons-material/Star";
// Styled components
import Select from "./StyledSelect";
import FlexBox from "@/components/_utils/styled/FlexBox";

interface SortProps {
    refreshData: (page: number) => Promise<any>;
    recordsInTotal: number | false;
    reviewsAreLoading: boolean;
}

const Sort: FunctionComponent<SortProps> = (props) => {
    const [order, setOrder] = useState<ChosenOrder>("newest");
    const [type, setType] = useState<ChosenType>("all");

    const router = useRouter();

    const setSelectValue = async (e: ChangeEvent<HTMLInputElement>, property: "order" | "type") => {
        const { value } = e.target;

        if (property === "order") {
            setOrder(value as ChosenOrder);
            router.query.order = value;
        } else if (property == "type") {
            setType(value as ChosenType);
            router.query.type = value;
        }

        await props.refreshData(1);
    };

    return (
        <FlexBox sx={{ my: "50px" }} vertical="center" horizontal="between">
            <FlexBox>
                <Select
                    value={order}
                    onChange={(e) => setSelectValue(e, "order")}
                    options={[
                        { label: "Newest", value: "newest" },
                        { label: "Oldest", value: "oldest" },
                        { label: "Best score", value: "best" },
                        { label: "Worst score", value: "worst" },
                    ]}
                    sx={{ mr: "10px" }}
                    icon={<SortByAlpha />}
                ></Select>
                <Select
                    value={type}
                    onChange={(e) => setSelectValue(e, "type")}
                    options={[
                        { label: "All types", value: "all" },
                        { label: "Positive", value: "POSITIVE" },
                        { label: "Negative", value: "NEGATIVE" },
                        { label: "Mixed", value: "MIXED" },
                    ]}
                    icon={<Star />}
                ></Select>
            </FlexBox>

            {(() => {
                if (props.recordsInTotal && !props.reviewsAreLoading) {
                    return <RecordsInTotal recordsInTotal={props.recordsInTotal}></RecordsInTotal>;
                }
            })()}
        </FlexBox>
    );
};

export default Sort;