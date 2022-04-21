// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { MUIStyledCommonProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Other Components
import Image from "next/Image";
// Styled Components
const Wrapper = styled("div")(({ theme }) => ({
    height: "450px",
    position: "relative",
    borderRadius: "50px 10px 50px 10px",
    overflow: "hidden",
}));

interface BackgroundPictureProps extends MUIStyledCommonProps {
    picture: string;
    resolution: "360p" | "480p" | "720p" | "1080p";
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    const { picture, resolution, ...propsToForward } = props;
    return (
        <Wrapper {...propsToForward} className="single-destination-picture">
            <Image
                layout="fill" //
                alt="bg"
                src={destinationPictureURL(picture, resolution, "thumbnail")}
                objectFit="cover"
            ></Image>
        </Wrapper>
    );
};

export default BackgroundPicture;
