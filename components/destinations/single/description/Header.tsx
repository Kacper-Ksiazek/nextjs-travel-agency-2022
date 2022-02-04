// Types
import type { FunctionComponent } from "react";
import type { HeaderContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface HeaderContentFieldProps {
    data: HeaderContentField;
}

const HeaderField: FunctionComponent<HeaderContentFieldProps> = (props) => {
    return (
        <>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 5 }}>
                {props.data.header}
            </Typography>
            <Divider flexItem sx={{ mt: 1, mb: 2 }}></Divider>
        </>
    );
};

export default HeaderField;