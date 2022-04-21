// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const Header = styled("h1")(({ theme }) => ({
    position: "relative",
    margin: "60px 0 ",
    fontSize: "4rem",
    fontWeight: 900,
    ["@media (max-width:1500px)"]: {
        fontSize: "3.5rem",
        lineHeight: "55px",
    },
    ["@media (max-width:900px)"]: {
        margin: "60px 0 40px 0 ",
    },
    ["@media (max-width:600px)"]: {
        margin: "20px 0 ",
    },
}));

const LandingHeader: FunctionComponent = () => (
    <Header>
        <BackgroundHeader fontSize="8rem">Destinations</BackgroundHeader>
        <span>Explore the diversity of the World</span>
    </Header>
);
export default LandingHeader;
