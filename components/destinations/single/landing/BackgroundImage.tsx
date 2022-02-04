// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Image from "next/Image";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
const BackgroundImageWrapper = styled(Box)({
    width: "100%",
    height: "100%",
    position: "relative",
});
const GradientMask = styled(Box)({
    position: "absolute",
    zIndex: 1,
    top: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(180deg, ${alpha("#121212", 0.1)} 0%, ${alpha("#121212", 0.2)} 41.46%, ${alpha("#121212", 0.627299)} 72.19%, #121212 100%)`,
    backdropFilter: "blur(5px)",
});
const LoadingHiddingMask = styled(Box)({
    position: "absolute",
    zIndex: 1,
    top: 0,
    width: "100%",
    height: "100%",
    background: "#000",
});

const BackgroundImage: FunctionComponent = (props) => {
    const { folder } = useAppSelector((state) => state.singleDestination.data);
    return (
        <>
            <BackgroundImageWrapper>
                <Image
                    alt="background" //
                    src={`/upload/destinations/${folder}/thumbnail/1080p.jpg`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    placeholder="blur"
                    blurDataURL={`/upload/destinations/${folder}/thumbnail/360p.jpg`}
                ></Image>
            </BackgroundImageWrapper>
            <GradientMask></GradientMask>
            <LoadingHiddingMask></LoadingHiddingMask>
        </>
    );
};

export default BackgroundImage;
